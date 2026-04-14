"""Repository contracts and PostgreSQL implementations for the request queue."""

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
import hashlib
import json
from typing import Protocol

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncEngine

from app.core.errors import DependencyUnavailableError, OpsDeskApiError


@dataclass(frozen=True)
class RequestQueueItem:
    """Request queue row returned by the persistence boundary."""

    id: str
    request_number: str
    title: str
    requester: str
    owning_team: str
    priority: str
    status: str
    sla_state: str
    owner: str
    created_at: datetime
    version: int


@dataclass(frozen=True)
class RequestAuditRecord:
    """Audit row returned for a specific request detail view."""

    id: str
    actor: str
    action: str
    target: str
    channel: str
    created_at: datetime


@dataclass(frozen=True)
class RequestDetailRecord:
    """Detailed request payload with notes and recent audit rows."""

    request: RequestQueueItem
    notes: str
    updated_at: datetime
    audit_trail: list[RequestAuditRecord]


class RequestRepository(Protocol):
    """Persistence boundary for request queue reads and future mutation flows."""

    async def list_queue(self, *, limit: int) -> list[RequestQueueItem]:
        """Return request queue rows ordered for operator triage."""

    async def assign_owner(
        self,
        *,
        request_id: str,
        owner: str,
        version: int,
        actor: str,
        correlation_id: str,
        idempotency_key: str,
    ) -> RequestQueueItem:
        """Reassign the owner for a request and persist the audit trail."""

    async def get_request_detail(
        self, *, request_id: str, audit_limit: int
    ) -> RequestDetailRecord:
        """Return a request plus its latest audit rows."""

    async def escalate_request(
        self,
        *,
        request_id: str,
        version: int,
        actor: str,
        correlation_id: str,
        idempotency_key: str,
    ) -> RequestQueueItem:
        """Escalate a blocked request into the operations queue."""


class PostgreSQLRequestRepository:
    """Reads the request queue from PostgreSQL with bounded, ordered access."""

    def __init__(self, engine: AsyncEngine):
        self._engine = engine

    async def list_queue(self, *, limit: int) -> list[RequestQueueItem]:
        query = text(
            """
            select
              id::text as id,
              request_number,
              title,
              requester,
              owning_team,
              priority,
              status,
              sla_state,
              coalesce(owner, 'Unassigned') as owner,
              created_at
              ,
              version
            from opsdesk_requests
            order by
              case priority
                when 'Critical' then 1
                when 'High' then 2
                when 'Medium' then 3
                else 4
              end,
              case sla_state
                when 'Breached' then 1
                when 'Watch' then 2
                else 3
              end,
              created_at asc
            limit :limit
            """
        )

        try:
            async with self._engine.connect() as connection:
                result = await connection.execute(query, {"limit": limit})
                rows = result.mappings().all()
        except SQLAlchemyError as error:
            raise DependencyUnavailableError("postgresql") from error

        return [
            RequestQueueItem(
                id=row["id"],
                request_number=row["request_number"],
                title=row["title"],
                requester=row["requester"],
                owning_team=row["owning_team"],
                priority=row["priority"],
                status=row["status"],
                sla_state=row["sla_state"],
                owner=row["owner"],
                created_at=row["created_at"],
                version=row["version"],
            )
            for row in rows
        ]

    async def get_request_detail(
        self, *, request_id: str, audit_limit: int
    ) -> RequestDetailRecord:
        try:
            async with self._engine.connect() as connection:
                current_row = await _fetch_request_row(
                    connection, request_id=request_id
                )
                audit_result = await connection.execute(
                    text(
                        """
                        select
                          coalesce(event_key, id::text) as id,
                          actor,
                          action,
                          coalesce(payload ->> 'target', request_number, 'Unknown') as target,
                          coalesce(payload ->> 'channel', 'OpsDesk') as channel,
                          created_at
                        from opsdesk_request_audit_events
                        where request_id = :request_uuid
                        order by created_at desc
                        limit :limit
                        """
                    ),
                    {
                        "request_uuid": current_row["id"],
                        "limit": audit_limit,
                    },
                )
                audit_rows = audit_result.mappings().all()
        except OpsDeskApiError:
            raise
        except SQLAlchemyError as error:
            raise DependencyUnavailableError("postgresql") from error

        return RequestDetailRecord(
            request=_request_queue_item_from_row(current_row),
            notes=(current_row["notes"] or "").strip(),
            updated_at=current_row["updated_at"],
            audit_trail=[
                RequestAuditRecord(
                    id=row["id"],
                    actor=row["actor"],
                    action=row["action"],
                    target=row["target"],
                    channel=row["channel"],
                    created_at=row["created_at"],
                )
                for row in audit_rows
            ],
        )

    async def assign_owner(
        self,
        *,
        request_id: str,
        owner: str,
        version: int,
        actor: str,
        correlation_id: str,
        idempotency_key: str,
    ) -> RequestQueueItem:
        request_hash = hashlib.sha256(
            f"{request_id}:{owner}:{version}:{actor}".encode("utf-8")
        ).hexdigest()

        try:
            async with self._engine.begin() as connection:
                existing_idempotent_result = await connection.execute(
                    text(
                        """
                        select response_body
                        from opsdesk_idempotency_keys
                        where scope = :scope and key = :key
                        limit 1
                        """
                    ),
                    {
                        "scope": "request-assignment",
                        "key": idempotency_key,
                    },
                )
                existing_row = existing_idempotent_result.mappings().first()
                if existing_row and existing_row["response_body"]:
                    return _queue_item_from_payload(existing_row["response_body"])

                current_result = await connection.execute(
                    text(
                        """
                        select
                          id,
                          id::text as id_text,
                          request_number,
                          title,
                          requester,
                          owning_team,
                          priority,
                          status,
                          sla_state,
                          coalesce(owner, 'Unassigned') as owner,
                          created_at,
                          version
                        from opsdesk_requests
                        where id::text = :request_id
                        limit 1
                        """
                    ),
                    {
                        "request_id": request_id,
                    },
                )
                current_row = current_result.mappings().first()

                if current_row is None:
                    raise OpsDeskApiError(
                        status_code=404,
                        code="OPSDESK_REQUEST_NOT_FOUND",
                        message="OpsDesk request not found.",
                        details={"requestId": request_id},
                    )

                normalized_current_owner = current_row["owner"].strip()
                if normalized_current_owner == owner:
                    raise OpsDeskApiError(
                        status_code=409,
                        code="OPSDESK_ASSIGNMENT_NO_CHANGE",
                        message="OpsDesk request assignment is unchanged.",
                        details={"requestId": request_id, "owner": owner},
                    )

                if current_row["version"] != version:
                    raise OpsDeskApiError(
                        status_code=409,
                        code="OPSDESK_REQUEST_VERSION_CONFLICT",
                        message="OpsDesk request version does not match the current record.",
                        details={
                            "requestId": request_id,
                            "expectedVersion": current_row["version"],
                            "receivedVersion": version,
                        },
                    )

                update_result = await connection.execute(
                    text(
                        """
                        update opsdesk_requests
                        set owner = :owner,
                            version = version + 1
                        where id = :request_uuid and version = :version
                        returning
                          id::text as id,
                          request_number,
                          title,
                          requester,
                          owning_team,
                          priority,
                          status,
                          sla_state,
                          coalesce(owner, 'Unassigned') as owner,
                          created_at,
                          version
                        """
                    ),
                    {
                        "owner": owner,
                        "request_uuid": current_row["id"],
                        "version": version,
                    },
                )
                updated_row = update_result.mappings().first()

                if updated_row is None:
                    raise OpsDeskApiError(
                        status_code=409,
                        code="OPSDESK_REQUEST_VERSION_CONFLICT",
                        message="OpsDesk request version does not match the current record.",
                        details={
                            "requestId": request_id,
                            "receivedVersion": version,
                        },
                    )

                await connection.execute(
                    text(
                        """
                        insert into opsdesk_request_audit_events (
                          request_id,
                          actor,
                          action,
                          correlation_id,
                          payload
                        )
                        values (
                          :request_uuid,
                          :actor,
                          :action,
                          :correlation_id,
                          cast(:payload as jsonb)
                        )
                        """
                    ),
                    {
                        "request_uuid": current_row["id"],
                        "actor": actor,
                        "action": "reassigned owner for",
                        "correlation_id": correlation_id,
                        "payload": json.dumps(
                            {
                                "channel": "Requests",
                                "target": updated_row["request_number"],
                                "type": "assignment",
                                "previousOwner": normalized_current_owner,
                                "newOwner": owner,
                            }
                        ),
                    },
                )

                response_payload = {
                    "id": updated_row["id"],
                    "requestNumber": updated_row["request_number"],
                    "title": updated_row["title"],
                    "requester": updated_row["requester"],
                    "owningTeam": updated_row["owning_team"],
                    "priority": updated_row["priority"],
                    "status": updated_row["status"],
                    "slaState": updated_row["sla_state"],
                    "owner": updated_row["owner"],
                    "age": _format_age(updated_row["created_at"]),
                    "version": updated_row["version"],
                }

                await connection.execute(
                    text(
                        """
                        insert into opsdesk_idempotency_keys (
                          scope,
                          key,
                          request_hash,
                          response_status,
                          response_body,
                          expires_at
                        )
                        values (
                          :scope,
                          :key,
                          :request_hash,
                          200,
                          cast(:response_body as jsonb),
                          :expires_at
                        )
                        on conflict (scope, key) do update
                        set request_hash = excluded.request_hash,
                            response_status = excluded.response_status,
                            response_body = excluded.response_body,
                            expires_at = excluded.expires_at
                        """
                    ),
                    {
                        "scope": "request-assignment",
                        "key": idempotency_key,
                        "request_hash": request_hash,
                        "response_body": json.dumps(response_payload),
                        "expires_at": datetime.now(timezone.utc) + timedelta(days=1),
                    },
                )

                return _queue_item_from_payload(response_payload)
        except OpsDeskApiError:
            raise
        except SQLAlchemyError as error:
            raise DependencyUnavailableError("postgresql") from error

    async def escalate_request(
        self,
        *,
        request_id: str,
        version: int,
        actor: str,
        correlation_id: str,
        idempotency_key: str,
    ) -> RequestQueueItem:
        escalation_owner = "Ina Reyes"
        escalation_team = "Operations"
        request_hash = hashlib.sha256(
            f"{request_id}:{version}:{actor}:{escalation_owner}:{escalation_team}".encode(
                "utf-8"
            )
        ).hexdigest()

        try:
            async with self._engine.begin() as connection:
                existing_idempotent_result = await connection.execute(
                    text(
                        """
                        select response_body
                        from opsdesk_idempotency_keys
                        where scope = :scope and key = :key
                        limit 1
                        """
                    ),
                    {
                        "scope": "request-escalation",
                        "key": idempotency_key,
                    },
                )
                existing_row = existing_idempotent_result.mappings().first()
                if existing_row and existing_row["response_body"]:
                    return _queue_item_from_payload(existing_row["response_body"])

                current_row = await _fetch_request_row(
                    connection, request_id=request_id
                )
                current_owner = current_row["owner"].strip()
                current_team = current_row["owning_team"].strip()

                if current_row["version"] != version:
                    raise OpsDeskApiError(
                        status_code=409,
                        code="OPSDESK_REQUEST_VERSION_CONFLICT",
                        message="OpsDesk request version does not match the current record.",
                        details={
                            "requestId": request_id,
                            "expectedVersion": current_row["version"],
                            "receivedVersion": version,
                        },
                    )

                if (
                    current_owner == escalation_owner
                    and current_team == escalation_team
                    and "Escalated to Operations" in (current_row["notes"] or "")
                ):
                    raise OpsDeskApiError(
                        status_code=409,
                        code="OPSDESK_REQUEST_ESCALATION_NO_CHANGE",
                        message="OpsDesk request escalation is unchanged.",
                        details={"requestId": request_id},
                    )

                escalation_note = (
                    f"Escalated to Operations by {actor}. Previous owner: {current_owner}. "
                    f"Previous team: {current_team}."
                )

                update_result = await connection.execute(
                    text(
                        """
                        update opsdesk_requests
                        set owner = :owner,
                            owning_team = :owning_team,
                            notes = trim(
                              both E'\n' from concat_ws(
                                E'\n\n',
                                nullif(notes, ''),
                                :escalation_note
                              )
                            ),
                            version = version + 1
                        where id = :request_uuid and version = :version
                        returning
                          id::text as id,
                          request_number,
                          title,
                          requester,
                          owning_team,
                          priority,
                          status,
                          sla_state,
                          coalesce(owner, 'Unassigned') as owner,
                          created_at,
                          version
                        """
                    ),
                    {
                        "owner": escalation_owner,
                        "owning_team": escalation_team,
                        "escalation_note": escalation_note,
                        "request_uuid": current_row["id"],
                        "version": version,
                    },
                )
                updated_row = update_result.mappings().first()

                if updated_row is None:
                    raise OpsDeskApiError(
                        status_code=409,
                        code="OPSDESK_REQUEST_VERSION_CONFLICT",
                        message="OpsDesk request version does not match the current record.",
                        details={"requestId": request_id, "receivedVersion": version},
                    )

                await connection.execute(
                    text(
                        """
                        insert into opsdesk_request_audit_events (
                          request_id,
                          actor,
                          action,
                          correlation_id,
                          payload
                        )
                        values (
                          :request_uuid,
                          :actor,
                          :action,
                          :correlation_id,
                          cast(:payload as jsonb)
                        )
                        """
                    ),
                    {
                        "request_uuid": current_row["id"],
                        "actor": actor,
                        "action": "escalated blocker for",
                        "correlation_id": correlation_id,
                        "payload": json.dumps(
                            {
                                "channel": "Escalations",
                                "target": updated_row["request_number"],
                                "type": "escalation",
                                "previousOwner": current_owner,
                                "previousTeam": current_team,
                                "newOwner": escalation_owner,
                                "newTeam": escalation_team,
                            }
                        ),
                    },
                )

                response_payload = {
                    "id": updated_row["id"],
                    "requestNumber": updated_row["request_number"],
                    "title": updated_row["title"],
                    "requester": updated_row["requester"],
                    "owningTeam": updated_row["owning_team"],
                    "priority": updated_row["priority"],
                    "status": updated_row["status"],
                    "slaState": updated_row["sla_state"],
                    "owner": updated_row["owner"],
                    "age": _format_age(updated_row["created_at"]),
                    "version": updated_row["version"],
                }

                await connection.execute(
                    text(
                        """
                        insert into opsdesk_idempotency_keys (
                          scope,
                          key,
                          request_hash,
                          response_status,
                          response_body,
                          expires_at
                        )
                        values (
                          :scope,
                          :key,
                          :request_hash,
                          200,
                          cast(:response_body as jsonb),
                          :expires_at
                        )
                        on conflict (scope, key) do update
                        set request_hash = excluded.request_hash,
                            response_status = excluded.response_status,
                            response_body = excluded.response_body,
                            expires_at = excluded.expires_at
                        """
                    ),
                    {
                        "scope": "request-escalation",
                        "key": idempotency_key,
                        "request_hash": request_hash,
                        "response_body": json.dumps(response_payload),
                        "expires_at": datetime.now(timezone.utc) + timedelta(days=1),
                    },
                )

                return _queue_item_from_payload(response_payload)
        except OpsDeskApiError:
            raise
        except SQLAlchemyError as error:
            raise DependencyUnavailableError("postgresql") from error


def _queue_item_from_payload(payload: dict) -> RequestQueueItem:
    """Convert a stored response payload back into the queue item shape."""
    age = payload.get("age", "1m")
    created_at = datetime.now(timezone.utc) - _parse_age_to_delta(age)

    return RequestQueueItem(
        id=payload["id"],
        request_number=payload["requestNumber"],
        title=payload["title"],
        requester=payload["requester"],
        owning_team=payload["owningTeam"],
        priority=payload["priority"],
        status=payload["status"],
        sla_state=payload["slaState"],
        owner=payload["owner"],
        created_at=created_at,
        version=payload["version"],
    )


def _request_queue_item_from_row(row: dict) -> RequestQueueItem:
    """Convert a database row into the request queue item shape."""
    return RequestQueueItem(
        id=row["id_text"],
        request_number=row["request_number"],
        title=row["title"],
        requester=row["requester"],
        owning_team=row["owning_team"],
        priority=row["priority"],
        status=row["status"],
        sla_state=row["sla_state"],
        owner=row["owner"],
        created_at=row["created_at"],
        version=row["version"],
    )


async def _fetch_request_row(connection, *, request_id: str):
    """Load the current request row or raise a normalized not-found error."""
    current_result = await connection.execute(
        text(
            """
            select
              id,
              id::text as id_text,
              request_number,
              title,
              requester,
              owning_team,
              priority,
              status,
              sla_state,
              coalesce(owner, 'Unassigned') as owner,
              notes,
              created_at,
              updated_at,
              version
            from opsdesk_requests
            where id::text = :request_id
            limit 1
            """
        ),
        {"request_id": request_id},
    )
    current_row = current_result.mappings().first()
    if current_row is None:
        raise OpsDeskApiError(
            status_code=404,
            code="OPSDESK_REQUEST_NOT_FOUND",
            message="OpsDesk request not found.",
            details={"requestId": request_id},
        )

    return current_row


def _parse_age_to_delta(age: str) -> timedelta:
    """Convert a compact age label into an approximate timedelta."""
    if age.endswith("m"):
        return timedelta(minutes=max(int(age[:-1] or "1"), 1))
    if age.endswith("h"):
        return timedelta(hours=max(int(age[:-1] or "1"), 1))
    if age.endswith("d"):
        return timedelta(days=max(int(age[:-1] or "1"), 1))

    return timedelta(minutes=1)


def _format_age(created_at: datetime) -> str:
    """Return a compact age label for queue rows."""
    now = datetime.now(timezone.utc)
    created_at_utc = created_at.astimezone(timezone.utc)
    delta = now - created_at_utc
    total_minutes = max(int(delta.total_seconds() // 60), 0)

    if total_minutes < 60:
        return f"{max(total_minutes, 1)}m"

    total_hours = total_minutes // 60
    if total_hours < 24:
        return f"{total_hours}h"

    total_days = total_hours // 24
    return f"{total_days}d"

"""Repository contracts and PostgreSQL implementations for OpsDesk resources."""

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
class MetricRecord:
    """Overview metric row returned by the persistence boundary."""

    id: str
    label: str
    value: str
    delta: str
    detail: str
    tone: str


@dataclass(frozen=True)
class ApprovalRecord:
    """Approval row returned by the persistence boundary."""

    id: str
    subject: str
    stage: str
    requested_by: str
    owner: str
    due_by: str
    risk: str
    summary: str
    status: str
    version: int


@dataclass(frozen=True)
class TeamRecord:
    """Team row returned by the persistence boundary."""

    id: str
    name: str
    lead: str
    focus: str
    queue_health: str
    active_work: str
    automation_coverage: str


@dataclass(frozen=True)
class IncidentRecord:
    """Incident row returned by the persistence boundary."""

    id: str
    name: str
    status: str
    service: str
    owner: str
    next_checkpoint: str


@dataclass(frozen=True)
class AuditEventRecord:
    """Audit event row returned by the persistence boundary."""

    id: str
    actor: str
    action: str
    target: str
    channel: str
    created_at: datetime


class OpsDeskRepository(Protocol):
    """Persistence boundary for OpsDesk read-oriented resources."""

    async def list_metrics(self) -> list[MetricRecord]:
        """Return overview metrics."""

    async def list_approvals(self) -> list[ApprovalRecord]:
        """Return approval queue rows."""

    async def list_teams(self) -> list[TeamRecord]:
        """Return team coverage rows."""

    async def list_incidents(self) -> list[IncidentRecord]:
        """Return incident rows."""

    async def list_audit_events(self, *, limit: int) -> list[AuditEventRecord]:
        """Return audit rows ordered from newest to oldest."""

    async def decide_approval(
        self,
        *,
        approval_id: str,
        decision: str,
        version: int,
        actor: str,
        correlation_id: str,
        idempotency_key: str,
    ) -> ApprovalRecord:
        """Persist an approval decision and its audit trail."""


class PostgreSQLOpsDeskRepository:
    """Reads OpsDesk resources from PostgreSQL bootstrap tables."""

    def __init__(self, engine: AsyncEngine):
        self._engine = engine

    async def list_metrics(self) -> list[MetricRecord]:
        rows = await self._fetch_rows(
            """
            select id, label, value, delta, detail, tone
            from opsdesk_metrics
            order by sort_order asc, id asc
            """
        )
        return [
            MetricRecord(
                id=row["id"],
                label=row["label"],
                value=row["value"],
                delta=row["delta"],
                detail=row["detail"],
                tone=row["tone"],
            )
            for row in rows
        ]

    async def list_approvals(self) -> list[ApprovalRecord]:
        rows = await self._fetch_rows(
            """
            select id, subject, stage, requested_by, owner, due_by, risk, summary, status, version
            from opsdesk_approvals
            order by sort_order asc, id asc
            """
        )
        return [
            ApprovalRecord(
                id=row["id"],
                subject=row["subject"],
                stage=row["stage"],
                requested_by=row["requested_by"],
                owner=row["owner"],
                due_by=row["due_by"],
                risk=row["risk"],
                summary=row["summary"],
                status=row["status"],
                version=row["version"],
            )
            for row in rows
        ]

    async def list_teams(self) -> list[TeamRecord]:
        rows = await self._fetch_rows(
            """
            select id, name, lead, focus, queue_health, active_work, automation_coverage
            from opsdesk_teams
            order by sort_order asc, id asc
            """
        )
        return [
            TeamRecord(
                id=row["id"],
                name=row["name"],
                lead=row["lead"],
                focus=row["focus"],
                queue_health=row["queue_health"],
                active_work=row["active_work"],
                automation_coverage=row["automation_coverage"],
            )
            for row in rows
        ]

    async def list_incidents(self) -> list[IncidentRecord]:
        rows = await self._fetch_rows(
            """
            select id, name, status, service, owner, next_checkpoint
            from opsdesk_incidents
            order by sort_order asc, id asc
            """
        )
        return [
            IncidentRecord(
                id=row["id"],
                name=row["name"],
                status=row["status"],
                service=row["service"],
                owner=row["owner"],
                next_checkpoint=row["next_checkpoint"],
            )
            for row in rows
        ]

    async def list_audit_events(self, *, limit: int) -> list[AuditEventRecord]:
        rows = await self._fetch_rows(
            """
            select
              coalesce(a.event_key, a.id::text) as id,
              a.actor,
              a.action,
              coalesce(a.payload ->> 'target', r.request_number, 'Unknown') as target,
              coalesce(a.payload ->> 'channel', 'OpsDesk') as channel,
              a.created_at
            from opsdesk_request_audit_events a
            left join opsdesk_requests r on r.id = a.request_id
            order by a.created_at desc
            limit :limit
            """,
            {"limit": limit},
        )
        return [
            AuditEventRecord(
                id=row["id"],
                actor=row["actor"],
                action=row["action"],
                target=row["target"],
                channel=row["channel"],
                created_at=row["created_at"],
            )
            for row in rows
        ]

    async def decide_approval(
        self,
        *,
        approval_id: str,
        decision: str,
        version: int,
        actor: str,
        correlation_id: str,
        idempotency_key: str,
    ) -> ApprovalRecord:
        decision_status = "Approved" if decision == "approve" else "Rejected"
        request_hash = hashlib.sha256(
            f"{approval_id}:{decision}:{version}:{actor}".encode("utf-8")
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
                        "scope": "approval-decision",
                        "key": idempotency_key,
                    },
                )
                existing_row = existing_idempotent_result.mappings().first()
                if existing_row and existing_row["response_body"]:
                    return _approval_from_payload(existing_row["response_body"])

                current_result = await connection.execute(
                    text(
                        """
                        select
                          id,
                          request_id,
                          subject,
                          stage,
                          requested_by,
                          owner,
                          due_by,
                          risk,
                          summary,
                          status,
                          version
                        from opsdesk_approvals
                        where id = :approval_id
                        limit 1
                        """
                    ),
                    {"approval_id": approval_id},
                )
                current_row = current_result.mappings().first()

                if current_row is None:
                    raise OpsDeskApiError(
                        status_code=404,
                        code="OPSDESK_APPROVAL_NOT_FOUND",
                        message="OpsDesk approval not found.",
                        details={"approvalId": approval_id},
                    )

                if current_row["status"] == decision_status:
                    raise OpsDeskApiError(
                        status_code=409,
                        code="OPSDESK_APPROVAL_DECISION_NO_CHANGE",
                        message="OpsDesk approval decision is unchanged.",
                        details={"approvalId": approval_id, "decision": decision},
                    )

                if current_row["version"] != version:
                    raise OpsDeskApiError(
                        status_code=409,
                        code="OPSDESK_APPROVAL_VERSION_CONFLICT",
                        message="OpsDesk approval version does not match the current record.",
                        details={
                            "approvalId": approval_id,
                            "expectedVersion": current_row["version"],
                            "receivedVersion": version,
                        },
                    )

                update_result = await connection.execute(
                    text(
                        """
                        update opsdesk_approvals
                        set status = :status,
                            version = version + 1
                        where id = :approval_id and version = :version
                        returning
                          id,
                          subject,
                          stage,
                          requested_by,
                          owner,
                          due_by,
                          risk,
                          summary,
                          status,
                          version
                        """
                    ),
                    {
                        "approval_id": approval_id,
                        "status": decision_status,
                        "version": version,
                    },
                )
                updated_row = update_result.mappings().first()

                if updated_row is None:
                    raise OpsDeskApiError(
                        status_code=409,
                        code="OPSDESK_APPROVAL_VERSION_CONFLICT",
                        message="OpsDesk approval version does not match the current record.",
                        details={"approvalId": approval_id, "receivedVersion": version},
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
                          :request_id,
                          :actor,
                          :action,
                          :correlation_id,
                          cast(:payload as jsonb)
                        )
                        """
                    ),
                    {
                        "request_id": current_row["request_id"],
                        "actor": actor,
                        "action": (
                            "approved release gate for"
                            if decision == "approve"
                            else "rejected release gate for"
                        ),
                        "correlation_id": correlation_id,
                        "payload": json.dumps(
                            {
                                "channel": current_row["stage"],
                                "target": approval_id,
                                "type": "approval-decision",
                                "decision": decision,
                                "subject": current_row["subject"],
                            }
                        ),
                    },
                )

                response_payload = {
                    "id": updated_row["id"],
                    "subject": updated_row["subject"],
                    "stage": updated_row["stage"],
                    "requestedBy": updated_row["requested_by"],
                    "owner": updated_row["owner"],
                    "dueBy": updated_row["due_by"],
                    "risk": updated_row["risk"],
                    "summary": updated_row["summary"],
                    "status": updated_row["status"],
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
                        "scope": "approval-decision",
                        "key": idempotency_key,
                        "request_hash": request_hash,
                        "response_body": json.dumps(response_payload),
                        "expires_at": datetime.now(timezone.utc) + timedelta(days=1),
                    },
                )

                return _approval_from_payload(response_payload)
        except OpsDeskApiError:
            raise
        except SQLAlchemyError as error:
            raise DependencyUnavailableError("postgresql") from error

    async def _fetch_rows(self, query: str, params: dict | None = None) -> list:
        try:
            async with self._engine.connect() as connection:
                result = await connection.execute(text(query), params or {})
                return result.mappings().all()
        except SQLAlchemyError as error:
            raise DependencyUnavailableError("postgresql") from error


def _approval_from_payload(payload: dict) -> ApprovalRecord:
    """Convert an idempotent approval payload back into the repository shape."""
    return ApprovalRecord(
        id=payload["id"],
        subject=payload["subject"],
        stage=payload["stage"],
        requested_by=payload["requestedBy"],
        owner=payload["owner"],
        due_by=payload["dueBy"],
        risk=payload["risk"],
        summary=payload["summary"],
        status=payload["status"],
        version=payload["version"],
    )

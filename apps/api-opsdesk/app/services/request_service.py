"""Service layer for request queue reads."""

from datetime import datetime, timezone

from app.core.errors import OpsDeskApiError
from app.repositories.request_repository import RequestRepository
from app.schemas.resources import AuditEventResponse
from app.schemas.requests import (
    AssignRequestOwnerRequest,
    EscalateRequestPayload,
    RequestDetailData,
    RequestDetailResponse,
    RequestMutationMeta,
    RequestMutationResponse,
    RequestQueueItemResponse,
    RequestsMeta,
    RequestsResponse,
)

OPSDESK_MODE = "local-postgresql"


class RequestService:
    """Read-oriented request queue service used by the bootstrap backend."""

    def __init__(self, repository: RequestRepository):
        self._repository = repository

    async def list_requests(
        self, correlation_id: str, *, limit: int
    ) -> RequestsResponse:
        """Return a normalized request queue payload for the OpsDesk client."""
        records = await self._repository.list_queue(limit=limit)

        return RequestsResponse(
            success=True,
            data=[
                RequestQueueItemResponse(
                    id=record.id,
                    requestNumber=record.request_number,
                    title=record.title,
                    requester=record.requester,
                    owningTeam=record.owning_team,
                    priority=record.priority,
                    status=record.status,
                    slaState=record.sla_state,
                    owner=record.owner,
                    age=_format_age(record.created_at),
                    version=record.version,
                )
                for record in records
            ],
            meta=RequestsMeta(
                correlationId=correlation_id,
                mode=OPSDESK_MODE,
                count=len(records),
                limit=limit,
            ),
        )

    async def assign_owner(
        self,
        *,
        correlation_id: str,
        request_id: str,
        actor: str | None,
        idempotency_key: str | None,
        payload: AssignRequestOwnerRequest,
    ) -> RequestMutationResponse:
        """Reassign the owner for an existing request."""
        normalized_actor = (actor or "").strip()
        if not normalized_actor:
            raise OpsDeskApiError(
                status_code=400,
                code="OPSDESK_ASSIGNMENT_ACTOR_REQUIRED",
                message="OpsDesk assignment actor header is required.",
            )

        normalized_idempotency_key = (idempotency_key or "").strip()
        if not normalized_idempotency_key:
            raise OpsDeskApiError(
                status_code=400,
                code="OPSDESK_IDEMPOTENCY_KEY_REQUIRED",
                message="OpsDesk idempotency key header is required.",
            )

        normalized_owner = payload.owner.strip()
        if not normalized_owner:
            raise OpsDeskApiError(
                status_code=400,
                code="OPSDESK_REQUEST_OWNER_REQUIRED",
                message="OpsDesk request owner is required.",
            )

        record = await self._repository.assign_owner(
            request_id=request_id,
            owner=normalized_owner,
            version=payload.version,
            actor=normalized_actor,
            correlation_id=correlation_id,
            idempotency_key=normalized_idempotency_key,
        )

        return RequestMutationResponse(
            success=True,
            data=RequestQueueItemResponse(
                id=record.id,
                requestNumber=record.request_number,
                title=record.title,
                requester=record.requester,
                owningTeam=record.owning_team,
                priority=record.priority,
                status=record.status,
                slaState=record.sla_state,
                owner=record.owner,
                age=_format_age(record.created_at),
                version=record.version,
            ),
            meta=RequestMutationMeta(
                correlationId=correlation_id,
                mode=OPSDESK_MODE,
            ),
        )

    async def get_request_detail(
        self, *, correlation_id: str, request_id: str, audit_limit: int
    ) -> RequestDetailResponse:
        """Return a request detail payload with recent audit history."""
        detail = await self._repository.get_request_detail(
            request_id=request_id, audit_limit=audit_limit
        )

        return RequestDetailResponse(
            success=True,
            data=RequestDetailData(
                request=RequestQueueItemResponse(
                    id=detail.request.id,
                    requestNumber=detail.request.request_number,
                    title=detail.request.title,
                    requester=detail.request.requester,
                    owningTeam=detail.request.owning_team,
                    priority=detail.request.priority,
                    status=detail.request.status,
                    slaState=detail.request.sla_state,
                    owner=detail.request.owner,
                    age=_format_age(detail.request.created_at),
                    version=detail.request.version,
                ),
                notes=detail.notes,
                updatedAt=detail.updated_at.isoformat(),
                auditTrail=[
                    AuditEventResponse(
                        id=event.id,
                        actor=event.actor,
                        action=event.action,
                        target=event.target,
                        channel=event.channel,
                        timestamp=_format_audit_timestamp(event.created_at),
                    )
                    for event in detail.audit_trail
                ],
            ),
            meta=RequestMutationMeta(
                correlationId=correlation_id,
                mode=OPSDESK_MODE,
            ),
        )

    async def escalate_request(
        self,
        *,
        correlation_id: str,
        request_id: str,
        actor: str | None,
        idempotency_key: str | None,
        payload: EscalateRequestPayload,
    ) -> RequestMutationResponse:
        """Escalate a blocked request into the operations queue."""
        normalized_actor = (actor or "").strip()
        if not normalized_actor:
            raise OpsDeskApiError(
                status_code=400,
                code="OPSDESK_ASSIGNMENT_ACTOR_REQUIRED",
                message="OpsDesk assignment actor header is required.",
            )

        normalized_idempotency_key = (idempotency_key or "").strip()
        if not normalized_idempotency_key:
            raise OpsDeskApiError(
                status_code=400,
                code="OPSDESK_IDEMPOTENCY_KEY_REQUIRED",
                message="OpsDesk idempotency key header is required.",
            )

        record = await self._repository.escalate_request(
            request_id=request_id,
            version=payload.version,
            actor=normalized_actor,
            correlation_id=correlation_id,
            idempotency_key=normalized_idempotency_key,
        )

        return RequestMutationResponse(
            success=True,
            data=RequestQueueItemResponse(
                id=record.id,
                requestNumber=record.request_number,
                title=record.title,
                requester=record.requester,
                owningTeam=record.owning_team,
                priority=record.priority,
                status=record.status,
                slaState=record.sla_state,
                owner=record.owner,
                age=_format_age(record.created_at),
                version=record.version,
            ),
            meta=RequestMutationMeta(
                correlationId=correlation_id,
                mode=OPSDESK_MODE,
            ),
        )


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


def _format_audit_timestamp(created_at: datetime) -> str:
    """Return a compact audit timestamp label for request detail events."""
    now = datetime.now(timezone.utc)
    created_at_utc = created_at.astimezone(timezone.utc)
    delta = now - created_at_utc
    total_minutes = max(int(delta.total_seconds() // 60), 0)

    if total_minutes < 60:
        return f"{max(total_minutes, 1)}m ago"

    total_hours = total_minutes // 60
    if total_hours < 24:
        return f"{total_hours}h ago"

    total_days = total_hours // 24
    return f"{total_days}d ago"

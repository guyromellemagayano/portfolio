"""Service layer for request queue reads."""

from datetime import datetime, timezone

from app.repositories.request_repository import RequestRepository
from app.schemas.requests import (
    RequestQueueItemResponse,
    RequestsMeta,
    RequestsResponse,
)


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
                )
                for record in records
            ],
            meta=RequestsMeta(
                correlationId=correlation_id,
                mode="local-postgresql",
                count=len(records),
                limit=limit,
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

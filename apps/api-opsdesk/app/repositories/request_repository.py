"""Repository contracts and PostgreSQL implementations for the request queue."""

from dataclasses import dataclass
from datetime import datetime
from typing import Protocol

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncEngine

from app.core.errors import DependencyUnavailableError


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


class RequestRepository(Protocol):
    """Persistence boundary for request queue reads and future mutation flows."""

    async def list_queue(self, *, limit: int) -> list[RequestQueueItem]:
        """Return request queue rows ordered for operator triage."""


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
            )
            for row in rows
        ]

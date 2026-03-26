"""Service layer for health and readiness responses."""

from sqlalchemy.ext.asyncio import AsyncEngine

from app.db.health import check_database_health
from app.schemas.health import HealthData, HealthMeta, HealthResponse


class HealthService:
    """Coordinates health checks across local service dependencies."""

    def __init__(self, engine: AsyncEngine):
        self._engine = engine

    async def get_health_payload(self, correlation_id: str) -> HealthResponse:
        """Return a normalized health payload with dependency state."""
        database_ok, database_detail = await check_database_health(self._engine)
        overall_status = "ok" if database_ok else "degraded"

        return HealthResponse(
            success=True,
            data=HealthData(
                status=overall_status,
                database=database_detail,
                mode="local-postgresql",
            ),
            meta=HealthMeta(correlationId=correlation_id),
        )

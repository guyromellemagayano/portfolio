"""Health endpoints for the OpsDesk backend."""

from fastapi import APIRouter, Request

from app.schemas.health import HealthResponse
from app.services.health_service import HealthService

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def get_health(request: Request):
    """Return API and database health for local orchestration checks."""
    service = HealthService(request.app.state.db_engine)
    return await service.get_health_payload(correlation_id=request.state.correlation_id)

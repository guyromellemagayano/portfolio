"""Health endpoints for the OpsDesk backend."""

from fastapi import APIRouter, Depends, Request

from app.api.dependencies import get_health_service
from app.schemas.health import HealthResponse
from app.services.health_service import HealthService

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def get_health(
    request: Request,
    service: HealthService = Depends(get_health_service),
):
    """Return API and database health for local orchestration checks."""
    return await service.get_health_payload(correlation_id=request.state.correlation_id)

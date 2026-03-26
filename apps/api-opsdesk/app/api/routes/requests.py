"""Read endpoints for the OpsDesk request queue."""

from fastapi import APIRouter, Query, Request

from app.repositories.request_repository import PostgreSQLRequestRepository
from app.schemas.requests import RequestsResponse
from app.services.request_service import RequestService

router = APIRouter(prefix="/requests")


@router.get("", response_model=RequestsResponse)
async def list_requests(
    request: Request,
    limit: int = Query(default=25, ge=1, le=100),
):
    """Return the request queue payload used by the OpsDesk UI."""
    service = RequestService(
        repository=PostgreSQLRequestRepository(request.app.state.db_engine)
    )
    return await service.list_requests(
        correlation_id=request.state.correlation_id,
        limit=limit,
    )

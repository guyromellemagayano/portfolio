"""Read and mutation endpoints for the OpsDesk request queue."""

from fastapi import APIRouter, Depends, Header, Query, Request

from app.api.dependencies import get_request_service
from app.core.config import get_settings
from app.schemas.requests import (
    AssignRequestOwnerRequest,
    EscalateRequestPayload,
    RequestDetailResponse,
    RequestMutationResponse,
    RequestsResponse,
)
from app.services.request_service import RequestService

router = APIRouter(prefix="/requests")
settings = get_settings()


@router.get("", response_model=RequestsResponse)
async def list_requests(
    request: Request,
    limit: int = Query(default=25, ge=1, le=100),
    service: RequestService = Depends(get_request_service),
):
    """Return the request queue payload used by the OpsDesk UI."""
    return await service.list_requests(
        correlation_id=request.state.correlation_id,
        limit=limit,
    )


@router.patch("/{request_id}/assignment", response_model=RequestMutationResponse)
async def assign_request_owner(
    request_id: str,
    payload: AssignRequestOwnerRequest,
    request: Request,
    actor: str | None = Header(default=None, alias=settings.opsdesk_actor_header),
    idempotency_key: str | None = Header(
        default=None, alias=settings.idempotency_key_header
    ),
    service: RequestService = Depends(get_request_service),
):
    """Reassign the owner for a request row."""
    return await service.assign_owner(
        correlation_id=request.state.correlation_id,
        request_id=request_id,
        actor=actor,
        idempotency_key=idempotency_key,
        payload=payload,
    )


@router.get("/{request_id}", response_model=RequestDetailResponse)
async def get_request_detail(
    request_id: str,
    request: Request,
    audit_limit: int = Query(default=6, ge=1, le=25),
    service: RequestService = Depends(get_request_service),
):
    """Return a single request with recent audit history."""
    return await service.get_request_detail(
        correlation_id=request.state.correlation_id,
        request_id=request_id,
        audit_limit=audit_limit,
    )


@router.patch("/{request_id}/escalation", response_model=RequestMutationResponse)
async def escalate_request(
    request_id: str,
    payload: EscalateRequestPayload,
    request: Request,
    actor: str | None = Header(default=None, alias=settings.opsdesk_actor_header),
    idempotency_key: str | None = Header(
        default=None, alias=settings.idempotency_key_header
    ),
    service: RequestService = Depends(get_request_service),
):
    """Escalate a blocked request into the operations queue."""
    return await service.escalate_request(
        correlation_id=request.state.correlation_id,
        request_id=request_id,
        actor=actor,
        idempotency_key=idempotency_key,
        payload=payload,
    )

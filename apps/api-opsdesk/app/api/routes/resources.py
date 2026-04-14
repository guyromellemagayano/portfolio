"""Read and mutation endpoints for OpsDesk overview and collection resources."""

from fastapi import APIRouter, Depends, Header, Query, Request

from app.api.dependencies import get_opsdesk_service
from app.core.config import get_settings
from app.schemas.resources import (
    ApprovalDecisionRequest,
    ApprovalMutationResponse,
    ApprovalsResponse,
    AuditResponse,
    IncidentsResponse,
    OverviewResponse,
    TeamsResponse,
)
from app.services.opsdesk_service import OpsDeskService

router = APIRouter()
settings = get_settings()


@router.get("/overview", response_model=OverviewResponse)
async def get_overview(
    request: Request,
    service: OpsDeskService = Depends(get_opsdesk_service),
):
    """Return the overview payload used by the default OpsDesk tab."""
    return await service.get_overview(correlation_id=request.state.correlation_id)


@router.get("/approvals", response_model=ApprovalsResponse)
async def list_approvals(
    request: Request,
    service: OpsDeskService = Depends(get_opsdesk_service),
):
    """Return the approval queue payload used by OpsDesk."""
    return await service.list_approvals(correlation_id=request.state.correlation_id)


@router.get("/teams", response_model=TeamsResponse)
async def list_teams(
    request: Request,
    service: OpsDeskService = Depends(get_opsdesk_service),
):
    """Return team ownership rows."""
    return await service.list_teams(correlation_id=request.state.correlation_id)


@router.get("/incidents", response_model=IncidentsResponse)
async def list_incidents(
    request: Request,
    service: OpsDeskService = Depends(get_opsdesk_service),
):
    """Return incident watch rows."""
    return await service.list_incidents(correlation_id=request.state.correlation_id)


@router.get("/audit", response_model=AuditResponse)
async def list_audit_events(
    request: Request,
    limit: int = Query(default=25, ge=1, le=100),
    service: OpsDeskService = Depends(get_opsdesk_service),
):
    """Return the latest audit trail rows."""
    return await service.list_audit_events(
        correlation_id=request.state.correlation_id,
        limit=limit,
    )


@router.patch(
    "/approvals/{approval_id}/decision", response_model=ApprovalMutationResponse
)
async def decide_approval(
    approval_id: str,
    payload: ApprovalDecisionRequest,
    request: Request,
    actor: str | None = Header(default=None, alias=settings.opsdesk_actor_header),
    idempotency_key: str | None = Header(
        default=None, alias=settings.idempotency_key_header
    ),
    service: OpsDeskService = Depends(get_opsdesk_service),
):
    """Persist an approval decision."""
    return await service.decide_approval(
        correlation_id=request.state.correlation_id,
        approval_id=approval_id,
        actor=actor,
        idempotency_key=idempotency_key,
        payload=payload,
    )

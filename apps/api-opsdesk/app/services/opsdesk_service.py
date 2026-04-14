"""Service layer for OpsDesk overview and collection reads."""

from datetime import datetime, timezone

from app.core.errors import OpsDeskApiError
from app.repositories.opsdesk_repository import OpsDeskRepository
from app.schemas.resources import (
    ApprovalDecisionRequest,
    ApprovalMutationResponse,
    ApprovalResponse,
    ApprovalsResponse,
    AuditEventResponse,
    AuditResponse,
    IncidentResponse,
    IncidentsResponse,
    MetricResponse,
    OpsDeskCollectionMeta,
    OpsDeskOverviewMeta,
    OverviewData,
    OverviewResponse,
    TeamResponse,
    TeamsResponse,
)

OPSDESK_MODE = "local-postgresql"


class OpsDeskService:
    """Read-oriented OpsDesk service used by the admin surface."""

    def __init__(self, repository: OpsDeskRepository):
        self._repository = repository

    async def get_overview(self, *, correlation_id: str) -> OverviewResponse:
        """Return the overview payload used by the default OpsDesk tab."""
        metrics = await self._repository.list_metrics()
        incidents = await self._repository.list_incidents()
        teams = await self._repository.list_teams()

        return OverviewResponse(
            success=True,
            data=OverviewData(
                metrics=[
                    MetricResponse(
                        id=item.id,
                        label=item.label,
                        value=item.value,
                        delta=item.delta,
                        detail=item.detail,
                        tone=item.tone,
                    )
                    for item in metrics
                ],
                incidents=[
                    IncidentResponse(
                        id=item.id,
                        name=item.name,
                        status=item.status,
                        service=item.service,
                        owner=item.owner,
                        nextCheckpoint=item.next_checkpoint,
                    )
                    for item in incidents
                ],
                teams=[
                    TeamResponse(
                        id=item.id,
                        name=item.name,
                        lead=item.lead,
                        focus=item.focus,
                        queueHealth=item.queue_health,
                        activeWork=item.active_work,
                        automationCoverage=item.automation_coverage,
                    )
                    for item in teams
                ],
            ),
            meta=OpsDeskOverviewMeta(
                correlationId=correlation_id,
                mode=OPSDESK_MODE,
            ),
        )

    async def list_approvals(self, *, correlation_id: str) -> ApprovalsResponse:
        """Return the approval queue payload used by OpsDesk."""
        approvals = await self._repository.list_approvals()

        return ApprovalsResponse(
            success=True,
            data=[
                ApprovalResponse(
                    id=item.id,
                    subject=item.subject,
                    stage=item.stage,
                    requestedBy=item.requested_by,
                    owner=item.owner,
                    dueBy=item.due_by,
                    risk=item.risk,
                    summary=item.summary,
                    status=item.status,
                    version=item.version,
                )
                for item in approvals
            ],
            meta=OpsDeskCollectionMeta(
                correlationId=correlation_id,
                mode=OPSDESK_MODE,
                count=len(approvals),
            ),
        )

    async def decide_approval(
        self,
        *,
        correlation_id: str,
        approval_id: str,
        actor: str | None,
        idempotency_key: str | None,
        payload: ApprovalDecisionRequest,
    ) -> ApprovalMutationResponse:
        """Persist an approval decision with guardrails and audit logging."""
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

        normalized_decision = payload.decision.strip().lower()
        if normalized_decision not in {"approve", "reject"}:
            raise OpsDeskApiError(
                status_code=400,
                code="OPSDESK_APPROVAL_DECISION_REQUIRED",
                message="OpsDesk approval decision is required.",
            )

        approval = await self._repository.decide_approval(
            approval_id=approval_id,
            decision=normalized_decision,
            version=payload.version,
            actor=normalized_actor,
            correlation_id=correlation_id,
            idempotency_key=normalized_idempotency_key,
        )

        return ApprovalMutationResponse(
            success=True,
            data=ApprovalResponse(
                id=approval.id,
                subject=approval.subject,
                stage=approval.stage,
                requestedBy=approval.requested_by,
                owner=approval.owner,
                dueBy=approval.due_by,
                risk=approval.risk,
                summary=approval.summary,
                status=approval.status,
                version=approval.version,
            ),
            meta=OpsDeskOverviewMeta(
                correlationId=correlation_id,
                mode=OPSDESK_MODE,
            ),
        )

    async def list_teams(self, *, correlation_id: str) -> TeamsResponse:
        """Return team ownership rows."""
        teams = await self._repository.list_teams()

        return TeamsResponse(
            success=True,
            data=[
                TeamResponse(
                    id=item.id,
                    name=item.name,
                    lead=item.lead,
                    focus=item.focus,
                    queueHealth=item.queue_health,
                    activeWork=item.active_work,
                    automationCoverage=item.automation_coverage,
                )
                for item in teams
            ],
            meta=OpsDeskCollectionMeta(
                correlationId=correlation_id,
                mode=OPSDESK_MODE,
                count=len(teams),
            ),
        )

    async def list_incidents(self, *, correlation_id: str) -> IncidentsResponse:
        """Return incident watch rows."""
        incidents = await self._repository.list_incidents()

        return IncidentsResponse(
            success=True,
            data=[
                IncidentResponse(
                    id=item.id,
                    name=item.name,
                    status=item.status,
                    service=item.service,
                    owner=item.owner,
                    nextCheckpoint=item.next_checkpoint,
                )
                for item in incidents
            ],
            meta=OpsDeskCollectionMeta(
                correlationId=correlation_id,
                mode=OPSDESK_MODE,
                count=len(incidents),
            ),
        )

    async def list_audit_events(
        self, *, correlation_id: str, limit: int
    ) -> AuditResponse:
        """Return the latest audit trail rows."""
        events = await self._repository.list_audit_events(limit=limit)

        return AuditResponse(
            success=True,
            data=[
                AuditEventResponse(
                    id=item.id,
                    actor=item.actor,
                    action=item.action,
                    target=item.target,
                    channel=item.channel,
                    timestamp=_format_timestamp(item.created_at),
                )
                for item in events
            ],
            meta=OpsDeskCollectionMeta(
                correlationId=correlation_id,
                mode=OPSDESK_MODE,
                count=len(events),
            ),
        )


def _format_timestamp(created_at: datetime) -> str:
    """Return a compact audit timestamp label."""
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

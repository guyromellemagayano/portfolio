"""Resource response models for OpsDesk collections and overview."""

from pydantic import BaseModel


class OpsDeskCollectionMeta(BaseModel):
    """Metadata emitted with collection responses."""

    correlationId: str
    mode: str
    count: int


class OpsDeskOverviewMeta(BaseModel):
    """Metadata emitted with overview responses."""

    correlationId: str
    mode: str


class MetricResponse(BaseModel):
    """Serialized OpsDesk metric row."""

    id: str
    label: str
    value: str
    delta: str
    detail: str
    tone: str


class ApprovalResponse(BaseModel):
    """Serialized OpsDesk approval row."""

    id: str
    subject: str
    stage: str
    requestedBy: str
    owner: str
    dueBy: str
    risk: str
    summary: str
    status: str
    version: int


class TeamResponse(BaseModel):
    """Serialized OpsDesk team row."""

    id: str
    name: str
    lead: str
    focus: str
    queueHealth: str
    activeWork: str
    automationCoverage: str


class IncidentResponse(BaseModel):
    """Serialized OpsDesk incident row."""

    id: str
    name: str
    status: str
    service: str
    owner: str
    nextCheckpoint: str


class AuditEventResponse(BaseModel):
    """Serialized OpsDesk audit event row."""

    id: str
    actor: str
    action: str
    target: str
    channel: str
    timestamp: str


class OverviewData(BaseModel):
    """Serialized OpsDesk overview payload."""

    metrics: list[MetricResponse]
    incidents: list[IncidentResponse]
    teams: list[TeamResponse]


class OverviewResponse(BaseModel):
    """Overview response envelope."""

    success: bool
    data: OverviewData
    meta: OpsDeskOverviewMeta


class ApprovalsResponse(BaseModel):
    """Approval collection response envelope."""

    success: bool
    data: list[ApprovalResponse]
    meta: OpsDeskCollectionMeta


class TeamsResponse(BaseModel):
    """Team collection response envelope."""

    success: bool
    data: list[TeamResponse]
    meta: OpsDeskCollectionMeta


class IncidentsResponse(BaseModel):
    """Incident collection response envelope."""

    success: bool
    data: list[IncidentResponse]
    meta: OpsDeskCollectionMeta


class AuditResponse(BaseModel):
    """Audit collection response envelope."""

    success: bool
    data: list[AuditEventResponse]
    meta: OpsDeskCollectionMeta


class ApprovalDecisionRequest(BaseModel):
    """Payload accepted when deciding an approval row."""

    decision: str
    version: int


class ApprovalMutationResponse(BaseModel):
    """Approval mutation response envelope."""

    success: bool
    data: ApprovalResponse
    meta: OpsDeskOverviewMeta

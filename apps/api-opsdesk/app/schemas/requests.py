"""Request queue response models for OpsDesk."""

from pydantic import BaseModel

from app.schemas.resources import AuditEventResponse


class RequestsMeta(BaseModel):
    """Metadata emitted with request queue responses."""

    correlationId: str
    mode: str
    count: int
    limit: int


class RequestQueueItemResponse(BaseModel):
    """Serialized request queue row."""

    id: str
    requestNumber: str
    title: str
    requester: str
    owningTeam: str
    priority: str
    status: str
    slaState: str
    owner: str
    age: str
    version: int


class AssignRequestOwnerRequest(BaseModel):
    """Payload accepted when reassigning a request owner."""

    owner: str
    version: int


class EscalateRequestPayload(BaseModel):
    """Payload accepted when escalating a blocked request."""

    version: int


class RequestMutationMeta(BaseModel):
    """Metadata emitted with request mutation responses."""

    correlationId: str
    mode: str


class RequestsResponse(BaseModel):
    """Request queue response envelope."""

    success: bool
    data: list[RequestQueueItemResponse]
    meta: RequestsMeta


class RequestMutationResponse(BaseModel):
    """Request mutation response envelope."""

    success: bool
    data: RequestQueueItemResponse
    meta: RequestMutationMeta


class RequestDetailData(BaseModel):
    """Detailed request payload with recent audit events."""

    request: RequestQueueItemResponse
    notes: str
    updatedAt: str
    auditTrail: list[AuditEventResponse]


class RequestDetailResponse(BaseModel):
    """Detailed request response envelope."""

    success: bool
    data: RequestDetailData
    meta: RequestMutationMeta

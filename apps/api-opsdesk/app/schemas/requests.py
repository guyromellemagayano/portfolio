"""Request queue response models for OpsDesk."""

from pydantic import BaseModel


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


class RequestsResponse(BaseModel):
    """Request queue response envelope."""

    success: bool
    data: list[RequestQueueItemResponse]
    meta: RequestsMeta

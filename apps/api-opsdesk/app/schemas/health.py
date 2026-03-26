"""Health response models for OpsDesk."""

from pydantic import BaseModel


class HealthMeta(BaseModel):
    """Metadata emitted with health responses."""

    correlationId: str


class HealthData(BaseModel):
    """Service and dependency health state."""

    status: str
    database: str
    mode: str


class HealthResponse(BaseModel):
    """Top-level health response envelope."""

    success: bool
    data: HealthData
    meta: HealthMeta

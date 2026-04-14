"""Dependency helpers for OpsDesk route handlers."""

from fastapi import Request

from app.repositories.opsdesk_repository import (
    OpsDeskRepository,
    PostgreSQLOpsDeskRepository,
)
from app.repositories.request_repository import (
    PostgreSQLRequestRepository,
    RequestRepository,
)
from app.services.health_service import HealthService
from app.services.opsdesk_service import OpsDeskService
from app.services.request_service import RequestService


def get_health_service(request: Request) -> HealthService:
    """Return the health service bound to the current database engine."""
    return HealthService(request.app.state.db_engine)


def get_request_repository(request: Request) -> RequestRepository:
    """Return the request repository bound to the current database engine."""
    return PostgreSQLRequestRepository(request.app.state.db_engine)


def get_request_service(request: Request) -> RequestService:
    """Return the request service for queue reads and mutations."""
    return RequestService(repository=get_request_repository(request))


def get_opsdesk_repository(request: Request) -> OpsDeskRepository:
    """Return the canonical OpsDesk repository for read resources."""
    return PostgreSQLOpsDeskRepository(request.app.state.db_engine)


def get_opsdesk_service(request: Request) -> OpsDeskService:
    """Return the OpsDesk service for overview and collection resources."""
    return OpsDeskService(repository=get_opsdesk_repository(request))

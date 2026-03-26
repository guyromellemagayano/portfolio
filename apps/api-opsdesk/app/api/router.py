"""Top-level API router for OpsDesk endpoints."""

from fastapi import APIRouter

from app.api.routes.health import router as health_router
from app.api.routes.requests import router as requests_router

api_router = APIRouter(prefix="/v1")
api_router.include_router(health_router, tags=["Health"])
api_router.include_router(requests_router, tags=["Requests"])

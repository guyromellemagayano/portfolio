"""FastAPI entrypoint for the local-only OpsDesk backend."""

from contextlib import asynccontextmanager

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.api.router import api_router
from app.core.config import get_cors_origins, get_settings
from app.core.errors import DependencyUnavailableError, OpsDeskApiError
from app.core.logging import configure_logging, get_logger
from app.db.engine import create_database_engine, dispose_database_engine

settings = get_settings()
configure_logging(settings.log_level)
logger = get_logger("opsdesk.api")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize and tear down shared infrastructure."""
    engine = create_database_engine(settings)
    app.state.db_engine = engine
    try:
        yield
    finally:
        await dispose_database_engine(engine)


app = FastAPI(
    title="OpsDesk API",
    version="0.1.0",
    lifespan=lifespan,
    docs_url="/docs",
    openapi_url="/openapi.json",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_origins(settings),
    allow_credentials=True,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=[settings.correlation_id_header],
)
app.include_router(api_router)


@app.middleware("http")
async def request_context_middleware(request: Request, call_next):
    """Attach lightweight request metadata for logs and downstream responses."""
    correlation_id = (
        request.headers.get(settings.request_id_header)
        or request.headers.get(settings.correlation_id_header)
        or request.headers.get("x-request-id")
        or "opsdesk-local"
    )
    request.state.correlation_id = correlation_id

    response = await call_next(request)
    response.headers[settings.correlation_id_header] = correlation_id
    return response


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    """Return a normalized internal error payload for unexpected failures."""
    correlation_id = getattr(request.state, "correlation_id", "unknown")
    logger.exception(
        "Unhandled OpsDesk API error", extra={"correlation_id": correlation_id}
    )

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected internal error occurred.",
            },
            "meta": {
                "correlationId": correlation_id,
            },
        },
    )


@app.exception_handler(OpsDeskApiError)
async def opsdesk_api_error_handler(request: Request, exc: OpsDeskApiError):
    """Return normalized API error payloads for expected failures."""
    correlation_id = getattr(request.state, "correlation_id", "unknown")

    if isinstance(exc, DependencyUnavailableError):
        logger.warning(
            "OpsDesk dependency unavailable",
            extra={"correlation_id": correlation_id, "dependency": exc.dependency},
        )
    else:
        logger.info(
            "OpsDesk request rejected",
            extra={
                "correlation_id": correlation_id,
                "code": exc.code,
                "status_code": exc.status_code,
            },
        )

    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "code": exc.code,
                "message": exc.message,
                "details": exc.details,
            },
            "meta": {
                "correlationId": correlation_id,
            },
        },
    )

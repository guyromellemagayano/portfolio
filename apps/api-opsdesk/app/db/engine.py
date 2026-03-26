"""SQLAlchemy engine helpers for the OpsDesk backend."""

from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine

from app.core.config import Settings


def create_database_engine(settings: Settings) -> AsyncEngine:
    """Create an async PostgreSQL engine with explicit timeout and pool guardrails."""
    return create_async_engine(
        settings.database_url,
        pool_pre_ping=True,
        pool_size=settings.database_pool_size,
        max_overflow=settings.database_max_overflow,
        pool_timeout=settings.database_pool_timeout_seconds,
        connect_args={
            "server_settings": {
                "application_name": "portfolio-api-opsdesk",
                "statement_timeout": str(settings.database_statement_timeout_ms),
                "lock_timeout": str(settings.database_lock_timeout_ms),
            }
        },
    )


async def dispose_database_engine(engine: AsyncEngine) -> None:
    """Dispose of the async engine during service shutdown."""
    await engine.dispose()

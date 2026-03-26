"""Database reachability checks for OpsDesk health probes."""

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncEngine


async def check_database_health(engine: AsyncEngine) -> tuple[bool, str]:
    """Return a simple database health tuple suitable for `/v1/health`."""
    try:
        async with engine.connect() as connection:
            await connection.execute(text("select 1"))
        return True, "ok"
    except SQLAlchemyError as error:
        return False, str(error.__class__.__name__)

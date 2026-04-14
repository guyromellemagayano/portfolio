"""Configuration models for the OpsDesk backend."""

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime settings for the local OpsDesk backend."""

    model_config = SettingsConfigDict(env_file=".env.local", extra="ignore")

    app_env: str = Field(default="development", alias="APP_ENV")
    log_level: str = Field(default="INFO", alias="OPSDESK_LOG_LEVEL")
    api_host: str = Field(default="0.0.0.0", alias="OPSDESK_API_HOST")
    api_port: int = Field(default=8010, alias="OPSDESK_API_PORT")
    request_id_header: str = Field(
        default="x-request-id", alias="OPSDESK_REQUEST_ID_HEADER"
    )
    correlation_id_header: str = Field(
        default="x-correlation-id", alias="OPSDESK_CORRELATION_ID_HEADER"
    )
    opsdesk_actor_header: str = Field(
        default="x-opsdesk-actor", alias="OPSDESK_ACTOR_HEADER"
    )
    idempotency_key_header: str = Field(
        default="idempotency-key", alias="OPSDESK_IDEMPOTENCY_KEY_HEADER"
    )
    cors_origins: str = Field(
        default="http://localhost:3001,https://opsdesk.guyromellemagayano.local",
        alias="OPSDESK_CORS_ORIGINS",
    )
    database_url: str = Field(
        default="postgresql+asyncpg://opsdesk:opsdesk@localhost:5432/opsdesk",
        alias="OPSDESK_DATABASE_URL",
    )
    database_pool_size: int = Field(default=10, alias="OPSDESK_DATABASE_POOL_SIZE")
    database_max_overflow: int = Field(
        default=20, alias="OPSDESK_DATABASE_MAX_OVERFLOW"
    )
    database_pool_timeout_seconds: int = Field(
        default=10, alias="OPSDESK_DATABASE_POOL_TIMEOUT_SECONDS"
    )
    database_statement_timeout_ms: int = Field(
        default=3000, alias="OPSDESK_DATABASE_STATEMENT_TIMEOUT_MS"
    )
    database_lock_timeout_ms: int = Field(
        default=1500, alias="OPSDESK_DATABASE_LOCK_TIMEOUT_MS"
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return a cached settings object for the current process."""
    return Settings()


def get_cors_origins(settings: Settings) -> list[str]:
    """Return normalized allowed CORS origins from the comma-delimited setting."""
    return [
        origin.strip() for origin in settings.cors_origins.split(",") if origin.strip()
    ]

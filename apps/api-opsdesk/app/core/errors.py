"""Shared application exceptions for the OpsDesk backend."""

from typing import Any


class OpsDeskApiError(Exception):
    """Normalized API error carrying response metadata."""

    def __init__(
        self,
        *,
        status_code: int,
        code: str,
        message: str,
        details: Any | None = None,
    ):
        self.status_code = status_code
        self.code = code
        self.message = message
        self.details = details
        super().__init__(message)


class DependencyUnavailableError(OpsDeskApiError):
    """Raised when a required infrastructure dependency cannot serve a request."""

    def __init__(self, dependency: str):
        self.dependency = dependency
        super().__init__(
            status_code=503,
            code="DEPENDENCY_UNAVAILABLE",
            message=f"{dependency} is temporarily unavailable.",
            details={"dependency": dependency},
        )

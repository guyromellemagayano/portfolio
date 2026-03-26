"""Shared application exceptions for the OpsDesk backend."""


class DependencyUnavailableError(Exception):
    """Raised when a required infrastructure dependency cannot serve a request."""

    def __init__(self, dependency: str):
        self.dependency = dependency
        super().__init__(f"{dependency} is unavailable")

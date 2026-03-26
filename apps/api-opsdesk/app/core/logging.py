"""Logging helpers for the OpsDesk backend."""

import logging


def configure_logging(level: str) -> None:
    """Configure the root logger once for local service runs."""
    logging.basicConfig(
        level=getattr(logging, level.upper(), logging.INFO),
        format="%(asctime)s %(levelname)s %(name)s %(message)s",
    )


def get_logger(name: str) -> logging.Logger:
    """Return a named logger."""
    return logging.getLogger(name)

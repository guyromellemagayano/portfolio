FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /workspace/apps/api-opsdesk

COPY apps/api-opsdesk/requirements.txt /tmp/api-opsdesk-requirements.txt

RUN pip install --upgrade pip \
  && pip install -r /tmp/api-opsdesk-requirements.txt

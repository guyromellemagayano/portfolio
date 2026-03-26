# `api-opsdesk`

Local-only FastAPI backend for `OpsDesk`.

This service is intentionally separate from `apps/api-portfolio`.

## Scope

- Internal operations workflows only
- Local Docker development first
- PostgreSQL as the source of truth
- No Vercel deployment path in the current phase

## Architecture

```text
apps/api-opsdesk/
  app/
    api/            # FastAPI routers and dependency wiring
    core/           # Config and logging
    db/             # Engine setup, health checks, SQL bootstrap schema
    repositories/   # Persistence boundaries
    schemas/        # API request/response models
    services/       # Domain orchestration
```

## Operational Rules

- Route handlers stay thin. They validate input, call a service, and shape the response.
- Services own workflow rules, retries, and idempotency requirements.
- Repositories own transaction and locking strategy.
- PostgreSQL mutations must use one of:
  - optimistic locking with a `version` column
  - explicit row locks for queue-claim workflows
- Queue-claim workflows should use `SELECT ... FOR UPDATE SKIP LOCKED`.
- Cross-request mutations should require an idempotency key before they leave bootstrap mode.
- Database connections must use:
  - `pool_pre_ping`
  - bounded pool size
  - statement timeout
  - lock timeout

## Bootstrap Status

This first pass includes:

- health endpoint with database reachability checks
- Postgres-backed request queue read endpoint with bounded list access
- bootstrap schema and seed rows for local development
- normalized `503` dependency failure responses for database outages
- same-origin proxy support for `apps/opsdesk` local development

The next step is adding authenticated mutation flows for assignment, approval actions, and audit writes.

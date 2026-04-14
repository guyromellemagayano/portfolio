# Local Docker Dev

This repo now uses a lean local Docker workflow centered on the root `Makefile`.

The important services are:

- `web` on `3000`
- `api` on `5001`
- `jobs` on `3002`
- `jobs-api` on `5002`
- `jobs-worker`
- `opsdesk` on `3001`
- `tooling` for one-off checks
- `e2e` for Playwright

## Core Commands

```bash
# full stack
make up
make logs
make down

# jobs stack only
make jobs-up
make jobs-logs
make jobs-down
```

## URLs

- Portfolio web: `http://localhost:3000`
- Portfolio API: `http://localhost:5001/v1/status`
- Jobs app: `http://localhost:3002`
- Jobs API: `http://localhost:5002/v1/status`
- OpsDesk: `http://localhost:3001`

## Quality Commands

```bash
make check-types
make lint
make test
```

These run through the `tooling` container instead of your host shell.

## Notes

- `make up` starts the full stack defined in `docker/compose/local.yml`.
- `make jobs-up` starts only `jobs-db`, `jobs-api`, `jobs`, and `jobs-worker`.
- The jobs frontend uses a Vite same-origin proxy at `/api-jobs`, so normal local usage does not require a separate client API env var.
- The jobs API runs migrations and seeds defaults on boot.
- File watching uses polling inside containers for Docker Desktop compatibility.

## Related Docs

- Playwright runners: `docker/docs/e2e.md`
- Docker workspace index: `docker/README.md`

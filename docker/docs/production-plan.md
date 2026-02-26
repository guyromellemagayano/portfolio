# Docker Production Migration Plan (Vercel Exit Readiness)

This document captures the recommended Docker path if you later migrate from Vercel to self-hosting.

Current state:

- Local development is Dockerized (`docker/compose/local.yml`)
- Local hostname routing via Traefik is available (`docker/compose/edge.local.yml`)
- Optional local TLS overlay is scaffolded (`docker/compose/edge.tls.local.yml`)
- `apps/web`, `apps/api`, and `apps/admin` are available behind local Compose networking / Traefik edge routing
- Production compose scaffold exists (`docker/compose/prod.yml`)
- Production multi-stage Dockerfiles exist for `web` and `api`
- Production is still on Vercel

## Goals

- Keep local Docker DX strong without coupling it to production images
- Add production-grade, multi-stage Dockerfiles for `web` and `api` (scaffolded)
- Introduce an edge proxy/router (recommended: Traefik) for hostname routing and TLS
- Preserve monorepo maintainability by separating Compose, images, scripts, and docs by concern

## Recommended Reverse Proxy (Local + Future Self-Hosting)

Use **Traefik**.

Why it fits this repo:

- Docker-native service discovery via labels (works well with Compose)
- Easy subdomain routing (`web`, `api`, `admin`, `studio`)
- Good local TLS story with `mkcert`
- Smooth path from local Compose -> self-hosted Compose/Swarm/Kubernetes ingress patterns

## Local Domain Strategy

Prefer `.test` (for example `guyromellemagayano.test`) instead of `.local`.

Reason:

- `.local` commonly conflicts with mDNS / Bonjour on macOS

Suggested hostnames:

- `guyromellemagayano.test` -> `apps/web`
- `api.guyromellemagayano.test` -> `apps/api`
- `admin.guyromellemagayano.test` -> `apps/admin`
- `traefik.guyromellemagayano.test` -> Traefik dashboard (optional, local only)

## Proposed Docker Layout (Future Additions)

The current Docker layout is already organized for this:

- `docker/compose/`
  - `local.yml` (current)
  - `edge.local.yml` (current Traefik + local domain routing)
  - `edge.tls.local.yml` (current optional mkcert-ready TLS overlay)
  - `prod.yml` (current production/self-hosting scaffold)
- `docker/images/`
  - `dev/` (current)
  - `web/production.Dockerfile` (current)
  - `api/production.Dockerfile` (current)
  - `admin/production.Dockerfile` (optional, if containerized admin is desired)
- `docker/scripts/`
  - startup/health helper scripts shared by environments

## Production Image Plan (Recommended)

### `apps/web` (Next.js)

Use a multi-stage Dockerfile:

1. `base`
2. `deps`
3. `builder` (`pnpm --filter web build`)
4. `runner` (copy Next output only)

Recommendation:

- Use Next.js standalone output in the runner image for a smaller, cleaner production container
- Implemented in scaffold:
  - `docker/images/web/production.Dockerfile`
  - `apps/web/next.config.ts` supports Docker production standalone builds via `NEXT_WEB_OUTPUT_STANDALONE=1`
  - `outputFileTracingRoot` is set for monorepo-safe standalone tracing during the Docker build

### `apps/api` (Express)

Use a multi-stage Dockerfile:

1. `base`
2. `deps`
3. `builder` (`pnpm --filter api build`)
4. `runner` (copy `dist` + runtime deps only)

Implemented in scaffold:

- `docker/images/api/production.Dockerfile`
- Uses `pnpm deploy --filter api --prod` in the builder stage to create a lean runtime filesystem

## Production Scaffold Commands (Local Validation / Dry Run)

These commands use the production compose scaffold and are intentionally separate from the local dev/Traefik stack:

```bash
# Validate prod compose config
make validate-prod

# Build production images (api + web)
make build-prod

# Run production scaffold locally (foreground/background)
make up-prod
make up-prod-detached

# Inspect logs / stop services
make logs-prod
make down-prod
```

Useful variables:

- `PROD_WEB_PORT` (default `3000`)
- `PROD_API_PORT` (default `5001`)

Example:

```bash
make up-prod-detached PROD_WEB_PORT=3300 PROD_API_PORT=5501
```

## Scope of the Current Production Scaffold

Included:

- Production `api` and `web` service definitions
- Multi-stage Docker builds
- Health checks
- Runtime env wiring for Sanity and API gateway connectivity
- Writable Next.js runtime cache volume (`/app/.next/cache`) for self-hosted operation

Not included yet:

- Production Traefik / TLS / redirects / HSTS / metrics
- CI build/push pipelines for container registries
- Production secrets manager integration
- `admin` production image/service

## Traefik Local Rollout Status

Implemented locally:

1. `traefik` service in `docker/compose/edge.local.yml`
2. Shared `edge` network for `web`, `api`, `admin`, and `traefik`
3. Host-based routing labels for `web`, `api`, `admin`, and Traefik dashboard
4. Embedded Studio served on the same `web` host at `/studio` (mirrors production path shape)
5. `allowedDevOrigins` configured in `apps/web/next.config.ts` for the local custom host domain
6. Local DNS setup guidance documented (`/etc/hosts` and `dnsmasq`) in `docker/docs/local-dev.md`
7. Optional local TLS scaffold with `mkcert`-ready overlay (`docker/compose/edge.tls.local.yml`) and Traefik dynamic config example (`docker/traefik/examples/local-tls.example.yml`)

Remaining work (when needed):

1. Add automatic mkcert generation helpers (Make target/script) if you want zero-manual TLS setup
2. Add production-grade Traefik config (redirects, HSTS, access logs, metrics) as a separate production edge/proxy compose or overlay
3. Add CI/CD image build/push and deployment orchestration for the production scaffold

## Operational Topics to Plan Before Migration

- Secrets management (Sanity tokens, webhook secrets, API keys)
- Persistent storage/logging strategy
- Health checks and restart policies
- Build cache strategy in CI
- Observability (logs/metrics/traces)
- Rollback plan and deployment strategy (blue/green or rolling)

## Related Docs

- Local Docker workflow: `docker/docs/local-dev.md`
- Dockerized e2e/smoke runs: `docker/docs/e2e.md`
- Docker workspace index: `docker/README.md`

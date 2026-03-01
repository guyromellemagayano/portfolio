# Local Docker Dev (App Stack + Tooling)

This local Docker setup runs the monorepo workflow through Docker Compose for day-to-day development:

- `api` (gateway dev runner)
- `web` (Next.js dev server + embedded Sanity Studio)
- `admin` (Vite admin app on port `3001`)
- `tooling` (one-off lint/typecheck/test/Sanity CLI commands)
- `e2e` / `e2e-sanity-smoke` (Playwright runners via Compose profiles, documented in `docker/docs/e2e.md`)

It uses your checked-out source tree as a bind mount.

## Start Here (Recommended)

If you are running local development in Docker, follow this exact path.

### First-Time Setup

1. Normalize env files once:

```bash
make env-local-normalize
```

1. Set the local domain mode (`.local`, default):

```bash
make use-orbstack-domain
```

Optional fallback mode (`.localhost`) if your browser/local DNS setup requires it:

```bash
make use-localhost-domain
```

1. Start the first-run flow:

```bash
make bootstrap-watch
```

1. Verify routes:

```bash
make edge-smoke
```

### Daily Commands

```bash
# Foreground daily dev
make up-edge-watch

# Background daily dev
make up-edge-detached
make logs-edge

# Stop stack
make down-edge
```

Use `make help` for the compact command guide and `make help-all` for the full catalog.

## Start (Localhost Ports)

```bash
make up
```

- `api` runs `pnpm --filter api dev` (Bun watch mode for the Elysia API runtime)
- `web` runs `next dev --turbopack` in Docker
- `admin` runs `pnpm --filter admin dev`
- `web` resolves the API gateway through Docker networking (`http://api:5001`)
- `make up` runs the base Compose command defined in the root `Makefile` (`docker/compose/local.yml`)

## Start (Traefik + Local Hostnames, Recommended First Run)

```bash
make env-local-normalize
make bootstrap-watch
```

This foreground first-run command validates the edge Compose stack, applies local domain setup behavior based on `LOCAL_DEV_DOMAIN`, and then starts the same app stack plus a local Traefik edge proxy and Docker Compose watch using:

- `docker/compose/local.yml`
- `docker/compose/edge.local.yml`

`make env-local-normalize` keeps root `.env.local` as the single local Docker source of truth and removes app-level `.env.local` files created by `vercel link`.

If you want to refresh linked Vercel project env vars before normalization:

```bash
make vercel-env-sync-local VERCEL_ENV_TARGET=development
```

This pulls env vars for `apps/web`, `apps/api`, and `apps/admin`, then regenerates root `.env.local`.
The command keeps app-level `.env.local` files after sync.

Host-side Vercel CLI commands:

```bash
make vercel VERCEL_ARGS="whoami"
make vercel VERCEL_ARGS="link --cwd apps/web"
make vercel-env-pull VERCEL_ENV_TARGET=development
```

`docker/compose/edge.local.yml` is the default file-provider Traefik overlay (stable local routing path on Docker Desktop/macOS).

If you prefer the same first-run flow without Compose watch:

```bash
make bootstrap
```

Background mode:

```bash
make bootstrap-detached
```

If you want to skip DNS setup explicitly (for example, you already configured `dnsmasq` or prefer `/etc/hosts` manually):

```bash
make bootstrap-watch SKIP_DNS_SETUP=1
```

Manual DNS fallback (if `bootstrap` prints the fallback message on non-macOS or non-Homebrew setups):

```bash
make edge-hosts
```

Optional: macOS/Homebrew `dnsmasq` helper (typically unnecessary for OrbStack `.local` mode):

```bash
make dnsmasq-local
make dnsmasq-health
make dnsmasq-verify
```

If browsers (especially Chromium-based) show `DNS_PROBE_*` while `curl` works, run:

```bash
make edge-dns-doctor
```

Fallback (skip `dnsmasq` and use `.localhost`):

```bash
make use-localhost-domain
make down-edge
make up-edge-watch
```

OrbStack custom-domain mode (skip `dnsmasq` and use `.local`):

```bash
make use-orbstack-domain
make down-edge
make up-edge-watch
```

OrbStack overlay file:

- `docker/compose/edge.orbstack.local.yml`

Example `/etc/hosts` entries (if you choose manual hosts instead of OrbStack DNS):

```txt
127.0.0.1 guyromellemagayano.local
127.0.0.1 api.guyromellemagayano.local
127.0.0.1 admin.guyromellemagayano.local
127.0.0.1 traefik.guyromellemagayano.local
```

## URLs

Localhost ports:

- Web app: `http://localhost:3000`
- API gateway: `http://localhost:5001`
- Admin app: `http://localhost:3001`
- Sanity-hosted Studio: `https://<your-studio>.sanity.studio`

Traefik hostname routing (`make up-edge`) with the default `LOCAL_DEV_DOMAIN=guyromellemagayano.local`:

- Web app: `https://guyromellemagayano.local`
- API gateway: `https://api.guyromellemagayano.local`
- Admin app: `https://admin.guyromellemagayano.local`
- Traefik dashboard: `https://traefik.guyromellemagayano.local` (root redirects to `/dashboard/`)

OrbStack custom-domain routing (`make up-edge-watch` with `LOCAL_DEV_DOMAIN=guyromellemagayano.local`):

- Web app: `https://guyromellemagayano.local`
- API gateway: `https://api.guyromellemagayano.local`
- Admin app: `https://admin.guyromellemagayano.local`
- Traefik dashboard: `https://traefik.guyromellemagayano.local`
- Default OrbStack service domains are still available (for example `http://web.portfolio.orb.local`, `http://api.portfolio.orb.local`, `http://traefik.portfolio.orb.local`) but the repo standard uses `guyromellemagayano.local` + subdomains.

## Sanity Local Dev (Hosted Studio)

- Use hosted Studio and point preview links to local web:
  - `SANITY_STUDIO_PREVIEW_ORIGIN="https://guyromellemagayano.local"`
- Recommended local `.env.local` values:
  - `NEXT_PUBLIC_SANITY_DATASET="development"`
  - `SANITY_STUDIO_DATASET="development"`
  - `NEXT_PUBLIC_SITE_URL="https://guyromellemagayano.local"`
- In Sanity project settings:
  - Add development host: `https://<your-studio>.sanity.studio`
  - Add API CORS origin: `https://guyromellemagayano.local`
- If you use the `.localhost` fallback mode, use `SANITY_STUDIO_PREVIEW_ORIGIN="http://guyromellemagayano.localhost"` and matching CORS origin.
- Restart after env/domain changes:

```bash
make down-edge
make up-edge-watch
```

## Notes

- On first boot, each service runs `pnpm install --frozen-lockfile` if the container-managed workspace `node_modules` volume is empty.
- Dependencies and Turbo cache are persisted in Docker volumes for faster restarts.
- `apps/api/dist` and `apps/web/.next` are left on the bind-mounted workspace (not named volumes) because the build tools delete/recreate those directories and Docker mountpoints can cause `EBUSY` errors.
- The Docker `web` service runs Turbopack only (no Webpack fallback path).
- `apps/web/next.config.ts` disables Turbopack filesystem cache for Docker `next dev` and uses a Docker-specific `distDir` (`.next-docker`) to reduce bind-mount cache corruption risk.
- `apps/web/next.config.ts` configures `allowedDevOrigins` for the local edge domain (`guyromellemagayano.local` + `*.guyromellemagayano.local` by default) for Next 16 dev-origin behavior.
- OrbStack mode uses `dev.orbstack.domains` labels on Traefik to bind `.local` custom domains directly to the edge proxy.
- The Docker entrypoint clears the Docker web dist Turbopack cache (`<distDir>/dev/cache`) on startup.
- File watching uses polling (`CHOKIDAR_USEPOLLING`, `WATCHPACK_POLLING`) for better Docker Desktop compatibility.
- App source file watching/HMR is handled by the running dev servers inside containers (`api`, `web`, `admin`).
- Optional `make watch` / `make watch-edge` uses Docker Compose watch for container-level rebuilds when Dockerfiles or package manifests change.
- `make up-watch`, `make up-edge-watch`, and `make up-edge-tls-watch` combine `up` + Compose watch into a single foreground command.
- The Playwright containers use `E2E_USE_EXTERNAL_SERVERS=1`, so `apps/e2e/playwright.config.ts` targets the already-running Compose `api` and `web` services instead of starting its own `webServer`s.

## Related Docs

- E2E / smoke runner workflows: `docker/docs/e2e.md`
- Production migration / self-hosting plan: `docker/docs/production-plan.md`

## Common Commands

```bash
# Show the full command list
make help

# First run (recommended)
make bootstrap-watch

# Daily dev (foreground)
make up-edge-watch

# Daily dev with OrbStack custom domains (foreground, no dnsmasq)
make use-orbstack-domain
make up-edge-watch

# Daily dev (detached)
make up-edge-detached
make logs-edge

# Optional local TLS overlay in foreground with Compose watch
make up-edge-tls-watch

# Run a GET-based edge routing smoke check (Traefik dashboard + web + api + admin)
make edge-smoke

# Optional: container rebuild/restart watch in another terminal
make watch-edge

# Debug Docker-provider routing (socket-proxy-backed)
make up-edge-debug-watch

# Stop edge stack
make down-edge
```

## Dockerized Tooling Commands

These run monorepo commands in the `tooling` container instead of on your host:

```bash
make check-types
make lint
make test

# Run Sanity CLI through the web workspace
make sanity SANITY_ARGS="projects list"
```

- `make check-types`, `make lint`, and `make test` use a lower Turbo concurrency by default (`TURBO_DOCKER_CONCURRENCY=2`) for Docker Desktop stability.
- Override if needed (for example on a higher-memory machine): `make lint TURBO_DOCKER_CONCURRENCY=4`
- `make test` sanitizes Sanity-related env vars before running tests so unit tests don't inherit `.env.local` behavior.
- `make logs` and `make logs-edge` tail the last `100` lines by default before following; override with `LOG_TAIL` (for example `make logs-edge LOG_TAIL=250`).
- `make watch`, `make watch-edge`, and `make watch-edge-tls` are best run in a separate terminal after a detached stack start (`make up-detached`, `make up-edge-detached`, `make up-edge-tls-detached`).
- Override watched services with `WATCH_SERVICES` (for example `make watch-edge WATCH_SERVICES="web api"`).
- If you prefer a single foreground command, use `make up-watch`, `make up-edge-watch`, or `make up-edge-tls-watch`.

## Local DNS (Better Than `/etc/hosts`)

If you want manual wildcard local DNS instead of relying on OrbStack custom domains:

1. Install `dnsmasq`
2. Configure `address=/.guyromellemagayano.local/127.0.0.1`
3. Point your system resolver to the local `dnsmasq` instance

This is optional but more maintainable if you add more local subdomains later.

Convenience targets:

- `make dnsmasq-local-print` prints the exact `dnsmasq` and `/etc/resolver` file contents for `LOCAL_DEV_DOMAIN`
- `make dnsmasq-local` installs/updates the macOS Homebrew `dnsmasq` config and resolver file (requires sudo), then runs `dnsmasq-health` and `dnsmasq-status`
- `make dnsmasq-health` runs functional health checks (resolver file, port `53` listener, system-resolver hostname checks)
- `make dnsmasq-status` shows Homebrew `dnsmasq` service status (advisory only; functional health is the source of truth)
- `make dnsmasq-verify` checks the expected subdomains using the system resolver (`dscacheutil` on macOS, `getent` on Linux, `dig` fallback)
- `make edge-dns-doctor` diagnoses browser DNS issues and prints `.localhost` fallback or OrbStack checks when relevant

If Homebrew reports `dnsmasq` with `error 78` but `make dnsmasq-health` / `make dnsmasq-verify` pass, treat the setup as working. Homebrew service status can be misleading when `dnsmasq` is functionally healthy.

## Optional Local TLS (mkcert)

TLS is available via an optional overlay:

```bash
make up-edge-tls
```

TLS overlay files:

- `docker/compose/edge.tls.local.yml`
- `docker/traefik/examples/local-tls.example.yml`

Recommended flow:

- Run the helper (recommended):

```bash
make tls-local-setup
```

This runs `mkcert`, writes certs to `docker/traefik/certs/`, and creates `docker/traefik/dynamic/local-tls.yml` for the current `LOCAL_DEV_DOMAIN`.

- Start the TLS edge stack:

```bash
make up-edge-tls-watch
```

Manual flow (if you want full control):

1. Generate a local cert with `mkcert` for your base domain + subdomains
2. Place certs in `docker/traefik/certs/`
3. Copy `docker/traefik/examples/local-tls.example.yml` to `docker/traefik/dynamic/local-tls.yml`
4. Update cert/key filenames if needed
5. Start `make up-edge-tls`

If no custom cert is configured yet, Traefik will still start and serve a default certificate.
The example TLS file lives outside `docker/traefik/dynamic/` on purpose so Traefik does not try to load it as a real config.

## Optional pnpm Shortcuts

The root `package.json` still includes `pnpm ...:docker` shortcuts, but the concise `Makefile` targets are the preferred interface for Dockerized local development.

## Required / Useful Env Vars

- `FORCE_PNPM_INSTALL=1` (optional, shell env): force dependency reinstall inside containers on next run
- `TURBO_DOCKER_CONCURRENCY` (optional, default `2`): Turbo task concurrency for Dockerized `check-types` / `lint` / `test`
- `LOG_TAIL` (optional, default `100`): line count used by `make logs` and `make logs-edge` before follow mode
- `WATCH_SERVICES` (optional, default `api web admin`): service list passed to Compose `watch` targets
- `LOCAL_DEV_DOMAIN` (optional, default `guyromellemagayano.local`): base local domain used by Traefik edge routing + Next/Vite host allowlists (`<domain>`, `api.<domain>`, `admin.<domain>`, `traefik.<domain>`; `.localhost` remains a fallback mode)
- `TRAEFIK_HTTP_PORT` (optional, default `80`): host HTTP port for local Traefik
- `TRAEFIK_HTTPS_PORT` (optional, default `443`): host HTTPS port for the optional TLS overlay
- `TRAEFIK_DOCKER_SOCKET_PATH` (optional): host Docker socket path mounted into the Docker socket-proxy sidecar (auto-detects Docker Desktop macOS user socket when present; otherwise defaults to `/var/run/docker.sock`)
- `TRAEFIK_DOCKER_API_VERSION` (optional, default `1.53`): Docker API version Traefik uses if the Docker provider is enabled (useful on newer Docker Desktop releases)
- `TRAEFIK_ENABLE_DOCKER_PROVIDER` (optional, default `0`): legacy compatibility toggle for Docker-provider routing; prefer `make up-edge-debug*` targets instead
- `SKIP_DNS_SETUP` (optional, default `0`): skip the `dnsmasq`/hosts step in `make bootstrap` and `make bootstrap-detached`
- For E2E-specific envs (`SANITY_WEBHOOK_SECRET`, `E2E_SANITY_*`), see `docker/docs/e2e.md`

## Traefik Routing Provider Notes

Local edge routing now uses a generated Traefik file-provider config (`make render-edge-routes`) by default. This avoids Docker Desktop/macOS Docker-provider compatibility issues while keeping the same hostname behavior.

Recommended local setup:

- Keep the default `LOCAL_DEV_DOMAIN=...local` with OrbStack custom domains
- Use `*.localhost` only as a fallback mode if your browser’s Secure DNS / DoH keeps bypassing your local resolver

If you want to debug or experiment with label-based routing, use the dedicated Docker-provider debug path:

```bash
make up-edge-debug-watch
```

This combines:

- `docker/compose/edge.local.yml` (default file-provider edge wiring)
- `docker/compose/edge.docker-provider.debug.local.yml` (Docker-provider + socket proxy)

When the debug path is active, `make render-edge-routes` writes placeholder file-provider route files to avoid duplicate routers across file + Docker providers.

Docker-provider debug mode is socket-proxy-backed. The Docker socket is mounted into the proxy sidecar (not directly into Traefik), and Traefik connects to the proxy over the internal `edge` network.

If you still use the legacy toggle path, it is kept for compatibility but de-emphasized.

If Docker-provider debug mode still shows provider errors, pin the Docker Desktop socket and API version explicitly:

```env
TRAEFIK_DOCKER_SOCKET_PATH="/Users/<you>/.docker/run/docker.sock"
TRAEFIK_DOCKER_API_VERSION="1.53"
```

## Domain Mode Helpers

Switch between `.local` and `.localhost` modes without manually editing `.env.local`:

```bash
make use-orbstack-domain
make use-localhost-domain
```

After switching:

```bash
make down-edge
make up-edge-watch
```

OrbStack `.local` mode uses the same `make up-edge*` commands; the OrbStack overlay is included automatically when `LOCAL_DEV_DOMAIN` ends with `.local`.

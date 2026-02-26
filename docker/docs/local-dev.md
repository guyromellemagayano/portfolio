# Local Docker Dev (App Stack + Tooling)

This local Docker setup runs the monorepo workflow through Docker Compose for day-to-day development:

- `api` (gateway dev runner)
- `web` (Next.js dev server + embedded Sanity Studio)
- `admin` (Vite admin app on port `3001`)
- `tooling` (one-off lint/typecheck/test/Sanity CLI commands)
- `e2e` / `e2e-sanity-smoke` (Playwright runners via Compose profiles, documented in `docker/docs/e2e.md`)

It uses your checked-out source tree as a bind mount.

## Start (Localhost Ports)

```bash
make up
```

- `api` runs `pnpm --filter api dev` (the dev runner that builds + restarts the API runtime)
- `web` runs `next dev --turbopack` in Docker
- `admin` runs `pnpm --filter admin dev`
- `web` resolves the API gateway through Docker networking (`http://api:5001`)
- `make up` runs the base Compose command defined in the root `Makefile` (`docker/compose/local.yml`)

## Start (Traefik + Local Hostnames, Recommended First Run)

```bash
make bootstrap-watch
```

This foreground first-run command validates the edge Compose stack, attempts local DNS setup (macOS + Homebrew `dnsmasq`), and then starts the same app stack plus a local Traefik edge proxy and Docker Compose watch using:

- `docker/compose/local.yml`
- `docker/compose/edge.local.yml`

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

Or use the macOS/Homebrew `dnsmasq` helper (recommended for the default wildcard `.test` domain setup):

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

Example `/etc/hosts` entries (default `.test` domain, if you choose manual hosts instead of `dnsmasq`):

```txt
127.0.0.1 guyromellemagayano.test
127.0.0.1 api.guyromellemagayano.test
127.0.0.1 admin.guyromellemagayano.test
127.0.0.1 traefik.guyromellemagayano.test
```

## URLs

Localhost ports:

- Web app: `http://localhost:3000`
- API gateway: `http://localhost:5001`
- Admin app: `http://localhost:3001`
- Sanity Studio (embedded): `http://localhost:3000/studio`

Traefik hostname routing (`make up-edge`) with the default `LOCAL_DEV_DOMAIN=guyromellemagayano.test`:

- Web app: `http://guyromellemagayano.test`
- Sanity Studio (embedded): `http://guyromellemagayano.test/studio`
- API gateway: `http://api.guyromellemagayano.test`
- Admin app: `http://admin.guyromellemagayano.test`
- Traefik dashboard: `http://traefik.guyromellemagayano.test` (root redirects to `/dashboard/`)

## Sanity Local Dev (Embedded Studio)

- Use the root-domain Studio path (matches production routing more closely):
  - `http://guyromellemagayano.test/studio`
- Recommended local `.env.local` values:
  - `NEXT_PUBLIC_SANITY_DATASET="development"`
  - `SANITY_DATASET="development"`
  - `NEXT_PUBLIC_SITE_URL="http://guyromellemagayano.test"`
- In Sanity project settings:
  - Add development host: `http://guyromellemagayano.test/studio`
  - Add API CORS origin: `http://guyromellemagayano.test`
- If you use the `.localhost` fallback mode, add the matching `.localhost` Studio URL and CORS origin too.
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
- `apps/web/next.config.ts` configures `allowedDevOrigins` for the local edge domain (`*.guyromellemagayano.test` by default) for Next 16 dev-origin behavior.
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

# Daily dev (detached)
make up-edge-detached
make logs-edge

# Optional local TLS overlay in foreground with Compose watch
make up-edge-tls-watch

# Run a GET-based edge routing smoke check (Traefik dashboard + web + /studio + api + admin)
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

If you want wildcard local domains (`*.guyromellemagayano.test`) instead of editing `/etc/hosts` repeatedly:

1. Install `dnsmasq`
2. Configure `address=/.guyromellemagayano.test/127.0.0.1`
3. Point your system resolver to the local `dnsmasq` instance

This is optional but more maintainable if you add more local subdomains later.

Convenience targets:

- `make dnsmasq-local-print` prints the exact `dnsmasq` and `/etc/resolver` file contents for `LOCAL_DEV_DOMAIN`
- `make dnsmasq-local` installs/updates the macOS Homebrew `dnsmasq` config and resolver file (requires sudo), then runs `dnsmasq-health` and `dnsmasq-status`
- `make dnsmasq-health` runs functional health checks (resolver file, port `53` listener, system-resolver hostname checks)
- `make dnsmasq-status` shows Homebrew `dnsmasq` service status (advisory only; functional health is the source of truth)
- `make dnsmasq-verify` checks the expected subdomains using the system resolver (`dscacheutil` on macOS, `getent` on Linux, `dig` fallback)
- `make edge-dns-doctor` diagnoses browser DNS issues and prints the `.localhost` fallback workflow if needed

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

1. Run the helper (recommended):

```bash
make tls-local-setup
```

This runs `mkcert`, writes certs to `docker/traefik/certs/`, and creates `docker/traefik/dynamic/local-tls.yml` for the current `LOCAL_DEV_DOMAIN`.

2. Start the TLS edge stack:

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
- `LOCAL_DEV_DOMAIN` (optional, default `guyromellemagayano.test`): base local domain used by Traefik edge routing + Next/Vite host allowlists (`*.test` is the recommended wildcard `dnsmasq` path; `*.localhost` is the fallback for browser Secure DNS / DoH friction)
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

- Keep the default `LOCAL_DEV_DOMAIN=...test` with `dnsmasq` for wildcard subdomains and a production-like local hostname setup
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

Switch between the recommended `.test` mode and the `.localhost` fallback mode without manually editing `.env.local`:

```bash
make use-test-domain
make use-localhost-domain
```

After switching:

```bash
make down-edge
make up-edge-watch
```

# Docker Workspace

Docker-related assets are organized by concern:

- `docker/compose/`: Docker Compose definitions (local dev, future prod/staging variants)
- `docker/images/`: Dockerfiles grouped by image purpose/environment
- `docker/scripts/`: container entrypoints and helper scripts
- `docker/traefik/`: local edge proxy assets (Traefik dynamic config + local cert placeholders)
- `docker/docs/`: Docker workflow documentation

Current local development entry points:

- Compose file: `docker/compose/local.yml`
- Edge overlay (Traefik + host routing): `docker/compose/edge.local.yml`
- OrbStack custom-domain overlay (`*.local`): `docker/compose/edge.orbstack.local.yml`
- Optional TLS overlay (mkcert-ready): `docker/compose/edge.tls.local.yml`
- Dev image Dockerfile: `docker/images/dev/Dockerfile`
- Dev entrypoint: `docker/scripts/dev-entrypoint.sh`
- Local dev guide: `docker/docs/local-dev.md`
- Recommended first-run command: `make bootstrap` (auto DNS setup on macOS/Homebrew + Traefik edge stack)

Production scaffolding (self-hosting readiness):

- Production compose scaffold: `docker/compose/prod.yml`
- Web production image Dockerfile: `docker/images/web/production.Dockerfile`
- API production image Dockerfile: `docker/images/api/production.Dockerfile`
- Production migration plan: `docker/docs/production-plan.md`

Docker docs:

- `docker/docs/local-dev.md`: app stack + tooling workflow
- `docker/docs/e2e.md`: Playwright + Sanity smoke runners in Docker
- `docker/docs/production-plan.md`: future self-hosting / Traefik / production image plan

Traefik docs/assets:

- `docker/traefik/README.md`: local Traefik assets + mkcert notes

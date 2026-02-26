# Documentation Hub

Project-level documentation is centralized under `docs/`.

## Sections

- `docs/architecture/`: system topology, boundaries, and data-flow docs
- `docs/services/`: service/app documentation grouped by service
- `docs/integrations/`: external integrations (Sanity, third-party APIs, etc.)
- `docs/standards/`: conventions, standards, and implementation rules
- `docs/catalog/`: indexes and discovery docs (including the repo README catalog)

## Primary Entry Points

- API Gateway overview: `docs/services/api-gateway/README.md`
- Sanity integration: `docs/integrations/sanity/README.md`
- API Gateway standards: `docs/standards/api-gateway/API_GATEWAY_STANDARDS.md`
- Logging standards: `docs/standards/logging/LOGGING_STANDARDS.md`
- Docker workspace index: `docker/README.md`
- Docker local dev guide: `docker/docs/local-dev.md`
- Docker e2e guide: `docker/docs/e2e.md`
- Docker production plan: `docker/docs/production-plan.md`

## Repository README Catalog

Use `docs/catalog/README.md` for a centralized index of every `README.md` in the monorepo (apps, packages, docker, docs, and root).

Validate it from the repo root with:

```bash
make docs-catalog-check
```

Regenerate it when new README files are added:

```bash
make docs-catalog-update
make docs-catalog-check
```

## Documentation Placement Rule

- Project-level docs go in `docs/` under the closest section above.
- Local README files stay next to the code they describe (for example `apps/*/README.md`, `packages/*/README.md`) and are indexed in `docs/catalog/README.md`.

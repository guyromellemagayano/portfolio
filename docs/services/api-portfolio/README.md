# Portfolio API (`apps/api-portfolio`)

`apps/api-portfolio` is the monorepo integration boundary used by public app clients such as `web` to consume portfolio-facing backend services through a stable API surface.

Current primary data flow for content:

`apps/web` -> `apps/api-portfolio` (`/v1/content/articles`, `/v1/content/articles/:slug`, `/v1/content/pages`, `/v1/content/pages/:slug`) -> configured content provider (`local` or `static`)

## Current Modules

- `health`: `/v1/status` (legacy `/status` redirects to `/v1/status`)
- `message`: `/v1/message/:name` (legacy `/message/:name` redirects to `/v1/message/:name`)
- `content`: `/v1/content/articles` (provider-backed list)
- `content`: `/v1/content/articles/:slug` (provider-backed detail)
- `content`: `/v1/content/pages` (provider-backed standalone page list)
- `content`: `/v1/content/pages/:slug` (provider-backed standalone page detail)

## Versioning and Redirects

- `GET /` redirects to `GET /v1/status` for a friendly browser entry point.
- Unversioned legacy routes remain browser-safe via redirects to the latest versioned routes.

## Runtime and API Docs

- Runtime framework: Elysia (`apps/api-portfolio/src/server.ts`).
- OpenAPI UI: `GET /openapi`
- OpenAPI JSON: `GET /openapi/json`
- Local app runtime script: `bun --watch src/index.ts` (`pnpm --filter api-portfolio dev` delegates to Bun)

## Provider Pattern

- Provider interfaces live under `src/providers/<domain>/`.
- Provider selection is centralized in `src/providers/provider-registry.ts`.
- Routes call services; services call providers.
- Canonical payload contracts are shared through `@portfolio/api-contracts`.
- Local content provider data is sourced from `@portfolio/content-data`.

## CORS Policy

- In `production`, CORS is allowlist-only via `PORTFOLIO_API_CORS_ORIGINS`.
- If the allowlist is empty in `production`, cross-origin browser requests are disabled.
- In local development/test, empty allowlist defaults to permissive behavior for DX.

## Content Provider Configuration

- `PORTFOLIO_API_CONTENT_PROVIDER=local` uses the local typed content provider.
- `PORTFOLIO_API_CONTENT_PROVIDER=static` uses the empty static fallback provider.

## Standards

See `docs/standards/api-portfolio/API_PORTFOLIO_STANDARDS.md` for folder conventions, response contracts, and integration checklist.

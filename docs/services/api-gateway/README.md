# API Gateway (`apps/api`)

`apps/api` is the monorepo integration boundary used by app clients (`web`, future `admin`) to consume external and internal backend services through a unified API surface.

Current primary data flow for content:

`apps/web` -> `apps/api` (`/v1/content/articles`, `/v1/content/articles/:slug`, `/v1/content/pages`, `/v1/content/pages/:slug`) -> configured content provider (`sanity` or `static`)

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

## Provider Pattern

- Provider interfaces live under `src/providers/<domain>/`.
- Provider selection is centralized in `src/gateway/provider-registry.ts`.
- Routes call services; services call providers.
- Canonical payload contracts are shared through `@portfolio/api-contracts`.
- Sanity provider requests support timeout/retry controls via `SANITY_REQUEST_TIMEOUT_MS`, `SANITY_REQUEST_MAX_RETRIES`, and `SANITY_REQUEST_RETRY_DELAY_MS`.

## CORS Policy

- In `production`, CORS is allowlist-only via `API_GATEWAY_CORS_ORIGINS`.
- If the allowlist is empty in `production`, cross-origin browser requests are disabled.
- In local development/test, empty allowlist defaults to permissive behavior for DX.

## Sanity Provider Configuration

- `API_GATEWAY_CONTENT_PROVIDER=sanity` uses the Sanity content provider for article and standalone page content routes.
- In `production`, missing `SANITY_PROJECT_ID` or `SANITY_DATASET` fails provider initialization (no silent fallback).
- In local development/test, incomplete Sanity config falls back to the static provider for DX.

## Standards

See `docs/standards/api-gateway/API_GATEWAY_STANDARDS.md` for folder conventions, response contracts, and integration checklist.

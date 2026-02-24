# API Gateway (`apps/api`)

`apps/api` is the monorepo integration boundary used by app clients (`web`, future `admin`) to consume external and internal backend services through a unified API surface.

Current primary data flow for articles:

`apps/web` -> `apps/api` (`/v1/content/articles`, `/v1/content/articles/:slug`) -> configured content provider (`sanity` or `static`)

## Current Modules

- `health`: `/status`, `/v1/status`
- `message`: `/message/:name`, `/v1/message/:name`
- `content`: `/v1/content/articles` (provider-backed list)
- `content`: `/v1/content/articles/:slug` (provider-backed detail)

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

- `API_GATEWAY_CONTENT_PROVIDER=sanity` uses the Sanity content provider for `/v1/content/articles` and `/v1/content/articles/:slug`.
- In `production`, missing `SANITY_PROJECT_ID` or `SANITY_DATASET` fails provider initialization (no silent fallback).
- In local development/test, incomplete Sanity config falls back to the static provider for DX.

## Standards

See `docs/standards/api-gateway/API_GATEWAY_STANDARDS.md` for folder conventions, response contracts, and integration checklist.

# API Gateway Standards

This document defines standards for `apps/api` as the central integration boundary for the monorepo.

## Objectives

1. Provide a stable API surface for `apps/web`, `apps/admin`, and future apps.
2. Keep third-party/custom backend integrations behind provider adapters.
3. Avoid deeply nested cross-app dependencies.
4. Keep Sanity and other external systems replaceable without breaking consumers.

## Architecture

```txt
apps/api/src/
  config/          # Environment and runtime configuration
  contracts/       # DTOs, response envelopes, and shared error models
  gateway/         # Provider registries and provider selection logic
  middleware/      # Request context, access logs, errors, and 404 handling
  modules/         # Feature modules (routes + services)
  providers/       # External/custom backend adapter implementations
  types/           # Runtime type augmentation (Express request context)
```

## Route Standards

1. Public APIs must be versioned under `/v1/...`.
2. Legacy routes may remain temporarily (`/status`, `/message/:name`) but must have a versioned counterpart.
3. Route files live in `modules/<feature>/<feature>.routes.ts`.
4. Route handlers should be thin: validate input, call service, map response.

## Contracts and Response Standards

1. Versioned success responses must use envelope shape:
   - `success: true`
   - `data`
   - `meta` with `correlationId`, `requestId`, `timestamp`
2. Error responses must use envelope shape:
   - `success: false`
   - `error` with `code`, `message`, optional `details`
   - `meta` with `correlationId`, `requestId`, `timestamp`
3. Vendor payloads must be normalized into gateway contracts before returning to consumers.

## Provider Standards

1. Each provider must implement a module-scoped interface (for example `ContentProvider`).
2. Provider selection happens in `gateway/provider-registry.ts`, never inside route handlers.
3. Provider implementations must throw normalized gateway errors for upstream failures.
4. Add a static/local fallback provider when possible to keep routes operational without external dependencies.

## Dependency Boundaries

1. App layers (`apps/web`, `apps/admin`) should consume gateway APIs, not vendor SDKs, for covered domains.
2. Shared API schemas must live in the dedicated workspace package `packages/api-contracts`.
3. Avoid importing `apps/web` code into `apps/api`; cross-app dependencies should happen through packages only.

## Environment Conventions

1. `API_GATEWAY_CONTENT_PROVIDER` controls provider selection (`sanity` or `static`).
2. `API_GATEWAY_CORS_ORIGINS` uses comma-separated origins.
3. `API_PORT` or `PORT` controls API listen port.
4. CORS defaults:
   - `production`: strict allowlist-only. Empty allowlist disables cross-origin browser requests.
   - `development` and `test`: empty allowlist defaults to permissive CORS.
5. Sanity provider config is resolved from:
   - `SANITY_STUDIO_PROJECT_ID` (fallback: `NEXT_PUBLIC_SANITY_PROJECT_ID`)
   - `SANITY_STUDIO_DATASET` (fallback: `NEXT_PUBLIC_SANITY_DATASET`)
   - `SANITY_API_VERSION` (fallback: `NEXT_PUBLIC_SANITY_API_VERSION`)
   - `SANITY_API_READ_TOKEN`
   - `SANITY_USE_CDN`

## Adding a New Integration

1. Define or extend gateway contracts in `contracts/`.
   - Canonical contracts must be authored in `packages/api-contracts` and consumed from there.
2. Create provider interface and implementation(s) in `providers/<domain>/`.
3. Register provider selection in `gateway/provider-registry.ts`.
4. Create/extend module service in `modules/<domain>/<domain>.service.ts`.
5. Create/extend routes in `modules/<domain>/<domain>.routes.ts`.
6. Add route + service + provider tests.
7. Update `.env.example` and docs.

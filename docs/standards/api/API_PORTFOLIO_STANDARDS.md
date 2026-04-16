# Portfolio API Standards

This document defines standards for `apps/api` as the portfolio-focused API boundary for the monorepo.

## Objectives

1. Provide a stable API surface for `apps/web` and other public-facing consumers.
2. Keep third-party/custom backend integrations behind provider adapters.
3. Avoid deeply nested cross-app dependencies.
4. Keep content providers replaceable without breaking consumers.

## Architecture

```txt
apps/api/src/
  config/          # Environment and runtime configuration
  contracts/       # DTOs, response envelopes, and shared error models
  providers/       # Provider registries and external/custom backend adapter implementations
  middleware/      # Request context, access logs, errors, and 404 handling
  modules/         # Feature modules (routes + services)
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
3. Vendor payloads must be normalized into canonical API contracts before returning to consumers.

## Provider Standards

1. Each provider must implement a module-scoped interface (for example `ContentProvider`).
2. Provider selection happens in `providers/provider-registry.ts`, never inside route handlers.
3. Provider implementations must throw normalized portfolio API errors for upstream failures.
4. Add a static/local fallback provider when possible to keep routes operational without external dependencies.

## Dependency Boundaries

1. App layers should consume portfolio APIs, not vendor SDKs, for covered domains.
2. Shared API schemas must live in the dedicated workspace package `packages/api-contracts`.
3. Avoid importing `apps/web` code into `apps/api`; cross-app dependencies should happen through packages only.

## Environment Conventions

1. `PORTFOLIO_API_CONTENT_PROVIDER` controls provider selection (`local` or `static`).
2. `PORTFOLIO_API_CORS_ORIGINS` uses comma-separated origins.
3. `API_PORT` or `PORT` controls API listen port.
4. CORS defaults:
   - `production`: strict allowlist-only. Empty allowlist disables cross-origin browser requests.
   - `development` and `test`: empty allowlist defaults to permissive CORS.
5. Local content provider reads typed snapshots from `@portfolio/content-data` by default.

## Adding a New Integration

1. Define or extend portfolio API contracts in `contracts/`.
   - Canonical contracts must be authored in `packages/api-contracts` and consumed from there.
2. Create provider interface and implementation(s) in `providers/<domain>/`.
3. Register provider selection in `providers/provider-registry.ts`.
4. Create/extend module service in `modules/<domain>/<domain>.service.ts`.
5. Create/extend routes in `modules/<domain>/<domain>.routes.ts`.
6. Add route + service + provider tests.
7. Update `.env.example` and docs.

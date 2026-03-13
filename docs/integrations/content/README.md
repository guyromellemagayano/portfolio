# Content Integration Docs

Content integration docs are grouped here.

Current ownership model:

- `apps/api` owns runtime content retrieval for article and standalone page APIs.
- `apps/web` consumes content data from `apps/api` (`/v1/content/articles`, `/v1/content/articles/:slug`, `/v1/content/pages`, `/v1/content/pages/:slug`).
- Local content snapshots are sourced from `@portfolio/content-data`.

## Runtime Notes

- `API_GATEWAY_CONTENT_PROVIDER=local` uses typed local content snapshots.
- `API_GATEWAY_CONTENT_PROVIDER=static` uses the empty static fallback provider.
- `apps/web` exposes `POST /api/revalidate/content` to invalidate cache tags and paths.

## Content Revalidation API

- Configure `CONTENT_REVALIDATE_SECRET` in `apps/web`.
- Send credentials as `Authorization: Bearer <secret>` or `x-content-revalidate-secret`.
- Supported payloads:
  - `{ "resource": "article", "slug": "example-article" }`
  - `{ "resource": "page", "slug": "now" }`
- Revalidates route tags/paths plus `/sitemap.xml`.

## Local Smoke Testing (Playwright)

- `apps/e2e` includes a content pipeline smoke suite (`@content`) that verifies:
  - API gateway content list routes
  - Web route rendering
  - `POST /api/revalidate/content`
- Optional seeded slug env vars:
  - `E2E_CONTENT_ARTICLE_SLUG`
  - `E2E_CONTENT_PAGE_SLUG`
- Run:

```bash
pnpm --filter e2e exec playwright test --project chromium --grep "@content"
```

## One-Time Snapshot Export

Use the migration script from `@portfolio/content-data` to export Sanity data into local typed modules:

```bash
pnpm --filter @portfolio/content-data snapshot:export:sanity
```

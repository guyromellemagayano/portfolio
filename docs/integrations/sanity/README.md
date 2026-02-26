# Sanity Integration Docs

Sanity-related integration docs are grouped here.

Current references:

- Shared Studio package: `packages/sanity-studio/README.md`
- Web app embedded Studio config: `apps/web/sanity.config.ts`
- Web app Sanity CLI config: `apps/web/sanity.cli.ts`
- API gateway Sanity provider: `apps/api/src/providers/content/sanity-content.provider.ts`

## Current Ownership Model

- `apps/api` owns runtime Sanity content retrieval for article and standalone page APIs.
- `apps/web` consumes content data from `apps/api` (`/v1/content/articles`, `/v1/content/articles/:slug`, `/v1/content/pages`, `/v1/content/pages/:slug`), not directly from Sanity.
- `apps/web` still hosts embedded Studio and draft-mode routes for content administration.
- `apps/web` article pages and Sanity-backed standalone pages rely on the API gateway/Sanity path and do not auto-fallback to MDX on gateway errors.

## Consumer Contract

- Canonical article/page and envelope contracts are shared via `@portfolio/api-contracts`.

## Runtime Notes

- For local development, `apps/api` may read `NEXT_PUBLIC_SANITY_*` values when server-side `SANITY_*` values are absent.
- In production, `apps/api` only accepts server-side `SANITY_*` values for Sanity provider resolution.

## Local Development (Recommended)

- Use a non-production dataset locally (recommended: `development`):
  - `NEXT_PUBLIC_SANITY_DATASET="development"`
  - `SANITY_DATASET="development"`
- Use the local edge root domain for metadata/canonical testing:
  - `NEXT_PUBLIC_SITE_URL="http://guyromellemagayano.test"`
- Embedded Studio local URL (production-like path, same origin as the site):
  - `http://guyromellemagayano.test/studio`
- In Sanity project settings, add the Studio URL as a development host:
  - `http://guyromellemagayano.test/studio`
- In Sanity API CORS origins, allow the local web/studio origin:
  - `http://guyromellemagayano.test`
- If you switch to the `.localhost` fallback mode, add the `.localhost` equivalents for the Studio development host and CORS origin.
- After changing local env or domain settings, restart the edge stack:
  ```bash
  make down-edge
  make up-edge-watch
  ```

## Production (Vercel `apps/web`)

- Embedded Studio remains on the same web origin at `/studio` (for example `https://guyromellemagayano.com/studio`).
- The `apps/web` Vercel project does not deploy `apps/api`; deploy `apps/api` separately and point the web app to it.
- Set production web env vars to deployed URLs (not `localhost` / `.test`):
  - `NEXT_PUBLIC_SITE_URL="https://guyromellemagayano.com"`
  - `NEXT_PUBLIC_API_URL="https://<your-api-domain>"`
  - `API_GATEWAY_URL="https://<your-api-domain>"`
- Add the production web origin to Sanity API CORS origins:
  - `https://guyromellemagayano.com`

## Cache Revalidation (Web)

- `apps/web` exposes `POST /api/revalidate/sanity` to process Sanity webhook events and invalidate Next.js content cache tags and paths.
- The webhook route invalidates both cache tags (`revalidateTag`) and page paths (`revalidatePath`) for article and standalone page consistency.
- Configure `SANITY_WEBHOOK_SECRET` in `apps/web` and send it as `Authorization: Bearer <secret>` (or `x-sanity-webhook-secret`).
- Recommended Sanity webhook filter: `_type in ["article", "page"]`
- Recommended webhook projection payload:
  ```groq
  {
    "_type": _type,
    "slug": slug.current
  }
  ```
- Article webhooks revalidate:
  - `articles`
  - `article:<slug>` for current and previous slugs when present
- Standalone page webhooks revalidate:
  - `pages`
  - `page:<slug>`
  - `/<slug>`

## Local Smoke Testing (Playwright)

- `apps/e2e` includes a Sanity content pipeline smoke suite (`@sanity`) that verifies:
  - API gateway content list route
  - Web route render
  - `POST /api/revalidate/sanity`
- The smoke suite reads local env from the workspace root `.env.local`.
- Optional seeded slug env vars:
  - `E2E_SANITY_ARTICLE_SLUG`
  - `E2E_SANITY_PAGE_SLUG`
- `SANITY_WEBHOOK_SECRET` is required for webhook assertions.
- Run:
  ```bash
  pnpm --filter e2e exec playwright test --project chromium --grep "@sanity"
  ```

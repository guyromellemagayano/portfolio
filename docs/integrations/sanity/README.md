# Sanity Integration Docs

Sanity-related integration docs are grouped here.

Current references:

- Shared Studio package: `packages/sanity-studio/README.md`
- Web app Studio deploy config: `apps/web/sanity.config.ts`
- Web app Sanity CLI config: `apps/web/sanity.cli.ts`
- API gateway Sanity provider: `apps/api/src/providers/content/sanity-content.provider.ts`

## Current Ownership Model

- `apps/api` owns runtime Sanity content retrieval for article and standalone page APIs.
- `apps/web` consumes content data from `apps/api` (`/v1/content/articles`, `/v1/content/articles/:slug`, `/v1/content/pages`, `/v1/content/pages/:slug`), not directly from Sanity.
- Sanity Studio is deployed to Sanity-hosted infrastructure (`*.sanity.studio`) and uses `apps/web` preview/revalidation APIs.
- `apps/web` article pages and Sanity-backed standalone pages rely on the API gateway/Sanity path and do not auto-fallback to MDX on gateway errors.

## Consumer Contract

- Canonical article/page and envelope contracts are shared via `@portfolio/api-contracts`.

## Runtime Notes

- For local development, `apps/api` may read `NEXT_PUBLIC_SANITY_*` values when server-side `SANITY_*` values are absent.
- In production, `apps/api` only accepts server-side `SANITY_*` values for Sanity provider resolution.

## Studio Hosting Model

- Studio is not served by `apps/web` routes.
- Studio deploys from monorepo config to Sanity-hosted infra:
  ```bash
  pnpm --filter web sanity:deploy
  ```
- Hosted Studio must target web preview API through `SANITY_STUDIO_PREVIEW_ORIGIN`:
  - `https://guyromellemagayano.com` (production)
  - `https://guyromellemagayano.local` (local edge)
- `sanity deploy` resolves env values from the deploy execution context (for example `apps/web/.env.local`, shell exports, or CI env vars).
- Vercel project envs and the Vercel Sanity integration do not automatically populate envs for a Sanity-hosted Studio deploy.

### Troubleshooting: `missing-project-id.api.sanity.io`

- Cause: Studio was deployed without Sanity project env vars in the deploy/runtime context.
- Fix:
  - Ensure at least one of these pairs is present where `pnpm --filter web sanity:deploy` runs:
    - `SANITY_STUDIO_PROJECT_ID` + `SANITY_STUDIO_DATASET` (preferred)
    - `SANITY_STUDIO_API_PROJECT_ID` + `SANITY_STUDIO_API_DATASET`
    - `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET`
    - `SANITY_PROJECT_ID` + `SANITY_DATASET`
  - Studio deploy/build is strict env-driven (no hardcoded project/dataset defaults) and now fails fast with a clear error when these vars are missing.
  - Redeploy Studio after envs are set.

## Local Development (Recommended)

- Use a non-production dataset locally (recommended: `development`):
  - `NEXT_PUBLIC_SANITY_DATASET="development"`
  - `SANITY_DATASET="development"`
- Use the local edge web domain for metadata/canonical testing:
  - `NEXT_PUBLIC_SITE_URL="https://guyromellemagayano.local"`
- For Studio preview links from hosted Studio to local web, set:
  - `SANITY_STUDIO_PREVIEW_ORIGIN="https://guyromellemagayano.local"`
- In Sanity API CORS origins, allow the local web origin:
  - `https://guyromellemagayano.local`
- If you switch to the `.localhost` fallback mode, use the `.localhost` value for `SANITY_STUDIO_PREVIEW_ORIGIN` and CORS origin.
- After changing local env or domain settings, restart the edge stack:
  ```bash
  make down-edge
  make up-edge-watch
  ```

## Production (Vercel `apps/web`)

- Studio is hosted on Sanity infrastructure (for example `https://<your-studio>.sanity.studio`).
- The `apps/web` Vercel project does not deploy `apps/api`; deploy `apps/api` separately and point the web app to it.
- Set production web env vars to deployed URLs (not `localhost` / `.local`):
  - `NEXT_PUBLIC_SITE_URL="https://guyromellemagayano.com"`
  - `NEXT_PUBLIC_API_URL="https://<your-api-domain>"`
  - `API_GATEWAY_URL="https://<your-api-domain>"`
- Set `SANITY_STUDIO_PREVIEW_ORIGIN="https://guyromellemagayano.com"` in the Studio deployment environment.
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

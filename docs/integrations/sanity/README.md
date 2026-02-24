# Sanity Integration Docs

Sanity-related integration docs are grouped here.

Current references:

- Shared Studio package: `packages/sanity-studio/README.md`
- Web app embedded Studio config: `apps/web/sanity.config.ts`
- Web app Sanity CLI config: `apps/web/sanity.cli.ts`
- API gateway Sanity provider: `apps/api/src/providers/content/sanity-content.provider.ts`

## Current Ownership Model

- `apps/api` owns runtime Sanity content retrieval for article APIs.
- `apps/web` consumes article data from `apps/api` (`/v1/content/articles`, `/v1/content/articles/:slug`), not directly from Sanity.
- `apps/web` still hosts embedded Studio and draft-mode routes for content administration.
- `apps/web` article pages rely on the API gateway/Sanity path and do not auto-fallback to MDX on gateway errors.

## Consumer Contract

- Canonical article and envelope contracts are shared via `@portfolio/api-contracts`.

## Runtime Notes

- For local development, `apps/api` may read `NEXT_PUBLIC_SANITY_*` values when server-side `SANITY_*` values are absent.
- In production, `apps/api` only accepts server-side `SANITY_*` values for Sanity provider resolution.

## Cache Revalidation (Web)

- `apps/web` exposes `POST /api/revalidate/sanity` to process Sanity webhook events and invalidate Next.js article cache tags and paths.
- The webhook route invalidates both cache tags (`revalidateTag`) and article page paths (`revalidatePath`) for list/detail consistency.
- Configure `SANITY_WEBHOOK_SECRET` in `apps/web` and send it as `Authorization: Bearer <secret>` (or `x-sanity-webhook-secret`).
- Article webhooks revalidate:
  - `articles`
  - `article:<slug>` for current and previous slugs when present

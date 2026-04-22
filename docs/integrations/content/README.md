# Content Integration Docs

Content integration docs are grouped here.

Current ownership model:

- `apps/api` owns runtime content retrieval for article and standalone page APIs.
- `apps/web` consumes content data from `apps/api` (`/v1/content/articles`, `/v1/content/articles/:slug`, `/v1/content/pages`, `/v1/content/pages/:slug`).
- Local content snapshots are sourced from `@portfolio/content-data`.
- `@portfolio/content-data` is the only content database in the monorepo.

## Runtime Notes

- `PORTFOLIO_API_CONTENT_PROVIDER=local` uses typed local content snapshots.
- `PORTFOLIO_API_CONTENT_PROVIDER=static` uses the empty static fallback provider.
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
  - portfolio API content list routes
  - Web route rendering
  - `POST /api/revalidate/content`
- Optional seeded slug env vars:
  - `E2E_CONTENT_ARTICLE_SLUG`
  - `E2E_CONTENT_PAGE_SLUG`
- Run:

```bash
pnpm --filter e2e exec playwright test --project chromium --grep "@content"
```

## Snapshot Maintenance

`@portfolio/content-data` is the canonical local snapshot source.

Author content in:

- `packages/content-data/src/articles.ts`
- `packages/content-data/src/pages.ts`
- `packages/content-data/src/portfolio.ts`
- `packages/content-data/src/portfolio/`

Use:

```bash
pnpm content:check
```

That validates the content package with type checks and tests before the change fans out through the API and web layers.

## Portfolio-Style Data Model

`@portfolio/content-data/src/portfolio.ts` assembles a Portfolio-style content graph compatible with custom CMS backends:

- `profile`, `navigation`, `socialLinks`
- `projects`, `speakingAppearances`, `useCategories`, `workExperience`, `photos`
- `pages` composed with typed section blocks (`hero`, `richText`, `projects`, `speaking`, `uses`, `experience`, `photoGallery`, `ctaList`)

## Django/Wagtail Fit

Wagtail is a good fit for this model:

- Use snippets for reusable entities (projects, speaking appearances, social links, uses categories)
- Use page models for route documents (`home`, `about`, `projects`, `speaking`, `uses`, `contact`)
- Use `StreamField` blocks to model page sections and reference snippet records by slug/id
- Expose headless APIs (Wagtail API v2 or custom DRF endpoints) matching `@portfolio/api-contracts/content/portfolio`

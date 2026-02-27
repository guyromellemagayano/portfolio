# Vercel Deployment (Monorepo)

This monorepo deploys to Vercel as **three separate projects**:

- `apps/web` -> `guyromellemagayano.com` (main site + embedded Sanity Studio at `/studio`)
- `apps/api` -> `api.guyromellemagayano.com` (REST API gateway)
- `apps/admin` -> `admin.guyromellemagayano.com` (Vite admin app)

## Why Three Projects

- `apps/web` is a Next.js app and is already Vercel-native.
- `apps/api` is an Express server and is adapted to a Vercel Node Function.
- `apps/admin` is a Vite static app and deploys cleanly as its own site.

This keeps the existing app boundaries intact and avoids moving API gateway logic into `apps/web`.

## Production Domains

- Web: `https://guyromellemagayano.com`
- API: `https://api.guyromellemagayano.com`
- Admin: `https://admin.guyromellemagayano.com`
- Studio (embedded): `https://guyromellemagayano.com/studio`

## Vercel Project Setup

## `apps/web`

- Root Directory: `apps/web`
- Framework Preset: Next.js
- Install Command: default
- Build Command: default (Turbo auto-detection is acceptable)
- Output Directory: default (`.next`)

### `apps/web` Production envs (required)

```env
NEXT_PUBLIC_SITE_URL=https://guyromellemagayano.com
NEXT_PUBLIC_API_URL=https://api.guyromellemagayano.com
API_GATEWAY_URL=https://api.guyromellemagayano.com

NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19

SANITY_API_READ_TOKEN=...
SANITY_WEBHOOK_SECRET=...
```

Optional sitemap behavior envs (only if you want overrides):

```env
SITEMAP_SITE_URL=https://www.guyromellemagayano.com
SITEMAP_INCLUDE_CMS_CONTENT=true
SITEMAP_FAIL_ON_CMS_FETCH_ERROR=false
```

- `SITEMAP_SITE_URL` overrides the sitemap host only (otherwise `apps/web` uses `NEXT_PUBLIC_SITE_URL` / Vercel host envs).
- `SITEMAP_INCLUDE_CMS_CONTENT=false` forces `sitemap.xml` to publish static routes only.
- `SITEMAP_FAIL_ON_CMS_FETCH_ERROR=true` makes sitemap generation fail instead of falling back when API/CMS fetches fail.

### `apps/web` Preview envs (decision-locked)

Set:

```env
NEXT_PUBLIC_API_URL=https://api.guyromellemagayano.com
API_GATEWAY_URL=https://api.guyromellemagayano.com
```

Do **not** set in Preview:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SITE_URL`

This keeps Preview Studio disabled while allowing Preview content pages to read from the production API.

## `apps/api`

- Root Directory: `apps/api`
- Framework Preset: Other / Node
- Install Command: default
- Build Command: default (Vercel function transpilation) or `pnpm build` if your Vercel project requires it
- Output Directory: `public` (or leave empty and let `apps/api/vercel.json` apply)

### `apps/api` dashboard setting gotcha (important)

- `apps/api/vercel.json` uses rewrites to route requests into the Vercel function and sets `outputDirectory` to `public`.
- The `public/` folder is intentionally empty and exists only to satisfy Vercel when a project expects an output directory.
- If the dashboard is still set to `dist`, Vercel can serve `dist/index.js` at `https://api.../` instead of invoking the API function.
- If you see raw compiled JavaScript in the browser at the API domain root:
  - change the project Output Directory to `public` (or clear it so repo config applies)
  - redeploy the `apps/api` project

### `apps/api` Production envs (required)

```env
NODE_ENV=production
API_GATEWAY_CONTENT_PROVIDER=sanity

SANITY_PROJECT_ID=...
SANITY_DATASET=production
SANITY_API_VERSION=2025-02-19
SANITY_API_READ_TOKEN=...
SANITY_USE_CDN=true
```

### `apps/api` Recommended envs

```env
API_GATEWAY_CORS_ORIGINS=https://guyromellemagayano.com,https://admin.guyromellemagayano.com
SANITY_REQUEST_TIMEOUT_MS=...
SANITY_REQUEST_MAX_RETRIES=...
SANITY_REQUEST_RETRY_DELAY_MS=...
```

### `apps/api` Vercel adapter behavior

- Public API routes remain rooted at `/v1/*` (no public `/api` prefix).
- `apps/api/vercel.json` rewrites requests to the Vercel function entrypoint.
- The function handler strips the internal `/api` rewrite prefix before delegating to Express.

## `apps/admin`

- Root Directory: `apps/admin`
- Framework Preset: Vite (or Other if Vite is not selected)
- Install Command: default
- Build Command: `pnpm build`
- Output Directory: `dist`

### `apps/admin` envs

- None required today.
- If the admin app later consumes the API directly from the browser, standardize on:
  - `VITE_API_BASE_URL=https://api.guyromellemagayano.com`

## Sanity Production Setup

- Register Studio host at:
  - `https://guyromellemagayano.com/studio`
- Add Sanity API CORS origin:
  - `https://guyromellemagayano.com`
- Configure webhook:
  - URL: `https://guyromellemagayano.com/api/revalidate/sanity`
  - Header: `Authorization: Bearer <SANITY_WEBHOOK_SECRET>`
  - Filter: `_type in ["article", "page"]`
  - Projection:

    ```groq
    {
      "_type": _type,
      "slug": slug.current
    }
    ```

## Verification Checklist

### API

- `https://api.guyromellemagayano.com/` -> redirects to `/v1/status`
- `https://api.guyromellemagayano.com/v1/status`
- `https://api.guyromellemagayano.com/v1/content/articles`
- `https://api.guyromellemagayano.com/v1/content/pages`

### Web

- `https://guyromellemagayano.com`
- `https://guyromellemagayano.com/studio`
- `https://guyromellemagayano.com/sitemap.xml`
- Article and page routes render with correct metadata and canonical URLs

### Admin

- `https://admin.guyromellemagayano.com`
- Preview deploy URL for `apps/admin`

## Repo Smoke Check (Post-Deploy)

Run the repo-level production smoke check from the workspace root:

```bash
make prod-smoke
```

This verifies:

- `web` home
- `web` Studio path (`/studio`)
- `web` `sitemap.xml`
- `api` root redirect target (via `curl -L`)
- `api` `/v1/status`
- `api` content list routes (`articles`, `pages`)
- `admin` home

### Optional seeded route checks

If you want to assert one known published article and page route:

```bash
make prod-smoke \
  PROD_SMOKE_ARTICLE_PATH="/articles/your-article-slug" \
  PROD_SMOKE_PAGE_PATH="/your-page-slug"
```

### Override domains (if needed)

```bash
make prod-smoke \
  PROD_SMOKE_WEB_URL="https://www.guyromellemagayano.com" \
  PROD_SMOKE_API_URL="https://api.guyromellemagayano.com" \
  PROD_SMOKE_ADMIN_URL="https://admin.guyromellemagayano.com"
```

## Notes

- Do not use `localhost`, `127.0.0.1`, `*.test`, or `*.localhost` for production Vercel envs such as `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`, or `API_GATEWAY_URL`.
- Local Docker + Traefik remains the local development platform and is not replaced by this deployment setup.

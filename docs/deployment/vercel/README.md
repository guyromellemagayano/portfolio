# Vercel Deployment (Monorepo)

This monorepo deploys to Vercel as three separate projects:

- `apps/web` -> `guyromellemagayano.com`
- `apps/api` -> `api.guyromellemagayano.com`
- `apps/admin` -> `admin.guyromellemagayano.com`

## Why Three Projects

- `apps/web` is a Next.js app and is Vercel-native.
- `apps/api` is an Elysia service adapted to a Vercel Bun Function.
- `apps/admin` is a Vite static app.

## Production Domains

- Web: `https://guyromellemagayano.com`
- API: `https://api.guyromellemagayano.com`
- Admin: `https://admin.guyromellemagayano.com`

## Vercel Project Setup

### Local Env Pull Automation

```bash
make vercel-env-pull VERCEL_ENV_TARGET=development
make vercel-env-sync-local VERCEL_ENV_TARGET=development
```

For preview branch env pulls:

```bash
make vercel-env-pull VERCEL_ENV_TARGET=preview VERCEL_GIT_BRANCH=feature/content-migration
```

## `apps/web`

- Root Directory: `apps/web`
- Framework Preset: Next.js
- Output Directory: default (`.next`)

### `apps/web` Production envs (required)

```env
NEXT_PUBLIC_SITE_URL=https://guyromellemagayano.com
NEXT_PUBLIC_API_URL=https://api.guyromellemagayano.com
API_GATEWAY_URL=https://api.guyromellemagayano.com
CONTENT_REVALIDATE_SECRET=...
```

Optional sitemap behavior envs:

```env
SITEMAP_SITE_URL=https://www.guyromellemagayano.com
SITEMAP_INCLUDE_CMS_CONTENT=true
SITEMAP_FAIL_ON_CMS_FETCH_ERROR=false
```

### `apps/web` Preview envs

```env
NEXT_PUBLIC_API_URL=https://api.guyromellemagayano.com
API_GATEWAY_URL=https://api.guyromellemagayano.com
```

## `apps/api`

- Root Directory: `apps/api`
- Framework Preset: Other
- Output Directory: `public` (or empty so `apps/api/vercel.json` applies)

### `apps/api` Production envs (required)

```env
NODE_ENV=production
API_GATEWAY_CONTENT_PROVIDER=local
```

### `apps/api` Recommended envs

```env
API_GATEWAY_CORS_ORIGINS=https://guyromellemagayano.com
```

### `apps/api` Content caching profile

- `/v1/content/articles`
- `/v1/content/articles/:slug`
- `/v1/content/pages`
- `/v1/content/pages/:slug`

Return headers:

- `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`

## `apps/admin`

- Root Directory: `apps/admin`
- Framework Preset: Vite
- Build Command: `pnpm build`
- Output Directory: `dist`

## Verification Checklist

### API

- `https://api.guyromellemagayano.com/` -> redirects to `/v1/status`
- `https://api.guyromellemagayano.com/v1/status`
- `https://api.guyromellemagayano.com/v1/content/articles`
- `https://api.guyromellemagayano.com/v1/content/pages`

### Web

- `https://guyromellemagayano.com`
- `https://guyromellemagayano.com/sitemap.xml`
- `POST /api/revalidate/content` revalidates route content and `/sitemap.xml`

### Admin

- `https://admin.guyromellemagayano.com`

## Repo Smoke Check (Post-Deploy)

```bash
make prod-smoke
```

## Notes

- Do not use local hostnames (`localhost`, `127.0.0.1`, `*.local`) for production env values.
- Local Docker + Traefik remains the local development platform.

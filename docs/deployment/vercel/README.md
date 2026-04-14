# Vercel Deployment (Monorepo)

This monorepo deploys to Vercel as three separate projects:

- `apps/web` -> `guyromellemagayano.com`
- `apps/api-portfolio` -> `api.guyromellemagayano.com`
- `apps/opsdesk` -> `opsdesk.guyromellemagayano.com`

## Why Three Projects

- `apps/web` is a Next.js app and is Vercel-native.
- `apps/api-portfolio` is an Elysia service adapted to a Vercel Bun Function.
- `apps/opsdesk` is a Vite static app.

## Production Domains

- Web: `https://guyromellemagayano.com`
- API: `https://api.guyromellemagayano.com`
- Admin: `https://opsdesk.guyromellemagayano.com`

## Vercel Project Setup

### Local Env Pull Automation

```bash
sh docker/scripts/vercel-env-pull.sh apps/web .env.local development ""
sh docker/scripts/vercel-env-pull.sh apps/api-portfolio .env.local development ""
sh docker/scripts/vercel-env-pull.sh apps/opsdesk .env.local development ""
```

For preview branch env pulls:

```bash
sh docker/scripts/vercel-env-pull.sh apps/web .env.local preview feature/content-migration
```

## `apps/web`

- Root Directory: `apps/web`
- Framework Preset: Next.js
- Output Directory: default (`.next`)

### `apps/web` Production envs (required)

```env
NEXT_PUBLIC_SITE_URL=https://guyromellemagayano.com
NEXT_PUBLIC_API_URL=https://api.guyromellemagayano.com
PORTFOLIO_API_URL=https://api.guyromellemagayano.com
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
PORTFOLIO_API_URL=https://api.guyromellemagayano.com
```

## `apps/api-portfolio`

- Root Directory: `apps/api-portfolio`
- Framework Preset: Other
- Output Directory: `public` (or empty so `apps/api-portfolio/vercel.json` applies)

### `apps/api-portfolio` Production envs (required)

```env
NODE_ENV=production
PORTFOLIO_API_CONTENT_PROVIDER=local
```

### `apps/api-portfolio` Recommended envs

```env
PORTFOLIO_API_CORS_ORIGINS=https://guyromellemagayano.com
```

### `apps/api-portfolio` Content caching profile

- `/v1/content/articles`
- `/v1/content/articles/:slug`
- `/v1/content/pages`
- `/v1/content/pages/:slug`

Return headers:

- `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`

## `apps/opsdesk`

- Root Directory: `apps/opsdesk`
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

- `https://opsdesk.guyromellemagayano.com`

## Repo Smoke Check (Post-Deploy)

```bash
sh docs/scripts/prod-vercel-smoke.sh \
  "https://www.guyromellemagayano.com" \
  "https://api.guyromellemagayano.com" \
  "https://opsdesk.guyromellemagayano.com" \
  "" \
  ""
```

## Notes

- Do not use local hostnames (`localhost`, `127.0.0.1`, `*.local`) for production env values.
- Local Docker Compose remains the local development platform.

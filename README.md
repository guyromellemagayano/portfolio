<!-- markdownlint-disable proper-names -->

# Guy Romelle Magayano | Portfolio

Portfolio monorepo for the public Astro site and retained Playwright setup.

## Stack

- `apps/web`: Astro, React, Tailwind
- `apps/e2e`: Playwright setup, with route specs paused for now
- `packages/*`: shared UI, hooks, logger, utils, and config packages

## Setup

```bash
corepack enable
corepack use pnpm@10.30.0
pnpm install
pnpm dev
```

Local development runs through Docker Compose on OrbStack. The web app is available at `http://portfolio.local:4321` by default. `SITE_URL_DEVELOPMENT`, `SITE_URL_PREVIEW`, and `SITE_URL_PRODUCTION` control environment-specific site origins, while `WEB_HOST` and `WEB_PORT` control the local server bind.

Useful local commands:

```bash
pnpm dev
pnpm dev:docker:detached
pnpm dev:docker:logs
pnpm dev:docker:down
pnpm dev:host
```

Environment files:

```bash
.env.local       # ignored local workstation defaults
.env.preview     # Vercel Preview values to copy into the Preview scope
.env.production  # Vercel Production values to copy into the Production scope
```

Keep secrets in ignored local files or Vercel's dashboard. Vercel provides `VERCEL_ENV`, `VERCEL_URL`, and `VERCEL_PROJECT_PRODUCTION_URL`.

## Monorepo Commands

```bash
pnpm build
pnpm check-types
pnpm lint
pnpm format:check
pnpm test
pnpm test:e2e:install
```

These commands run through Turborepo, so package dependency ordering, local/remote cache, and `--affected` filtering stay available.

Scoped Turbo commands:

```bash
pnpm build:web
pnpm check-types:web
pnpm lint:web
pnpm test:web
pnpm build:packages
pnpm test:e2e
```

Deployment stays outside Docker:

```bash
pnpm deploy:web
pnpm deploy:web:prod
```

## Content

Page, article, navigation, and portfolio data are hard-coded in `apps/web/src/data/` and rendered by Astro routes in `apps/web/src/pages/`.

## License

MIT. See `LICENSE`.

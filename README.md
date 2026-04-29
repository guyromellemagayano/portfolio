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

## Search And Performance Monitoring

Google Search Console:

1. Add a Domain property for `guyromellemagayano.com`.
2. Add the TXT record Google gives you at your DNS provider, then keep that record in place after verification.
3. If you use URL-prefix verification instead, copy only the `content` value from Google's HTML meta tag into `GOOGLE_SITE_VERIFICATION` in Vercel Production, deploy, and verify `https://www.guyromellemagayano.com/`.
4. Submit `https://www.guyromellemagayano.com/sitemap-index.xml` in the Search Console Sitemaps report.

Web Vitals:

1. Enable Vercel Web Analytics and Speed Insights for the Vercel project.
2. Deploy through Vercel so `VERCEL_ENV` is set. Local builds skip Vercel's observability scripts to keep local Lighthouse runs clean.
3. Use Vercel Speed Insights for field data while Search Console's Core Web Vitals report builds enough Chrome UX data.

Lighthouse CI:

```bash
pnpm lighthouse:ci
```

The Lighthouse CI workflow runs on pull requests and manual dispatches. Reports are written to `.lighthouseci/reports` locally and uploaded as the `lighthouse-reports` GitHub Actions artifact in CI.

## Content

Page, article, navigation, and portfolio data are hard-coded in `apps/web/src/data/` and rendered by Astro routes in `apps/web/src/pages/`.

## License

MIT. See `LICENSE`.

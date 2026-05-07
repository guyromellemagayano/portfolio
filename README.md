<!-- markdownlint-disable -->

# Guy Romelle Magayano | Portfolio

Portfolio monorepo for the public Astro site and retained Playwright setup.

## Stack

- `apps/web`: Astro, React, Tailwind
- `apps/e2e`: Playwright setup, with route specs paused for now
- `packages/*`: shared UI, hooks, logger, utils, and config packages

## Setup

```bash
corepack enable
corepack use pnpm@10.33.2
pnpm install
pnpm dev
```

Local development runs directly on the host machine. The web app is available at `http://localhost:4321` by default. `SITE_URL_DEVELOPMENT`, `SITE_URL_PREVIEW`, and `SITE_URL_PRODUCTION` control environment-specific site origins, while `WEB_HOST` and `WEB_PORT` control the local server bind.

Useful daily Make commands:

```bash
make help
make dev
make quick
make daily
```

Use `make quick` for the common pre-commit loop of linting, typechecking, and tests. Use `make daily` when formatting should also be checked.

## Monorepo Commands

```bash
make verify
make packages-verify
make components-verify
make ui-verify
make e2e-install
make e2e-smoke
```

These commands call the existing `pnpm` and Turborepo scripts, so package dependency ordering, local/remote cache, and scoped filtering stay available.

Scoped web commands:

```bash
make lint
make check-types
make test
make build
```

Deployment stays on Vercel and runs outside local containers:

```bash
make deploy
make deploy-prod
```

## Content

Page, article, navigation, and portfolio data are hard-coded in `apps/web/src/data/` and rendered by Astro routes in `apps/web/src/pages/`.

## License

MIT. See `LICENSE`.

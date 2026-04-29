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

The local web app runs at `http://127.0.0.1:4321`.

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

## Content

Page, article, navigation, and portfolio data are hard-coded in `apps/web/src/data/` and rendered by Astro routes in `apps/web/src/pages/`.

## License

MIT. See `LICENSE`.

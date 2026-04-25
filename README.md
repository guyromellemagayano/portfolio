<!-- markdownlint-disable proper-names -->

# Guy Romelle Magayano | Portfolio

Portfolio monorepo for the public Astro site and retained Playwright setup.

## Stack

- `apps/web`: Astro, React, MDX, Tailwind
- `apps/e2e`: Playwright setup, with route specs paused for now
- `packages/*`: shared UI, hooks, logger, utils, and config packages

## Setup

```bash
corepack enable
corepack use pnpm@10.30.0
pnpm install
pnpm --filter web dev
```

The local web app runs at `http://127.0.0.1:4321`.

## Commands

```bash
pnpm build
pnpm check-types
pnpm lint
pnpm format:check
pnpm test
pnpm --filter e2e test:e2e:install
```

App-scoped commands:

```bash
pnpm --filter web build
pnpm --filter web check-types
pnpm --filter web test:run
pnpm --filter e2e test:e2e
```

## Content

Page, article, navigation, and portfolio data are hard-coded in `apps/web/src/data/content/` and rendered by Astro routes in `apps/web/src/pages/`.

## License

MIT. See `LICENSE`.

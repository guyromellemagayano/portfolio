<!-- markdownlint-disable proper-names -->

# Guy Romelle Magayano | Portfolio

Full stack developer, open-source enthusiast, and a minimalist.

[![E2E Tests](https://github.com/guyromellemagayano/portfolio/actions/workflows/e2e.yml/badge.svg?branch=main)](https://github.com/guyromellemagayano/portfolio/actions/workflows/e2e.yml)
[![Dependabot](https://img.shields.io/badge/dependabot-enabled-025E8C?logo=dependabot&logoColor=white)](https://github.com/guyromellemagayano/portfolio/security/dependabot)
[![Husky](https://img.shields.io/badge/husky-enabled-4A4A55?logo=git&logoColor=white)](https://typicode.github.io/husky/)
[![Commitlint](https://img.shields.io/badge/commitlint-conventional-000000?logo=commitlint&logoColor=white)](https://commitlint.js.org/)
[![pnpm](https://img.shields.io/npm/v/pnpm?label=pnpm&logo=pnpm&color=F69220)](https://pnpm.io/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Turborepo](https://img.shields.io/npm/v/turbo?label=turborepo&logo=turborepo&color=EF4444)](https://turbo.build/repo)
[![TypeScript](https://img.shields.io/npm/v/typescript?label=typescript&logo=typescript&color=3178C6)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/npm/v/react?label=react&logo=react&color=149ECA)](https://react.dev/)
[![Next.js](https://img.shields.io/npm/v/next?label=next.js&logo=nextdotjs&color=000000)](https://nextjs.org/)
[![Vite](https://img.shields.io/npm/v/vite?label=vite&logo=vite&color=646CFF)](https://vite.dev/)
[![Express](https://img.shields.io/npm/v/express?label=express&logo=express&color=000000)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/npm/v/tailwindcss?label=tailwindcss&logo=tailwindcss&color=06B6D4)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/npm/v/vitest?label=vitest&logo=vitest&color=6E9F18)](https://vitest.dev/)
[![Playwright](https://img.shields.io/npm/v/%40playwright%2Ftest?label=playwright&logo=playwright&color=2EAD33)](https://playwright.dev/)
[![ESLint](https://img.shields.io/npm/v/eslint?label=eslint&logo=eslint&color=4B32C3)](https://eslint.org/)
[![Prettier](https://img.shields.io/npm/v/prettier?label=prettier&logo=prettier&color=F7B93E)](https://prettier.io/)
[![Stylelint](https://img.shields.io/npm/v/stylelint?label=stylelint&logo=stylelint&color=263238)](https://stylelint.io/)
[![License: MIT](https://img.shields.io/badge/license-MIT-22C55E.svg)](./LICENSE)

## For Readers

This is the monorepo behind my portfolio ecosystem.

It includes:

- `web`: public site built with Next.js
- `api`: Express service layer
- `e2e`: Playwright end-to-end tests
- shared `@portfolio/*` packages (components, hooks, logger, utils, shared configs)

## For Contributors

### Prerequisites

- Node.js `>=22`
- pnpm `>=10`

```bash
corepack enable
corepack use pnpm@10.30.0
```

### Quick Start

```bash
cp .env.example .env
pnpm install
make dev
```

### Workspace Map

| Path                         | Purpose                                  |
| ---------------------------- | ---------------------------------------- |
| `apps/web`                   | Next.js app (`next-intl`, MDX, Tailwind) |
| `apps/api`                   | Express API                              |
| `apps/e2e`                   | Playwright E2E suites                    |
| `docs`                       | Centralized project documentation        |
| `packages/components`        | Shared React components                  |
| `packages/api-contracts`     | Canonical API payload contracts          |
| `packages/ui`                | UI primitives/components                 |
| `packages/hooks`             | Shared hooks                             |
| `packages/utils`             | Utilities                                |
| `packages/logger`            | Structured logging                       |
| `packages/content-data`      | Typed local content snapshot data        |
| `packages/config-eslint`     | ESLint presets                           |
| `packages/config-typescript` | TypeScript presets                       |
| `packages/vitest-presets`    | Shared Vitest presets                    |

### Daily Commands

Run from repo root.

```bash
# Dev + build
make dev
make build
make build-packages

# Code quality
make lint
make lint-ci
make lint-fix
make format
make format-check
make check-types

# Tests
make test
make test-run
make test-coverage
make test-packages
make test-apps

# E2E
make test-e2e-install
make test-e2e-smoke
make test-e2e
make test-e2e-ui

# Local env helpers
make env-local-normalize
make content-check
```

Root `make` targets are thin wrappers around the existing root `pnpm` scripts, so the script definitions in `package.json` stay the single source of truth.

TypeScript unresolved imports are enforced by `make check-types` (and included in `make lint-ci`).

### App-Scoped Commands

```bash
pnpm --filter web dev
pnpm --filter api dev
pnpm --filter e2e test:e2e:ui
```

### Commits and Hooks

Use the commit wizard:

```bash
pnpm commit
```

Hooks currently enforced:

- `pre-commit`: `lint-staged`
- `commit-msg`: `commitlint`
- `pre-push`: `validate-branch-name`

### Testing Model

Vitest coverage thresholds come from `packages/vitest-presets`:

- `react` / `browser`: statements `80`, branches `75`, functions `80`, lines `80`
- `node`: statements `85`, branches `80`, functions `85`, lines `85`

Coverage reporters: `text`, `json`, `html`, `lcov`, `clover`.

### CI Workflows

- `E2E` (`.github/workflows/e2e.yml`)
  - runs on PRs to `main`
  - runs smoke suite by default
  - supports manual smoke/full dispatch

### Dependency Updates

- Dependabot: `.github/dependabot.yml` (weekly npm + GitHub Actions updates)
- Manual dependency updates:

```bash
pnpm pcu:check
pnpm pcu:update
pnpm pcu:security
pnpm pcu:security:fix
```

### Environment Variables

`.env.example` is the baseline template.

```bash
cp .env.example .env
```

`turbo.json` also declares `globalEnv` keys for task hashing.

Normalize a local `.env` from linked Vercel projects when needed:

```bash
make vercel-env-pull VERCEL_ENV_TARGET=development
make vercel-env-sync-local VERCEL_ENV_TARGET=development
```

Content keys used by `apps/web`:

- `CONTENT_REVALIDATE_SECRET` (shared secret for `POST /api/revalidate/content`)
- `API_GATEWAY_URL` (server-side base URL for `apps/api` content APIs)
- `NEXT_PUBLIC_API_URL` (fallback API base URL when `API_GATEWAY_URL` is not set)
- Article data in `apps/web` is retrieved from `apps/api` (`/v1/content/articles`) and normalized in `apps/web/src/utils/articles.ts`
- Standalone page data in `apps/web` is retrieved from `apps/api` (`/v1/content/pages`) and normalized in `apps/web/src/utils/pages.ts`

Gateway keys used by `apps/api`:

- `API_PORT` (fallback `PORT`, default `5001`)
- `API_GATEWAY_CORS_ORIGINS` (comma-separated allowlist)
- `API_GATEWAY_CONTENT_PROVIDER` (`local` or `static`)
- Content routes (`/v1/content/articles*`, `/v1/content/pages*`) return `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`

Gateway architecture and extension conventions:

- `docs/standards/api/API_PORTFOLIO_STANDARDS.md`

Article data flow:

- `apps/web` -> `apps/api` (`/v1/content/articles`) -> provider (`local` or `static`)
- `apps/web` -> `apps/api` (`/v1/content/pages`) -> provider (`local` or `static`)

Content cache revalidation:

- `POST /api/revalidate/content` revalidates content tags and paths, including `/sitemap.xml`

## License

MIT. See `LICENSE`.

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
- `admin`: internal/admin interface built with Vite + React Router
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
pnpm install
pnpm dev
```

### Workspace Map

| Path                         | Purpose                                          |
| ---------------------------- | ------------------------------------------------ |
| `apps/web`                   | Next.js app (`next-intl`, MDX, Sanity, Tailwind) |
| `apps/admin`                 | Vite + React Router app                          |
| `apps/api`                   | Express API                                      |
| `apps/e2e`                   | Playwright E2E suites                            |
| `docs`                       | Centralized project documentation                |
| `packages/components`        | Shared React components                          |
| `packages/api-contracts`     | Canonical API payload contracts                  |
| `packages/ui`                | UI primitives/components                         |
| `packages/hooks`             | Shared hooks                                     |
| `packages/utils`             | Utilities                                        |
| `packages/logger`            | Structured logging                               |
| `packages/sanity-studio`     | Shared Sanity Studio config and schema           |
| `packages/config-eslint`     | ESLint presets                                   |
| `packages/config-typescript` | TypeScript presets                               |
| `packages/vitest-presets`    | Shared Vitest presets                            |

### Daily Commands

Run from repo root.

```bash
# Dev + build
pnpm dev
pnpm build
pnpm build:packages

# Code quality
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
pnpm check-types

# Tests
pnpm test
pnpm test:run
pnpm test:coverage
pnpm test:packages
pnpm test:apps

# E2E
pnpm test:e2e:install
pnpm test:e2e:smoke
pnpm test:e2e
pnpm test:e2e:ui
```

### App-Scoped Commands

```bash
pnpm --filter web dev
pnpm --filter web sanity
pnpm --filter admin dev
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
cp .env.example .env.local
```

`turbo.json` also declares `globalEnv` keys for task hashing.

Sanity keys used by `apps/web`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION` (defaults to `2025-02-19`)
- `SANITY_API_READ_TOKEN` (optional for private datasets)
- Article data in `apps/web` is retrieved from `apps/api` (`/v1/content/articles`) and normalized in `apps/web/src/utils/articles.ts`
- `API_GATEWAY_URL` (server-side base URL for `apps/api` article/content APIs)
- `NEXT_PUBLIC_API_URL` (fallback API base URL when `API_GATEWAY_URL` is not set)

Gateway keys used by `apps/api`:

- `API_PORT` (fallback `PORT`, default `5001`)
- `API_GATEWAY_CORS_ORIGINS` (comma-separated allowlist)
- `API_GATEWAY_CONTENT_PROVIDER` (`sanity` or `static`)
- `SANITY_PROJECT_ID` / `SANITY_DATASET` / `SANITY_API_VERSION` (fallbacks to `NEXT_PUBLIC_SANITY_*`)
- `SANITY_API_READ_TOKEN`
- `SANITY_USE_CDN`

Gateway architecture and extension conventions:

- `docs/standards/api-gateway/API_GATEWAY_STANDARDS.md`

Embedded Studio route in `apps/web`:

- `GET /studio` (Sanity Studio)
- `GET /api/draft-mode/enable` (enable Draft Mode via Presentation Tool)
- `GET /api/draft-mode/disable` (disable Draft Mode)

Article data flow:

- `apps/web` -> `apps/api` (`/v1/content/articles`) -> provider (`sanity` or `static`)

## License

MIT. See `LICENSE`.

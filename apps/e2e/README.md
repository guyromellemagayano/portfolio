# E2E Test App

Playwright end-to-end test workspace for the monorepo.

## Commands

- `pnpm --filter e2e test:e2e` - run full e2e suite.
- `pnpm --filter e2e test:e2e:smoke` - run smoke-tagged e2e tests only.
- `pnpm --filter e2e test:e2e:ui` - open Playwright UI mode.
- `pnpm --filter e2e test:e2e:headed` - run tests in headed mode.
- `pnpm --filter e2e test:e2e:report` - open the generated HTML report.
- `pnpm --filter e2e test:e2e:install` - install required Playwright browser binaries.
- `pnpm --filter e2e test:e2e:install:ci` - install browser binaries and Linux deps for CI runners.

## CI Notes

- In CI, `playwright.config.ts` uses `pnpm --filter web start`.
- Build the web app first: `pnpm --filter web build`.
- Then execute smoke suite: `pnpm test:e2e:smoke`.

## Test Tagging

- Use `@smoke` in test names for PR-gated checks.

## Test File Naming

- Use `*.e2e.ts` for end-to-end tests.
- Use `*.setup.ts` for setup/bootstrap projects (for example auth/session state).

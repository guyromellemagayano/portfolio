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

- `playwright.config.ts` starts both the API gateway and web app via Playwright `webServer`.
- In CI, the API webServer uses `pnpm --filter api run build && pnpm --filter api start`.
- In CI, the web webServer uses `pnpm --filter web start`.
- Build the web app first in CI: `pnpm --filter web build`.
- Then execute smoke suite: `pnpm test:e2e:smoke`.

## Sanity Smoke Test Notes

- Sanity pipeline smoke tests live in `tests/sanity-content-pipeline.smoke.e2e.ts` and are tagged with `@sanity`.
- The suite reads env vars from the workspace root `.env.local` when present.
- Set `E2E_USE_EXTERNAL_SERVERS=1` to disable Playwright `webServer` startup and target externally managed app servers (used by the Dockerized e2e runners).
- `SANITY_WEBHOOK_SECRET` is required for the webhook revalidation portion of the smoke tests (tests skip if missing).
- Optional seeded slug env vars:
  - `E2E_SANITY_ARTICLE_SLUG` (an existing Sanity `article` slug)
  - `E2E_SANITY_PAGE_SLUG` (an existing Sanity `page` slug that does not conflict with static routes such as `about`, `articles`, `contact`, `projects`, `uses`, `api`, or `studio`)
- Example:

  ```bash
  pnpm --filter e2e exec playwright test --project chromium --grep "@sanity"
  ```

## Test Tagging

- Use `@smoke` in test names for PR-gated checks.

## Test File Naming

- Use `*.e2e.ts` for end-to-end tests.
- Use `*.setup.ts` for setup/bootstrap projects (for example auth/session state).

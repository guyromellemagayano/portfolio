<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/e2e`

Retained Playwright setup for the portfolio monorepo.

The route specs are intentionally paused for now. Keep this workspace so browser install, config, service startup, auth storage bootstrap, and future spec placement stay ready.

## Kept Setup

- `playwright.config.ts` - Playwright projects, Astro web server startup, reporters, and runtime defaults.
- `tests/auth.setup.ts` - Anonymous storage-state bootstrap.
- `package.json` scripts - Browser install, setup run, headed/UI modes, report viewing, linting, formatting, and typechecking.

## Scripts

Run from repo root with `pnpm --filter e2e <script>`.

- `test:e2e` - Run Playwright. With specs paused, this runs the setup project.
- `test:e2e:smoke` - Compatibility alias that runs the setup project while smoke specs are paused.
- `test:e2e:ui` - Open Playwright UI mode.
- `test:e2e:headed` - Run Playwright in headed mode.
- `test:e2e:report` - Open generated Playwright report.
- `test:e2e:install` - Install Chromium browser binary.
- `test:e2e:install:ci` - Install browser binary and Linux dependencies for CI.
- `lint` / `lint:fix` - ESLint checks/fixes.
- `check-types` - TypeScript checks.
- `format` / `format:check` - Prettier formatting checks.
- `clean` - Remove local E2E artifacts and caches.

## Add Specs Later

Add future browser specs under `tests/**/*.e2e.ts`.

Use `*.setup.ts` only for setup/bootstrap projects.

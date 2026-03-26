<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/e2e`

Playwright end-to-end testing workspace for the portfolio monorepo.

## Features

- 🚀 **Playwright Runner**: Full-browser E2E coverage with Chromium-first workflows
- 🎯 **Smoke Suite**: Fast PR-gated checks using `@smoke` tags
- 📱 **Mobile Coverage Project**: Dedicated `mobile-chrome` run target for smoke validation
- 🧱 **Managed Service Startup**: Playwright `webServer` orchestration for API + web services
- 🔌 **External Server Mode**: Support for Docker/pre-provisioned hosts via `E2E_USE_EXTERNAL_SERVERS=1`
- 🧪 **Content Pipeline Checks**: Content and webhook smoke coverage for local data integration paths
- 🔁 **Workspace Tooling Alignment**: Shared linting, typechecking, and formatting scripts

## Projects

Defined Playwright projects from `playwright.config.ts`:

- `setup` - Bootstraps auth/session state before test projects
- `chromium` - Main desktop suite (`Desktop Chrome`) with setup dependency
- `mobile-chrome` - Mobile smoke suite (`Pixel 7`) filtered by `@smoke`

## Scripts

Run from repo root with `pnpm --filter e2e <script>`.

- `test:e2e` - Run full Playwright suite
- `test:e2e:smoke` - Run tests tagged with `@smoke`
- `test:e2e:ui` - Open Playwright UI mode
- `test:e2e:headed` - Run tests in headed mode
- `test:e2e:report` - Open generated Playwright report
- `test:e2e:install` - Install Chromium browser binary
- `test:e2e:install:ci` - Install browser binary and Linux dependencies for CI
- `lint` / `lint:fix` - ESLint checks/fixes
- `check-types` - TypeScript checks
- `format` / `format:check` - Prettier formatting checks
- `clean` - Remove local E2E artifacts and caches

## Installation

Install workspace dependencies from repo root:

```bash
pnpm install
```

Install Playwright browser binaries:

```bash
pnpm --filter e2e test:e2e:install
```

For CI/Linux environments:

```bash
pnpm --filter e2e test:e2e:install:ci
```

## Setup

### 1. Standard Local Run

```bash
pnpm --filter e2e test:e2e
```

### 2. Smoke Validation

```bash
pnpm --filter e2e test:e2e:smoke
```

### 3. CI Startup Behavior

In CI, `playwright.config.ts` starts both services with `webServer`:

- API: `pnpm --filter api-portfolio run build && pnpm --filter api-portfolio start`
- Web: `pnpm --filter web start`

Recommended CI order:

```bash
pnpm --filter web build
pnpm --filter e2e test:e2e:smoke
```

### 4. External Server Mode

Disable Playwright-managed `webServer` and target externally managed hosts:

```bash
E2E_USE_EXTERNAL_SERVERS=1 pnpm --filter e2e test:e2e
```

## Integration Examples

### Run only content pipeline tests

```bash
pnpm --filter e2e exec playwright test --project chromium --grep "@content"
```

### Run only mobile smoke project

```bash
pnpm --filter e2e exec playwright test --project mobile-chrome
```

### Open Playwright UI for triage

```bash
pnpm --filter e2e test:e2e:ui
```

## Environment Notes

Content pipeline smoke checks are defined in `tests/content-pipeline.smoke.e2e.ts`.

- Loads env vars from workspace root `.env.local` when present
- Requires `CONTENT_REVALIDATE_SECRET` for webhook revalidation checks (tests skip when missing)
- Supports seeded slugs with `E2E_CONTENT_ARTICLE_SLUG` and `E2E_CONTENT_PAGE_SLUG`

`E2E_CONTENT_PAGE_SLUG` should not conflict with static routes such as `about`, `articles`, `contact`, `projects`, `uses`, or `api`.

## Best Practices

### 1. **Keep Smoke Coverage Fast**

- Tag essential PR coverage with `@smoke`.
- Keep broader suites for full CI or scheduled runs.

### 2. **Use Explicit Test Naming**

- Use `*.e2e.ts` for end-to-end specs.
- Use `*.setup.ts` for setup/bootstrap projects.

### 3. **Prefer Deterministic Inputs**

- Use seeded slugs and stable data contracts for content checks.
- Avoid hidden runtime dependencies in test setup.

### 4. **Separate Runtime Modes Clearly**

- Use Playwright `webServer` defaults for local/CI convenience.
- Use `E2E_USE_EXTERNAL_SERVERS=1` for Dockerized or pre-provisioned targets.

## Troubleshooting

### Common Issues

**Browser executable missing**

Install Playwright browser binaries:

```bash
pnpm --filter e2e test:e2e:install
```

**CI fails on missing system dependencies**

Use CI install script:

```bash
pnpm --filter e2e test:e2e:install:ci
```

**Content webhook tests are skipped**

Ensure `CONTENT_REVALIDATE_SECRET` is available in environment.

**Tests target wrong hosts or ports**

Check whether `E2E_USE_EXTERNAL_SERVERS` is set and verify target server availability.

## Dependencies

- Core test dependency: `@playwright/test`
- Tooling dependencies: `typescript`, `eslint`, `prettier`, `rimraf`, `@types/node`
- Shared config dependencies: `@portfolio/config-eslint`, `@portfolio/config-typescript`
- Package visibility: `private` workspace app

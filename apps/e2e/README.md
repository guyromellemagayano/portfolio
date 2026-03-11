<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `e2e`

Playwright end-to-end testing workspace for the portfolio monorepo.

## Features

- 🚀 **Playwright Runner**: Full-browser E2E coverage with Chromium-first workflows
- 🎯 **Smoke Suite**: Fast PR-gated checks with `@smoke` tagging
- 📱 **Mobile Smoke Project**: Dedicated `mobile-chrome` project for smoke coverage
- 🧱 **Dual Service Startup**: Playwright-managed API and web startup via `webServer`
- 🔌 **External Server Mode**: Supports Docker or pre-provisioned targets with `E2E_USE_EXTERNAL_SERVERS=1`
- 🧪 **Sanity Pipeline Coverage**: Smoke checks for content publication + revalidation behavior
- 🔁 **Workspace Tooling**: Shared lint, typecheck, and formatting standards

## Scripts

Run from repo root with `pnpm --filter e2e <script>`.

- `test:e2e` - Run the full Playwright suite
- `test:e2e:smoke` - Run tests tagged with `@smoke`
- `test:e2e:ui` - Open Playwright UI mode
- `test:e2e:headed` - Run tests in headed mode
- `test:e2e:report` - Open generated Playwright report
- `test:e2e:install` - Install Chromium browser binary
- `test:e2e:install:ci` - Install browser binary + Linux dependencies for CI
- `lint` / `lint:fix` - ESLint checks/fixes
- `check-types` - TypeScript checks
- `format` / `format:check` - Prettier formatting checks
- `clean` - Remove local E2E artifacts and caches

## Installation

Install workspace dependencies from repo root:

```bash
pnpm install
```

Install Playwright browser dependencies:

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

- API: `pnpm --filter api run build && pnpm --filter api start`
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

### Run only Sanity pipeline tests

```bash
pnpm --filter e2e exec playwright test --project chromium --grep "@sanity"
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

Sanity pipeline tests are defined in `tests/sanity-content-pipeline.smoke.e2e.ts`.

- Loads env vars from workspace root `.env.local` when present
- Requires `SANITY_WEBHOOK_SECRET` for webhook revalidation checks (tests skip when missing)
- Supports seeded slugs with `E2E_SANITY_ARTICLE_SLUG` and `E2E_SANITY_PAGE_SLUG`

`E2E_SANITY_PAGE_SLUG` should not conflict with static routes such as `about`, `articles`, `contact`, `projects`, `uses`, `api`, or `studio`.

## Best Practices

### 1. **Keep Smoke Coverage Fast**

- Tag essential PR coverage with `@smoke`.
- Keep broader suites for full CI or scheduled runs.

### 2. **Use Explicit Test Naming**

- Use `*.e2e.ts` for end-to-end specs.
- Use `*.setup.ts` for setup/bootstrap projects.

### 3. **Prefer Deterministic Inputs**

- Use seeded slugs and stable data contracts for Sanity checks.
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

Use the CI install script:

```bash
pnpm --filter e2e test:e2e:install:ci
```

**Sanity webhook tests are skipped**

Ensure `SANITY_WEBHOOK_SECRET` is available in the environment.

**Tests target wrong hosts or ports**

Check whether `E2E_USE_EXTERNAL_SERVERS` is set and verify target server availability.

## Dependencies

- Core test dependency: `@playwright/test`
- Tooling dependencies: `typescript`, `eslint`, `prettier`, `rimraf`, `@types/node`
- Shared config dependencies: `@portfolio/config-eslint`, `@portfolio/config-typescript`
- Package visibility: `private` workspace app

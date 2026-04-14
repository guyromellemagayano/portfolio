# Dockerized E2E

Playwright lives in `apps/e2e` and is grouped into two folder families:

- `portfolio-e2e`
- `jobs-e2e`

The Compose runner uses the `e2e` profile from `docker/compose/local.yml`.

## Commands

```bash
# full suite
make e2e

# list every discovered Playwright test
make e2e-list

# jobs project only
make jobs-e2e
make jobs-e2e-list
```

## How It Works

- The Playwright container runs with `E2E_USE_EXTERNAL_SERVERS=1`.
- The `e2e` service targets the already-running Compose services.
- `jobs-chromium` points at the jobs app on `http://jobs:3002`.
- The default `chromium` and `mobile-chrome` projects continue to target the portfolio web app on `http://web:3000`.

## Recommended Workflow

```bash
# full app stack
make up

# jobs-only browser checks
make jobs-e2e

# or everything
make e2e
```

## Notes

- You can run `make e2e` or `make jobs-e2e` directly; Compose will start what it needs for the runner.
- The jobs Playwright project is intentionally separate so browser checks for the jobs platform do not share `baseURL` assumptions with the portfolio site.

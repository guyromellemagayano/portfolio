# Dockerized E2E and Content Smoke

This guide covers the Playwright runners in `docker/compose/local.yml`:

- `e2e` (full Playwright suite)
- `e2e-content-smoke` (content pipeline smoke subset)

These services run as Compose profile services (`e2e`) and depend on healthy `api` + `web` containers.

## Commands

```bash
# Full Playwright suite (starts api + web + e2e runner)
make e2e

# Content pipeline smoke only
make e2e-content

# List @content tests without running them
make e2e-list-content
```

## How It Works

- The Playwright containers use `E2E_USE_EXTERNAL_SERVERS=1`.
- `apps/e2e/playwright.config.ts` targets the already-running Compose `api` + `web` services.
- Compose healthchecks gate the e2e runners so tests do not start until `api` and `web` are ready.

## Recommended Workflow

```bash
# 1) Start app stack in background
make up

# 2) Run only the content smoke suite
make e2e-content

# 3) Inspect app logs if something fails
make logs
```

You can also run `make up-edge` first if you want to inspect the app through Traefik hostnames while the e2e runners execute.

You can run `make e2e` / `make e2e-content` directly without starting the app stack first; Compose will start required services.

## Content Smoke Env Vars

- `CONTENT_REVALIDATE_SECRET` (required for content revalidation endpoint assertions)
- `E2E_CONTENT_ARTICLE_SLUG` (optional): pin the article smoke test to a known article slug
- `E2E_CONTENT_PAGE_SLUG` (optional): pin the page smoke test to a known page slug (must not collide with static routes)

Examples:

```bash
make e2e-content \
  CONTENT_REVALIDATE_SECRET=your-secret
```

```bash
make e2e-content \
  CONTENT_REVALIDATE_SECRET=your-secret \
  E2E_CONTENT_ARTICLE_SLUG=my-article \
  E2E_CONTENT_PAGE_SLUG=now
```

## Notes

- `E2E_BASE_URL` is set internally in the Compose e2e services (`http://web:3000`); you usually do not need to set it manually for Docker e2e runs.
- Local webhook callbacks are only needed if you test external systems calling `/api/revalidate/content`.

## Related Docs

- Local app stack + tooling commands: `docker/docs/local-dev.md`
- Content integration details: `docs/integrations/content/README.md`
- Production/self-hosting plan: `docker/docs/production-plan.md`

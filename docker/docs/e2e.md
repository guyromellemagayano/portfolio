# Dockerized E2E and Sanity Smoke

This guide covers the Playwright runners in `docker/compose/local.yml`:

- `e2e` (full Playwright suite)
- `e2e-sanity-smoke` (Sanity pipeline smoke subset)

These services run as Compose profile services (`e2e`) and depend on healthy `api` + `web` containers.

## Commands

```bash
# Full Playwright suite (starts api + web + e2e runner)
make e2e

# Sanity pipeline smoke only
make e2e-sanity

# List @sanity tests without running them
make e2e-list-sanity
```

## How It Works

- The Playwright containers use `E2E_USE_EXTERNAL_SERVERS=1`.
- `apps/e2e/playwright.config.ts` targets the already-running Compose `api` + `web` services.
- Compose healthchecks gate the e2e runners so tests do not start until `api` and `web` are ready.

## Recommended Workflow

```bash
# 1) Start app stack in background
make up-detached

# 2) Run only the Sanity smoke suite
make e2e-sanity

# 3) Inspect app logs if something fails
make logs
```

You can also run `make up-edge-detached` first if you want to inspect the app through Traefik hostnames while the e2e runners execute.

You can run `make e2e` / `make e2e-sanity` directly without starting the app stack first; Compose will start required services.

## Sanity Smoke Env Vars

- `SANITY_WEBHOOK_SECRET` (required for webhook assertion portions of the Sanity smoke flow)
- `E2E_SANITY_ARTICLE_SLUG` (optional): pin the article smoke test to a known article slug
- `E2E_SANITY_PAGE_SLUG` (optional): pin the page smoke test to a known page slug (must not collide with static routes)

Examples:

```bash
make e2e-sanity \
  SANITY_WEBHOOK_SECRET=your-secret
```

```bash
make e2e-sanity \
  SANITY_WEBHOOK_SECRET=your-secret \
  E2E_SANITY_ARTICLE_SLUG=my-article \
  E2E_SANITY_PAGE_SLUG=now
```

## Notes

- `E2E_BASE_URL` is set internally in the Compose e2e services (`http://web:3000`); you usually do not need to set it manually for Docker e2e runs.
- Local webhook callbacks from Sanity still require a public HTTPS tunnel if you are testing real Sanity webhooks against your local stack.

## Related Docs

- Local app stack + tooling commands: `docker/docs/local-dev.md`
- Sanity integration details: `docs/integrations/sanity/README.md`
- Production/self-hosting plan: `docker/docs/production-plan.md`

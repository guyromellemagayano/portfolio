SHELL := /bin/sh

.DEFAULT_GOAL := help

ENV_FILE ?= .env
PNPM ?= pnpm
PROD_SMOKE_WEB_URL ?= https://www.guyromellemagayano.com
PROD_SMOKE_API_URL ?= https://api.guyromellemagayano.com
PROD_SMOKE_ARTICLE_PATH ?=
PROD_SMOKE_PAGE_PATH ?=
VERCEL_ENV_TARGET ?= development
VERCEL_GIT_BRANCH ?=
VERCEL_PULL_ENV_FILE ?= .env
VERCEL_ARGS ?= whoami

.PHONY: \
	help \
	build \
	build-packages \
	check-types \
	clean \
	content-check \
	content-test \
	docs-catalog-update \
	docs-catalog-check \
	dev \
	prod-smoke \
	format \
	format-check \
	env-local-normalize \
	lint \
	lint-ci \
	lint-fix \
	lint-styles \
	lint-styles-fix \
	pcu \
	pcu-check \
	pcu-security \
	pcu-security-fix \
	pcu-update \
	test \
	test-apps \
	test-coverage \
	test-coverage-apps \
	test-coverage-packages \
	test-coverage-ui \
	test-e2e \
	test-e2e-headed \
	test-e2e-install \
	test-e2e-install-ci \
	test-e2e-report \
	test-e2e-smoke \
	test-e2e-ui \
	test-packages \
	test-run \
	test-run-coverage \
	test-ui \
	test-watch \
	vercel-host-check \
	vercel \
	vercel-env-pull-web \
	vercel-env-pull-api \
	vercel-env-pull \
	vercel-env-sync-local

help: ## Show available host-side maintenance commands.
	@awk 'BEGIN {FS = ":.*##";} /^[a-zA-Z0-9_.-]+:.*##/ {printf "%-24s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Run the root `build` script.
	@$(PNPM) run build

build-packages: ## Run the root `build:packages` script.
	@$(PNPM) run build:packages

check-types: ## Run the root `check-types` script.
	@$(PNPM) run check-types

clean: ## Run the root `clean` script.
	@$(PNPM) run clean

content-check: ## Run the root `content:check` script.
	@$(PNPM) run content:check

content-test: ## Run the root `content:test` script.
	@$(PNPM) run content:test

dev: ## Run the root `dev` script.
	@$(PNPM) run dev

docs-catalog-update: ## Regenerate `docs/catalog/README.md`.
	@sh docs/scripts/update-readme-catalog.sh "$(CURDIR)"

docs-catalog-check: ## Validate `docs/catalog/README.md` matches the repo README list.
	@sh docs/scripts/check-readme-catalog.sh "$(CURDIR)"

prod-smoke: ## Smoke-check deployed `web`, `api`, and `sitemap.xml` endpoints.
	@sh docs/scripts/prod-vercel-smoke.sh "$(PROD_SMOKE_WEB_URL)" "$(PROD_SMOKE_API_URL)" "$(PROD_SMOKE_ARTICLE_PATH)" "$(PROD_SMOKE_PAGE_PATH)"

env-local-normalize: ## Normalize root `.env` and remove app-level `.env` files.
	@sh scripts/normalize-local-env.sh "$(ENV_FILE)"

format: ## Run the root `format` script.
	@$(PNPM) run format

format-check: ## Run the root `format:check` script.
	@$(PNPM) run format:check

lint: ## Run the root `lint` script.
	@$(PNPM) run lint

lint-ci: ## Run the root `lint:ci` script.
	@$(PNPM) run lint:ci

lint-fix: ## Run the root `lint:fix` script.
	@$(PNPM) run lint:fix

lint-styles: ## Run the root `lint:styles` script.
	@$(PNPM) run lint:styles

lint-styles-fix: ## Run the root `lint:styles:fix` script.
	@$(PNPM) run lint:styles:fix

pcu: ## Run the root `pcu` script.
	@$(PNPM) run pcu

pcu-check: ## Run the root `pcu:check` script.
	@$(PNPM) run pcu:check

pcu-security: ## Run the root `pcu:security` script.
	@$(PNPM) run pcu:security

pcu-security-fix: ## Run the root `pcu:security:fix` script.
	@$(PNPM) run pcu:security:fix

pcu-update: ## Run the root `pcu:update` script.
	@$(PNPM) run pcu:update

test: ## Run the root `test` script.
	@$(PNPM) run test

test-apps: ## Run the root `test:apps` script.
	@$(PNPM) run test:apps

test-coverage: ## Run the root `test:coverage` script.
	@$(PNPM) run test:coverage

test-coverage-apps: ## Run the root `test:coverage:apps` script.
	@$(PNPM) run test:coverage:apps

test-coverage-packages: ## Run the root `test:coverage:packages` script.
	@$(PNPM) run test:coverage:packages

test-coverage-ui: ## Run the root `test:coverage:ui` script.
	@$(PNPM) run test:coverage:ui

test-e2e: ## Run the root `test:e2e` script.
	@$(PNPM) run test:e2e

test-e2e-headed: ## Run the root `test:e2e:headed` script.
	@$(PNPM) run test:e2e:headed

test-e2e-install: ## Run the root `test:e2e:install` script.
	@$(PNPM) run test:e2e:install

test-e2e-install-ci: ## Run the root `test:e2e:install:ci` script.
	@$(PNPM) run test:e2e:install:ci

test-e2e-report: ## Run the root `test:e2e:report` script.
	@$(PNPM) run test:e2e:report

test-e2e-smoke: ## Run the root `test:e2e:smoke` script.
	@$(PNPM) run test:e2e:smoke

test-e2e-ui: ## Run the root `test:e2e:ui` script.
	@$(PNPM) run test:e2e:ui

test-packages: ## Run the root `test:packages` script.
	@$(PNPM) run test:packages

test-run: ## Run the root `test:run` script.
	@$(PNPM) run test:run

test-run-coverage: ## Run the root `test:run:coverage` script.
	@$(PNPM) run test:run:coverage

test-ui: ## Run the root `test:ui` script.
	@$(PNPM) run test:ui

test-watch: ## Run the root `test:watch` script.
	@$(PNPM) run test:watch

vercel-host-check: ## Check host Vercel CLI install and fallback readiness (`vercel` or `pnpm`).
	@if command -v vercel >/dev/null 2>&1; then \
		vercel_path="$$(command -v vercel)"; \
		if vercel --version >/dev/null 2>&1; then \
			printf 'vercel-host-check: found `vercel` at %s\n' "$$vercel_path"; \
		else \
			printf 'vercel-host-check: `vercel` exists at %s but failed to execute.\n' "$$vercel_path" >&2; \
			printf 'Reinstall with `npm i -g vercel`.\n' >&2; \
			exit 127; \
		fi; \
	elif command -v pnpm >/dev/null 2>&1; then \
		printf 'vercel-host-check: global `vercel` was not found on host.\n'; \
		printf 'vercel-host-check: fallback available via `pnpm dlx vercel@37.12.0`.\n'; \
	else \
		printf 'vercel-host-check: neither `vercel` nor `pnpm` is installed on host.\n' >&2; \
		printf 'Install one of them before running Vercel make targets.\n' >&2; \
		exit 127; \
	fi

vercel: ## Run Vercel CLI on host (`VERCEL_ARGS`).
	@$(MAKE) vercel-host-check
	@if command -v vercel >/dev/null 2>&1; then \
		vercel $(VERCEL_ARGS); \
	else \
		pnpm dlx vercel@37.12.0 $(VERCEL_ARGS); \
	fi

vercel-env-pull-web: ## Pull Vercel env vars for `apps/web` into `apps/web/$(VERCEL_PULL_ENV_FILE)`.
	@sh scripts/vercel-env-pull.sh "apps/web" "$(VERCEL_PULL_ENV_FILE)" "$(VERCEL_ENV_TARGET)" "$(VERCEL_GIT_BRANCH)"

vercel-env-pull-api: ## Pull Vercel env vars for `apps/api` into `apps/api/$(VERCEL_PULL_ENV_FILE)`.
	@sh scripts/vercel-env-pull.sh "apps/api" "$(VERCEL_PULL_ENV_FILE)" "$(VERCEL_ENV_TARGET)" "$(VERCEL_GIT_BRANCH)"

vercel-env-pull: ## Pull Vercel env vars for all linked app projects (`web`, `api`).
	@$(MAKE) vercel-env-pull-web
	@$(MAKE) vercel-env-pull-api

vercel-env-sync-local: ## Pull app env vars from Vercel and regenerate root `.env` from app-level files.
	@$(MAKE) vercel-env-pull
	@PREFER_APP_ENV_FILES=1 KEEP_APP_ENV_FILES=1 $(MAKE) env-local-normalize

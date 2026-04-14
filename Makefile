SHELL := /bin/sh

.DEFAULT_GOAL := help

ENV_FILE ?= .env.local
COMPOSE_FILE ?= docker/compose/local.yml
FORCE_PNPM_INSTALL ?= 0
LOG_TAIL ?= 100
TOOLING_CMD ?= pnpm check-types
TURBO_DOCKER_CONCURRENCY ?= 2

COMPOSE := docker compose
COMPOSE_BASE := FORCE_PNPM_INSTALL=$(FORCE_PNPM_INSTALL) $(COMPOSE) --env-file $(ENV_FILE) -f $(COMPOSE_FILE)
COMPOSE_NO_FORCE := $(COMPOSE) --env-file $(ENV_FILE) -f $(COMPOSE_FILE)

JOBS_SERVICES := jobs-db jobs-api jobs jobs-worker
APP_LOG_SERVICES := api web opsdesk jobs jobs-api jobs-worker

.PHONY: \
	help \
	info \
	doctor \
	validate \
	ps \
	up \
	down \
	restart \
	logs \
	jobs-up \
	jobs-down \
	jobs-ps \
	jobs-logs \
	check-types \
	lint \
	test \
	tooling \
	tooling-shell \
	e2e \
	e2e-list \
	jobs-e2e \
	jobs-e2e-list

help: ## Show the lean local development command set.
	@printf '\nLocal Dev Commands\n\n'
	@printf '%-18s %s\n' "make up" "Start the full local stack in Docker."
	@printf '%-18s %s\n' "make down" "Stop and remove the full local stack."
	@printf '%-18s %s\n' "make logs" "Follow app logs for the full stack."
	@printf '%-18s %s\n' "make jobs-up" "Start the jobs stack only."
	@printf '%-18s %s\n' "make jobs-down" "Stop and remove the jobs stack only."
	@printf '%-18s %s\n' "make jobs-logs" "Follow logs for the jobs stack."
	@printf '%-18s %s\n' "make jobs-e2e" "Run the jobs Playwright project in Docker."
	@printf '%-18s %s\n' "make e2e" "Run the full Playwright suite in Docker."
	@printf '%-18s %s\n' "make check-types" "Run monorepo typechecking in Docker."
	@printf '%-18s %s\n' "make lint" "Run monorepo linting in Docker."
	@printf '%-18s %s\n' "make test" "Run monorepo unit/integration tests in Docker."
	@printf '\nURLs\n\n'
	@printf '%-18s %s\n' "Jobs App" "http://localhost:3002"
	@printf '%-18s %s\n' "Jobs API" "http://localhost:5002/v1/status"
	@printf '%-18s %s\n' "Portfolio Web" "http://localhost:3000"
	@printf '%-18s %s\n' "Portfolio API" "http://localhost:5001/v1/status"
	@printf '\n'

info: ## Print the effective compose settings used by this Makefile.
	@printf 'ENV_FILE=%s\n' "$(ENV_FILE)"
	@printf 'COMPOSE_FILE=%s\n' "$(COMPOSE_FILE)"
	@printf 'FORCE_PNPM_INSTALL=%s\n' "$(FORCE_PNPM_INSTALL)"
	@printf 'LOG_TAIL=%s\n' "$(LOG_TAIL)"
	@printf 'TOOLING_CMD=%s\n' "$(TOOLING_CMD)"
	@printf 'TURBO_DOCKER_CONCURRENCY=%s\n' "$(TURBO_DOCKER_CONCURRENCY)"

doctor: ## Show Docker/Compose versions and validate the compose file.
	@$(COMPOSE) version
	@$(MAKE) validate

validate: ## Validate docker compose config without printing secrets.
	@$(COMPOSE_BASE) config >/dev/null
	@printf 'docker compose config validation: OK\n'

ps: ## Show status of the local docker compose services.
	@$(COMPOSE_NO_FORCE) ps

up: ## Start the full local stack in background.
	@$(COMPOSE_BASE) up --build -d

down: ## Stop the local docker stack and remove orphans.
	@$(COMPOSE_NO_FORCE) down --remove-orphans

restart: ## Restart the full local stack.
	@$(MAKE) down
	@$(MAKE) up

logs: ## Follow logs for the primary app services.
	@$(COMPOSE_NO_FORCE) logs --tail=$(LOG_TAIL) -f $(APP_LOG_SERVICES)

jobs-up: ## Start the jobs stack in background.
	@$(COMPOSE_BASE) up --build -d $(JOBS_SERVICES)

jobs-down: ## Stop and remove the jobs stack containers.
	@$(COMPOSE_NO_FORCE) stop $(JOBS_SERVICES) >/dev/null 2>&1 || true
	@$(COMPOSE_NO_FORCE) rm -f $(JOBS_SERVICES) >/dev/null 2>&1 || true

jobs-ps: ## Show status of the jobs stack services.
	@$(COMPOSE_NO_FORCE) ps $(JOBS_SERVICES)

jobs-logs: ## Follow logs for the jobs stack.
	@$(COMPOSE_NO_FORCE) logs --tail=$(LOG_TAIL) -f $(JOBS_SERVICES)

check-types: ## Run monorepo typechecking in the tooling container.
	@$(COMPOSE_BASE) --profile tooling run --rm tooling pnpm exec turbo run check-types --concurrency=$(TURBO_DOCKER_CONCURRENCY)

lint: ## Run monorepo linting in the tooling container.
	@$(COMPOSE_BASE) --profile tooling run --rm tooling pnpm exec turbo run lint lint:styles --concurrency=$(TURBO_DOCKER_CONCURRENCY)

test: ## Run monorepo unit/integration tests in the tooling container.
	@$(COMPOSE_BASE) --profile tooling run --rm tooling sh -lc 'unset API_GATEWAY_URL NEXT_PUBLIC_API_URL API_GATEWAY_CONTENT_PROVIDER CONTENT_REVALIDATE_SECRET E2E_CONTENT_ARTICLE_SLUG E2E_CONTENT_PAGE_SLUG; pnpm exec turbo run test:run --concurrency=$(TURBO_DOCKER_CONCURRENCY)'

tooling: ## Run an arbitrary tooling command via `TOOLING_CMD`.
	@$(COMPOSE_BASE) --profile tooling run --rm tooling sh -lc '$(TOOLING_CMD)'

tooling-shell: ## Open a shell in the tooling container.
	@$(COMPOSE_BASE) --profile tooling run --rm tooling sh

e2e: ## Run the full Playwright suite in Docker.
	@$(COMPOSE_BASE) --profile e2e up --build --abort-on-container-exit --exit-code-from e2e e2e

e2e-list: ## List all Playwright tests without executing them.
	@$(COMPOSE_BASE) --profile e2e run --rm e2e pnpm --filter e2e exec playwright test --list

jobs-e2e: ## Run the jobs Playwright project in Docker.
	@$(COMPOSE_BASE) --profile e2e run --rm e2e pnpm --filter e2e exec playwright test --project jobs-chromium

jobs-e2e-list: ## List the jobs Playwright project tests without executing them.
	@$(COMPOSE_BASE) --profile e2e run --rm e2e pnpm --filter e2e exec playwright test --project jobs-chromium --list

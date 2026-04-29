SHELL := /bin/sh

PNPM ?= pnpm
DOCKER_COMPOSE ?= docker compose
COMPOSE_SERVICE ?= web
ENV_FILE ?= .env
ENV_EXAMPLE_FILE ?= .env.example

define load_env
set -a; \
if [ -f "$(ENV_FILE)" ]; then \
	. "$(ENV_FILE)"; \
elif [ -f "$(ENV_EXAMPLE_FILE)" ]; then \
	. "$(ENV_EXAMPLE_FILE)"; \
fi; \
set +a;
endef

define local_web_url
local_web_url="$${E2E_BASE_URL:-$${SITE_URL_DEVELOPMENT:-}}"; \
if [ -z "$$local_web_url" ]; then \
	printf "E2E_BASE_URL or SITE_URL_DEVELOPMENT must be set in %s or %s\n" "$(ENV_FILE)" "$(ENV_EXAMPLE_FILE)" >&2; \
	exit 1; \
fi;
endef

.DEFAULT_GOAL := help

.PHONY: help
help: ## Show available Make targets.
	@awk 'BEGIN {FS = ":.*## "; printf "\nPortfolio commands:\n"} /^[a-zA-Z0-9_.-]+:.*## / {printf "  %-18s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: install
install: ## Install workspace dependencies with the lockfile.
	$(PNPM) install --frozen-lockfile

.PHONY: dev
dev: ## Start the Docker-backed web dev server in the foreground.
	$(DOCKER_COMPOSE) up --build $(COMPOSE_SERVICE)

.PHONY: dev-detached
dev-detached: ## Start the Docker-backed web dev server in the background.
	$(DOCKER_COMPOSE) up --build --detach $(COMPOSE_SERVICE)

.PHONY: dev-host
dev-host: ## Start the web dev server directly on the host machine.
	@$(load_env) $(PNPM) dev:host

.PHONY: logs
logs: ## Follow Docker web service logs.
	$(DOCKER_COMPOSE) logs --follow $(COMPOSE_SERVICE)

.PHONY: ps
ps: ## Show Docker Compose service status.
	$(DOCKER_COMPOSE) ps

.PHONY: shell
shell: ## Open a shell inside the running web container.
	$(DOCKER_COMPOSE) exec $(COMPOSE_SERVICE) sh

.PHONY: down
down: ## Stop Docker services and remove orphan containers.
	$(DOCKER_COMPOSE) down --remove-orphans

.PHONY: restart
restart: down dev-detached ## Restart the Docker-backed web dev server.

.PHONY: build-image
build-image: ## Build the local Docker web image.
	$(DOCKER_COMPOSE) build $(COMPOSE_SERVICE)

.PHONY: doctor
doctor: ## Validate Compose config and print local service status.
	$(DOCKER_COMPOSE) config >/dev/null
	$(DOCKER_COMPOSE) ps
	@$(load_env) $(local_web_url) printf "Local URL: %s\n" "$$local_web_url"

.PHONY: smoke
smoke: ## Check that the local web URL returns an HTTP success response.
	@$(load_env) $(local_web_url) curl -fsS "$$local_web_url" >/dev/null

.PHONY: lint
lint: ## Run web lint and stylelint checks.
	$(PNPM) lint:web

.PHONY: check-types
check-types: ## Run web TypeScript checks.
	$(PNPM) check-types:web

.PHONY: test
test: ## Run web tests.
	$(PNPM) test:web

.PHONY: build
build: ## Build the web app.
	$(PNPM) build:web

.PHONY: verify
verify: lint check-types test build ## Run the standard web handoff suite.

.PHONY: e2e-smoke
e2e-smoke: ## Run the retained Playwright smoke setup.
	$(PNPM) test:e2e:smoke

.PHONY: deploy
deploy: ## Build and deploy a Vercel preview deployment for apps/web.
	$(PNPM) deploy:web

.PHONY: deploy-prod
deploy-prod: ## Build and deploy apps/web to Vercel production.
	$(PNPM) deploy:web:prod

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

##@ Daily development

.PHONY: help
help: ## Show available Make targets.
	@awk 'BEGIN {FS = ":.*## "; printf "\nPortfolio commands:\n"} /^##@ / {printf "\n%s\n", substr($$0, 5); next} /^[a-zA-Z0-9_.-]+:.*## / {printf "  %-24s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: daily
daily: format-check lint check-types test ## Run the common daily local check suite.

.PHONY: quick
quick: lint check-types test ## Run the fast pre-commit confidence suite.

.PHONY: dev
dev: ## Start the Docker-backed web dev server in the foreground.
	$(DOCKER_COMPOSE) up --build $(COMPOSE_SERVICE)

.PHONY: dev-detached
dev-detached: ## Start the Docker-backed web dev server in the background.
	$(DOCKER_COMPOSE) up --build --detach $(COMPOSE_SERVICE)

.PHONY: dev-host
dev-host: ## Start the web dev server directly on the host machine.
	@$(load_env) $(PNPM) dev:host

.PHONY: lint-fix
lint-fix: ## Autofix lint and stylelint issues where possible.
	$(PNPM) lint:fix

.PHONY: format
format: ## Format source files through workspace package scripts.
	$(PNPM) format

.PHONY: format-check
format-check: ## Check formatting without writing files.
	$(PNPM) format:check

.PHONY: test-watch
test-watch: ## Run Vitest through Turbo watch mode.
	$(PNPM) test:watch

##@ Setup and health

.PHONY: install
install: ## Install workspace dependencies with the lockfile.
	$(PNPM) install --frozen-lockfile

.PHONY: doctor
doctor: ## Validate Compose config and print local service status.
	$(DOCKER_COMPOSE) config >/dev/null
	$(DOCKER_COMPOSE) ps
	@$(load_env) $(local_web_url) printf "Local URL: %s\n" "$$local_web_url"

.PHONY: smoke
smoke: ## Check that the local web URL returns an HTTP success response.
	@$(load_env) $(local_web_url) curl -fsS "$$local_web_url" >/dev/null

##@ Docker runtime

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

##@ Web verification

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

##@ Package verification

.PHONY: packages-lint
packages-lint: ## Run lint and stylelint checks for workspace packages.
	$(PNPM) lint:packages

.PHONY: packages-check-types
packages-check-types: ## Run TypeScript checks for workspace packages.
	$(PNPM) check-types:packages

.PHONY: packages-test
packages-test: ## Run tests for workspace packages.
	$(PNPM) test:packages

.PHONY: packages-build
packages-build: ## Build workspace packages.
	$(PNPM) build:packages

.PHONY: packages-verify
packages-verify: packages-lint packages-check-types packages-test packages-build ## Run the package handoff suite.

.PHONY: components-verify
components-verify: ## Run checks for @portfolio/components.
	$(PNPM) --filter @portfolio/components lint
	$(PNPM) --filter @portfolio/components check-types
	$(PNPM) --filter @portfolio/components test:run
	$(PNPM) --filter @portfolio/components build

.PHONY: ui-verify
ui-verify: ## Run checks for @portfolio/ui.
	$(PNPM) --filter @portfolio/ui lint
	$(PNPM) --filter @portfolio/ui check-types
	$(PNPM) --filter @portfolio/ui test:run
	$(PNPM) --filter @portfolio/ui build

##@ E2E

.PHONY: e2e-install
e2e-install: ## Install the Chromium browser used by Playwright.
	$(PNPM) test:e2e:install

.PHONY: e2e-smoke
e2e-smoke: ## Run the retained Playwright smoke setup.
	$(PNPM) test:e2e:smoke

.PHONY: e2e
e2e: ## Run the retained Playwright suite.
	$(PNPM) test:e2e

.PHONY: e2e-headed
e2e-headed: ## Run Playwright in headed mode.
	$(PNPM) test:e2e:headed

.PHONY: e2e-ui
e2e-ui: ## Open the Playwright UI runner.
	$(PNPM) test:e2e:ui

.PHONY: e2e-report
e2e-report: ## Open the latest Playwright HTML report.
	$(PNPM) test:e2e:report

##@ Deployment

.PHONY: deploy
deploy: ## Build and deploy a Vercel preview deployment for apps/web.
	$(PNPM) deploy:web

.PHONY: deploy-prod
deploy-prod: ## Build and deploy apps/web to Vercel production.
	$(PNPM) deploy:web:prod

##@ Maintenance

.PHONY: deps-check
deps-check: ## Check catalog dependency updates.
	$(PNPM) pcu:check

.PHONY: deps-security
deps-security: ## Check catalog dependency security updates.
	$(PNPM) pcu:security

.PHONY: deps-update
deps-update: ## Update catalog-managed dependencies.
	$(PNPM) pcu:update

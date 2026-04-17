SHELL := /bin/sh

.DEFAULT_GOAL := help

ENV_FILE ?= .env.local
COMPOSE_FILE ?= docker/compose/local.yml
PROD_COMPOSE_FILE ?= docker/compose/prod.yml
EDGE_COMPOSE_FILE ?= docker/compose/edge.local.yml
EDGE_DEBUG_COMPOSE_FILE ?= docker/compose/edge.docker-provider.debug.local.yml
EDGE_TLS_COMPOSE_FILE ?= docker/compose/edge.tls.local.yml
EDGE_ORBSTACK_COMPOSE_FILE ?= docker/compose/edge.orbstack.local.yml
FORCE_PNPM_INSTALL ?= 0
TOOLING_CMD ?= pnpm check-types
TURBO_DOCKER_CONCURRENCY ?= 2
LOG_TAIL ?= 100
TRAEFIK_DOCKER_SOCKET_PATH ?= $(if $(wildcard $(HOME)/.docker/run/docker.sock),$(HOME)/.docker/run/docker.sock,/var/run/docker.sock)
TRAEFIK_DOCKER_API_VERSION ?= 1.53
TRAEFIK_ENABLE_DOCKER_PROVIDER ?= 0
TRAEFIK_ENABLE_DOCKER_PROVIDER_BOOL = $(if $(filter 1 true TRUE yes YES on ON,$(TRAEFIK_ENABLE_DOCKER_PROVIDER)),true,false)
TRAEFIK_LOG_LEVEL ?= ERROR
LOCAL_DEV_DOMAIN ?= guyromellemagayano.local
EDGE_PUBLIC_SCHEME := $(if $(filter %.local,$(LOCAL_DEV_DOMAIN)),https,http)
TRAEFIK_HTTP_PORT ?= 80
TRAEFIK_HTTPS_PORT ?= 443
PROD_WEB_PORT ?= 3000
PROD_API_PORT ?= 5001
PROD_SMOKE_WEB_URL ?= https://www.guyromellemagayano.com
PROD_SMOKE_API_URL ?= https://api.guyromellemagayano.com
PROD_SMOKE_ARTICLE_PATH ?=
PROD_SMOKE_PAGE_PATH ?=
SKIP_DNS_SETUP ?= 0
VERCEL_ENV_TARGET ?= development
VERCEL_GIT_BRANCH ?=
VERCEL_PULL_ENV_FILE ?= .env.local
VERCEL_ARGS ?= whoami

COMPOSE := docker compose
COMPOSE_BASE := FORCE_PNPM_INSTALL=$(FORCE_PNPM_INSTALL) $(COMPOSE) --env-file $(ENV_FILE) -f $(COMPOSE_FILE)
COMPOSE_NO_FORCE := $(COMPOSE) --env-file $(ENV_FILE) -f $(COMPOSE_FILE)
COMPOSE_ALL_PROFILES := $(COMPOSE_NO_FORCE) --profile tooling --profile e2e
COMPOSE_PROD_NO_FORCE := PROD_WEB_PORT=$(PROD_WEB_PORT) PROD_API_PORT=$(PROD_API_PORT) $(COMPOSE) --env-file $(ENV_FILE) -f $(PROD_COMPOSE_FILE)
EDGE_ORBSTACK_OVERLAY := $(if $(filter %.local,$(LOCAL_DEV_DOMAIN)),-f $(EDGE_ORBSTACK_COMPOSE_FILE),)
COMPOSE_EDGE_BASE := LOCAL_DEV_DOMAIN=$(LOCAL_DEV_DOMAIN) EDGE_PUBLIC_SCHEME=$(EDGE_PUBLIC_SCHEME) TRAEFIK_HTTP_PORT=$(TRAEFIK_HTTP_PORT) TRAEFIK_DOCKER_SOCKET_PATH=$(TRAEFIK_DOCKER_SOCKET_PATH) TRAEFIK_DOCKER_API_VERSION=$(TRAEFIK_DOCKER_API_VERSION) TRAEFIK_ENABLE_DOCKER_PROVIDER=$(TRAEFIK_ENABLE_DOCKER_PROVIDER_BOOL) TRAEFIK_LOG_LEVEL=$(TRAEFIK_LOG_LEVEL) FORCE_PNPM_INSTALL=$(FORCE_PNPM_INSTALL) $(COMPOSE) --env-file $(ENV_FILE) -f $(COMPOSE_FILE) -f $(EDGE_COMPOSE_FILE) $(EDGE_ORBSTACK_OVERLAY)
COMPOSE_EDGE_NO_FORCE := LOCAL_DEV_DOMAIN=$(LOCAL_DEV_DOMAIN) EDGE_PUBLIC_SCHEME=$(EDGE_PUBLIC_SCHEME) TRAEFIK_HTTP_PORT=$(TRAEFIK_HTTP_PORT) TRAEFIK_DOCKER_SOCKET_PATH=$(TRAEFIK_DOCKER_SOCKET_PATH) TRAEFIK_DOCKER_API_VERSION=$(TRAEFIK_DOCKER_API_VERSION) TRAEFIK_ENABLE_DOCKER_PROVIDER=$(TRAEFIK_ENABLE_DOCKER_PROVIDER_BOOL) TRAEFIK_LOG_LEVEL=$(TRAEFIK_LOG_LEVEL) $(COMPOSE) --env-file $(ENV_FILE) -f $(COMPOSE_FILE) -f $(EDGE_COMPOSE_FILE) $(EDGE_ORBSTACK_OVERLAY)
COMPOSE_EDGE_ALL_PROFILES := $(COMPOSE_EDGE_NO_FORCE) --profile tooling --profile e2e
COMPOSE_EDGE_DEBUG_BASE := LOCAL_DEV_DOMAIN=$(LOCAL_DEV_DOMAIN) EDGE_PUBLIC_SCHEME=$(EDGE_PUBLIC_SCHEME) TRAEFIK_HTTP_PORT=$(TRAEFIK_HTTP_PORT) TRAEFIK_DOCKER_SOCKET_PATH=$(TRAEFIK_DOCKER_SOCKET_PATH) TRAEFIK_DOCKER_API_VERSION=$(TRAEFIK_DOCKER_API_VERSION) TRAEFIK_LOG_LEVEL=$(TRAEFIK_LOG_LEVEL) FORCE_PNPM_INSTALL=$(FORCE_PNPM_INSTALL) $(COMPOSE) --env-file $(ENV_FILE) -f $(COMPOSE_FILE) -f $(EDGE_COMPOSE_FILE) $(EDGE_ORBSTACK_OVERLAY) -f $(EDGE_DEBUG_COMPOSE_FILE)
COMPOSE_EDGE_DEBUG_NO_FORCE := LOCAL_DEV_DOMAIN=$(LOCAL_DEV_DOMAIN) EDGE_PUBLIC_SCHEME=$(EDGE_PUBLIC_SCHEME) TRAEFIK_HTTP_PORT=$(TRAEFIK_HTTP_PORT) TRAEFIK_DOCKER_SOCKET_PATH=$(TRAEFIK_DOCKER_SOCKET_PATH) TRAEFIK_DOCKER_API_VERSION=$(TRAEFIK_DOCKER_API_VERSION) TRAEFIK_LOG_LEVEL=$(TRAEFIK_LOG_LEVEL) $(COMPOSE) --env-file $(ENV_FILE) -f $(COMPOSE_FILE) -f $(EDGE_COMPOSE_FILE) $(EDGE_ORBSTACK_OVERLAY) -f $(EDGE_DEBUG_COMPOSE_FILE)
COMPOSE_EDGE_DEBUG_ALL_PROFILES := $(COMPOSE_EDGE_DEBUG_NO_FORCE) --profile tooling --profile e2e
COMPOSE_EDGE_TLS_BASE := LOCAL_DEV_DOMAIN=$(LOCAL_DEV_DOMAIN) EDGE_PUBLIC_SCHEME=$(EDGE_PUBLIC_SCHEME) TRAEFIK_HTTP_PORT=$(TRAEFIK_HTTP_PORT) TRAEFIK_HTTPS_PORT=$(TRAEFIK_HTTPS_PORT) TRAEFIK_DOCKER_SOCKET_PATH=$(TRAEFIK_DOCKER_SOCKET_PATH) TRAEFIK_DOCKER_API_VERSION=$(TRAEFIK_DOCKER_API_VERSION) TRAEFIK_ENABLE_DOCKER_PROVIDER=$(TRAEFIK_ENABLE_DOCKER_PROVIDER_BOOL) TRAEFIK_LOG_LEVEL=$(TRAEFIK_LOG_LEVEL) FORCE_PNPM_INSTALL=$(FORCE_PNPM_INSTALL) $(COMPOSE) --env-file $(ENV_FILE) -f $(COMPOSE_FILE) -f $(EDGE_COMPOSE_FILE) $(EDGE_ORBSTACK_OVERLAY) -f $(EDGE_TLS_COMPOSE_FILE)
COMPOSE_EDGE_TLS_NO_FORCE := LOCAL_DEV_DOMAIN=$(LOCAL_DEV_DOMAIN) EDGE_PUBLIC_SCHEME=$(EDGE_PUBLIC_SCHEME) TRAEFIK_HTTP_PORT=$(TRAEFIK_HTTP_PORT) TRAEFIK_HTTPS_PORT=$(TRAEFIK_HTTPS_PORT) TRAEFIK_DOCKER_SOCKET_PATH=$(TRAEFIK_DOCKER_SOCKET_PATH) TRAEFIK_DOCKER_API_VERSION=$(TRAEFIK_DOCKER_API_VERSION) TRAEFIK_ENABLE_DOCKER_PROVIDER=$(TRAEFIK_ENABLE_DOCKER_PROVIDER_BOOL) TRAEFIK_LOG_LEVEL=$(TRAEFIK_LOG_LEVEL) $(COMPOSE) --env-file $(ENV_FILE) -f $(COMPOSE_FILE) -f $(EDGE_COMPOSE_FILE) $(EDGE_ORBSTACK_OVERLAY) -f $(EDGE_TLS_COMPOSE_FILE)
COMPOSE_EDGE_TLS_ALL_PROFILES := $(COMPOSE_EDGE_TLS_NO_FORCE) --profile tooling --profile e2e
COMPOSE_EDGE_ANY_NO_FORCE := LOCAL_DEV_DOMAIN=$(LOCAL_DEV_DOMAIN) EDGE_PUBLIC_SCHEME=$(EDGE_PUBLIC_SCHEME) TRAEFIK_HTTP_PORT=$(TRAEFIK_HTTP_PORT) TRAEFIK_HTTPS_PORT=$(TRAEFIK_HTTPS_PORT) TRAEFIK_DOCKER_SOCKET_PATH=$(TRAEFIK_DOCKER_SOCKET_PATH) TRAEFIK_DOCKER_API_VERSION=$(TRAEFIK_DOCKER_API_VERSION) TRAEFIK_LOG_LEVEL=$(TRAEFIK_LOG_LEVEL) $(COMPOSE) --env-file $(ENV_FILE) -f $(COMPOSE_FILE) -f $(EDGE_COMPOSE_FILE) $(EDGE_ORBSTACK_OVERLAY) -f $(EDGE_DEBUG_COMPOSE_FILE) -f $(EDGE_TLS_COMPOSE_FILE)
COMPOSE_EDGE_ANY_ALL_PROFILES := $(COMPOSE_EDGE_ANY_NO_FORCE) --profile tooling --profile e2e

.PHONY: \
	help \
	help-all \
	info \
	doctor \
	config \
	validate \
	prod-smoke \
	validate-edge \
	validate-edge-tls \
	ps-edge \
	bootstrap \
	up-edge \
	up-edge-tls \
	down-edge \
	logs-edge \
	edge-smoke \
	edge-smoke-tls \
	edge-dns-doctor \
	dnsmasq-local \
	dnsmasq-health \
	tls-local-setup \
	use-orbstack-domain \
	env-local-normalize \
	vercel-env-pull \
	vercel-env-pull-web \
	vercel-env-pull-api \
	vercel-env-sync-local \
	render-edge-routes \
	check-types \
	lint \
	test \
	tooling \
	e2e \
	e2e-content

##@ 🧭 Help

help: ## Show a concise local Docker DX help menu (golden path + common commands).
	@printf '\n🐳 Local Docker Workflow (Quick Help)\n'
	@printf '\n🚦 Golden Path\n'
	@printf '%-42s %s\n' "make doctor" "Validate Docker + Compose."
	@printf '%-42s %s\n' "make env-local-normalize" "Normalize root .env.local before first Docker run."
	@printf '%-42s %s\n' "make bootstrap" "First run: DNS setup + edge stack in background."
	@printf '%-42s %s\n' "make edge-smoke" "Verify Traefik routes (web/api)."
	@printf '\n🎯 Daily Use\n'
	@printf '%-42s %s\n' "make up-edge" "Background dev stack with local hostnames."
	@printf '%-42s %s\n' "make up-edge-tls" "Background dev stack with local TLS overlay."
	@printf '%-42s %s\n' "make logs-edge" "Follow Traefik + app logs."
	@printf '%-42s %s\n' "make down-edge" "Stop edge stack."
	@printf '\n🌐 DNS Modes\n'
	@printf '%-42s %s\n' "make dnsmasq-local" "Manual local DNS helper for current LOCAL_DEV_DOMAIN."
	@printf '%-42s %s\n' "make dnsmasq-health" "Functional dnsmasq checks."
	@printf '%-42s %s\n' "make edge-dns-doctor" "Diagnose browser DNS_PROBE_* / DoH issues."
	@printf '%-42s %s\n' "make env-local-normalize" "Normalize root .env.local for Docker and remove app-level .env.local."
	@printf '%-42s %s\n' "make use-orbstack-domain" "Switch to OrbStack native guyromellemagayano.local mode."
	@printf '%-42s %s\n' "make tls-local-setup" "Generate mkcert certs + Traefik local TLS config."
	@printf '\n🛠  Tooling\n'
	@printf '%-42s %s\n' "make check-types" "Run workspace type checks in Docker."
	@printf '%-42s %s\n' "make lint" "Run workspace lint tasks in Docker."
	@printf '%-42s %s\n' "make test" "Run unit tests in Docker."
	@printf '%-42s %s\n' "make e2e-content" "Run content pipeline smoke tests in Docker."
	@printf '\n⚙️  Key Variables\n'
	@printf '%-26s %s (current: %s)\n' "LOCAL_DEV_DOMAIN" "Local edge domain" "$(LOCAL_DEV_DOMAIN)"
	@printf '%-26s %s (current: %s)\n' "ENV_FILE" "Compose env file" "$(ENV_FILE)"
	@printf '%-26s %s (current: %s)\n' "LOG_TAIL" "Default tail lines for logs" "$(LOG_TAIL)"
	@printf '\n📚 Miscellaneous\n'
	@printf '%-42s %s\n' "make help-all" "Full target catalog + full variable list."
	@printf '%-42s %s\n' "make info" "Print effective compose settings."
	@printf '%-42s %s\n' "make prod-smoke" "Smoke-check deployed Vercel web/api endpoints."
	@printf '%-42s %s\n' "make vercel-env-pull" "Pull app envs from linked Vercel projects."
	@printf '%-42s %s\n' "make vercel-env-sync-local" "Pull app envs and regenerate root .env.local."
	@printf '\n'

help-all: ## Show the full target catalog, variables, and examples.
	@printf '\n🐳 Local Docker Workflow (Monorepo)\n'
	@awk 'BEGIN {FS = ":.*##"; section="";} \
		/^##@/ {section = $$0; sub(/^##@ /, "", section); printf "\n%s\n", section; next} \
		/^[a-zA-Z0-9_.-]+:.*##/ {printf "%-28s %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@printf '\n⚙️  Variables\n'
	@printf '%-32s %s (current: %s)\n' "ENV_FILE" "Compose env file" "$(ENV_FILE)"
	@printf '%-32s %s (current: %s)\n' "COMPOSE_FILE" "Base compose file" "$(COMPOSE_FILE)"
	@printf '%-32s %s (current: %s)\n' "EDGE_COMPOSE_FILE" "Edge file-provider overlay" "$(EDGE_COMPOSE_FILE)"
	@printf '%-32s %s (current: %s)\n' "EDGE_TLS_COMPOSE_FILE" "Optional TLS overlay (mkcert-ready)" "$(EDGE_TLS_COMPOSE_FILE)"
	@printf '%-32s %s (current: %s)\n' "EDGE_ORBSTACK_COMPOSE_FILE" "OrbStack custom-domain overlay" "$(EDGE_ORBSTACK_COMPOSE_FILE)"
	@printf '%-32s %s (current: %s)\n' "LOCAL_DEV_DOMAIN" "Local edge base domain (guyromellemagayano.local default)" "$(LOCAL_DEV_DOMAIN)"
	@printf '%-32s %s (current: %s)\n' "EDGE_PUBLIC_SCHEME" "Public edge URL scheme derived from LOCAL_DEV_DOMAIN" "$(EDGE_PUBLIC_SCHEME)"
	@printf '%-32s %s (current: %s)\n' "TRAEFIK_HTTP_PORT" "Traefik HTTP port" "$(TRAEFIK_HTTP_PORT)"
	@printf '%-32s %s (current: %s)\n' "TRAEFIK_HTTPS_PORT" "Traefik HTTPS port (TLS overlay)" "$(TRAEFIK_HTTPS_PORT)"
	@printf '%-32s %s (current: %s)\n' "TRAEFIK_LOG_LEVEL" "Traefik log level (ERROR/INFO/DEBUG)" "$(TRAEFIK_LOG_LEVEL)"
	@printf '%-32s %s (current: %s)\n' "PROD_SMOKE_WEB_URL" "Production web URL for make prod-smoke" "$(PROD_SMOKE_WEB_URL)"
	@printf '%-32s %s (current: %s)\n' "PROD_SMOKE_API_URL" "Production API URL for make prod-smoke" "$(PROD_SMOKE_API_URL)"
	@printf '%-32s %s (current: %s)\n' "VERCEL_ENV_TARGET" "Vercel env target for make vercel-env*" "$(VERCEL_ENV_TARGET)"
	@printf '%-32s %s (current: %s)\n' "VERCEL_GIT_BRANCH" "Optional preview branch for make vercel-env*" "$(VERCEL_GIT_BRANCH)"
	@printf '%-32s %s (current: %s)\n' "VERCEL_PULL_ENV_FILE" "Output filename per app for make vercel-env*" "$(VERCEL_PULL_ENV_FILE)"
	@printf '%-32s %s (current: %s)\n' "LOG_TAIL" 'Default tail lines for `make logs*`' "$(LOG_TAIL)"
	@printf '%-32s %s (current: %s)\n' "FORCE_PNPM_INSTALL" "1 forces pnpm reinstall in containers" "$(FORCE_PNPM_INSTALL)"
	@printf '%-32s %s (current: %s)\n' "SKIP_DNS_SETUP" 'Skip dnsmasq/hosts step in `make bootstrap`' "$(SKIP_DNS_SETUP)"
	@printf '\n🚦 First Run (Recommended)\n'
	@printf '%-44s %s\n' "make doctor" "Validate Docker/Compose setup."
	@printf '%-44s %s\n' "make env-local-normalize" "Normalize root .env.local before first Docker run."
	@printf '%-44s %s\n' "make bootstrap" "Golden path: DNS setup + edge stack in background."
	@printf '%-44s %s\n' "make bootstrap SKIP_DNS_SETUP=1" "Skip DNS bootstrap if already configured."
	@printf '\n🎯 Run Modes (Recommended)\n'
	@printf '%-44s %s\n' "make up-edge" "Background services (pair with make logs-edge)."
	@printf '%-44s %s\n' "make up-edge-tls" "Background edge stack with the TLS overlay."
	@printf '\n🪟  Separate Terminal (Optional Monitoring)\n'
	@printf '%-44s %s\n' "make ps-edge" "Inspect edge stack service status."
	@printf '%-44s %s\n' "make logs-edge" "Follow Traefik + app logs."
	@printf '%-44s %s\n' "make edge-smoke" "HTTP routing smoke check (dashboard/web/api)."
	@printf '%-44s %s\n' "make edge-smoke-tls" "HTTPS routing smoke check (dashboard/web/api)."
	@printf '\n🐞 Debug / Troubleshooting\n'
	@printf '%-44s %s\n' "make dnsmasq-health" "Functional dnsmasq checks (truth source)."
	@printf '%-44s %s\n' "make edge-dns-doctor" "Browser DNS_PROBE_* diagnosis + OrbStack guidance."
	@printf '%-44s %s\n' "make use-orbstack-domain" "Switch LOCAL_DEV_DOMAIN to guyromellemagayano.local."
	@printf '%-44s %s\n' "make vercel-env-pull" "Pull app-level envs from linked Vercel projects."
	@printf '%-44s %s\n' "make vercel-env-sync-local" "Pull app envs and regenerate root .env.local."
	@printf '%-44s %s\n' "make tls-local-setup" "Generate mkcert certs + Traefik local-tls.yml."
	@printf '%-44s %s\n' "make prod-smoke" "Smoke-check deployed Vercel web/api + sitemap."
	@printf '\n🛠  Tooling\n'
	@printf '%-44s %s\n' "make check-types" "Run workspace type checks in Docker."
	@printf '%-44s %s\n' "make lint" "Run workspace lint tasks in Docker."
	@printf '%-44s %s\n' "make test" "Run unit tests in Docker."
	@printf '%-44s %s\n' "make tooling TOOLING_CMD='pnpm --filter web build'" "Run arbitrary tooling commands in Docker."
	@printf '\n💡 Examples\n'
	@printf 'make bootstrap\n'
	@printf 'make edge-smoke\n'
	@printf 'make up-edge && make logs-edge\n'
	@printf 'make dnsmasq-local && make edge-smoke\n'
	@printf 'make edge-dns-doctor\n'
	@printf 'make vercel-env-pull VERCEL_ENV_TARGET=development\n'
	@printf 'make vercel-env-sync-local VERCEL_ENV_TARGET=preview VERCEL_GIT_BRANCH=feature/content-data-migration\n'
	@printf 'make use-orbstack-domain && make up-edge\n'
	@printf 'make tls-local-setup && make up-edge-tls\n'
	@printf 'make tooling TOOLING_CMD="pnpm --filter web build"\n'
	@printf 'make prod-smoke\n'
	@printf '\n'

info: ## Print the effective Docker/Compose settings used by this Makefile.
	@printf 'ENV_FILE=%s\n' "$(ENV_FILE)"
	@printf 'COMPOSE_FILE=%s\n' "$(COMPOSE_FILE)"
	@printf 'PROD_COMPOSE_FILE=%s\n' "$(PROD_COMPOSE_FILE)"
	@printf 'EDGE_COMPOSE_FILE=%s\n' "$(EDGE_COMPOSE_FILE)"
	@printf 'EDGE_DEBUG_COMPOSE_FILE=%s\n' "$(EDGE_DEBUG_COMPOSE_FILE)"
	@printf 'EDGE_TLS_COMPOSE_FILE=%s\n' "$(EDGE_TLS_COMPOSE_FILE)"
	@printf 'EDGE_ORBSTACK_COMPOSE_FILE=%s\n' "$(EDGE_ORBSTACK_COMPOSE_FILE)"
	@printf 'FORCE_PNPM_INSTALL=%s\n' "$(FORCE_PNPM_INSTALL)"
	@printf 'TOOLING_CMD=%s\n' "$(TOOLING_CMD)"
	@printf 'TURBO_DOCKER_CONCURRENCY=%s\n' "$(TURBO_DOCKER_CONCURRENCY)"
	@printf 'LOG_TAIL=%s\n' "$(LOG_TAIL)"
	@printf 'LOCAL_DEV_DOMAIN=%s\n' "$(LOCAL_DEV_DOMAIN)"
	@printf 'EDGE_PUBLIC_SCHEME=%s\n' "$(EDGE_PUBLIC_SCHEME)"
	@printf 'TRAEFIK_HTTP_PORT=%s\n' "$(TRAEFIK_HTTP_PORT)"
	@printf 'TRAEFIK_HTTPS_PORT=%s\n' "$(TRAEFIK_HTTPS_PORT)"
	@printf 'TRAEFIK_LOG_LEVEL=%s\n' "$(TRAEFIK_LOG_LEVEL)"
	@printf 'PROD_SMOKE_WEB_URL=%s\n' "$(PROD_SMOKE_WEB_URL)"
	@printf 'PROD_SMOKE_API_URL=%s\n' "$(PROD_SMOKE_API_URL)"
	@printf 'PROD_SMOKE_ARTICLE_PATH=%s\n' "$(PROD_SMOKE_ARTICLE_PATH)"
	@printf 'PROD_SMOKE_PAGE_PATH=%s\n' "$(PROD_SMOKE_PAGE_PATH)"
doctor: ## Show Docker/Compose versions and validate the compose file.
	@$(COMPOSE) version
	@$(COMPOSE_BASE) config >/dev/null
	@printf 'docker compose config validation: OK\n'

##@ 🐳 Compose

config: ## Print resolved docker compose config (be careful: includes env interpolation).
	@$(COMPOSE_BASE) config

validate: ## Validate docker compose config without printing secrets.
	@$(COMPOSE_BASE) config >/dev/null
	@printf 'docker compose config validation: OK\n'

validate-edge: ## Validate base + Traefik edge overlay compose config without printing secrets.
	@if [ "$(TRAEFIK_ENABLE_DOCKER_PROVIDER_BOOL)" = "true" ]; then \
		printf 'validate-edge: TRAEFIK_ENABLE_DOCKER_PROVIDER=1 is deprecated; validating the debug overlay inline.\n'; \
		TRAEFIK_ENABLE_DOCKER_PROVIDER=1 $(MAKE) render-edge-routes; \
		$(COMPOSE_EDGE_DEBUG_BASE) config >/dev/null; \
		printf 'docker compose edge debug config validation: OK\n'; \
	else \
		TRAEFIK_ENABLE_DOCKER_PROVIDER=0 $(MAKE) render-edge-routes; \
		$(COMPOSE_EDGE_BASE) config >/dev/null; \
		printf 'docker compose edge config validation: OK\n'; \
	fi

validate-edge-tls: ## Validate base + edge + TLS overlay compose config without printing secrets.
	@TRAEFIK_ENABLE_DOCKER_PROVIDER=0 $(MAKE) render-edge-routes
	@$(COMPOSE_EDGE_TLS_BASE) config >/dev/null
	@printf 'docker compose edge TLS config validation: OK\n'

ps-edge: ## Show status of the edge stack (Traefik + app services, including profiled services if present).
	@$(COMPOSE_EDGE_ANY_ALL_PROFILES) ps

##@ 🚀 App Stack

prod-smoke: ## Smoke-check deployed production `web`, `api`, and `sitemap.xml` endpoints (Vercel-only topology).
	@sh docs/scripts/prod-vercel-smoke.sh "$(PROD_SMOKE_WEB_URL)" "$(PROD_SMOKE_API_URL)" "$(PROD_SMOKE_ARTICLE_PATH)" "$(PROD_SMOKE_PAGE_PATH)"

bootstrap: ## First-run setup (local DNS + edge stack) in background; macOS/Homebrew dnsmasq auto-setup when available.
	@sh docker/scripts/bootstrap-local.sh

##@ 🌐 Edge (Traefik + Local Hostnames)

edge-smoke: ## Smoke-check Traefik edge routes with GET requests (dashboard, web, api) using EDGE_PUBLIC_SCHEME.
	@status=0; \
	check_code() { \
		label="$$1"; \
		url="$$2"; \
		expected="$$3"; \
		code="000"; \
		attempt=1; \
		while [ "$$attempt" -le 10 ]; do \
			code="$$(curl -sS -L -o /dev/null -w '%{http_code}' "$$url" || printf '000')"; \
			[ "$$code" = "$$expected" ] && break; \
			sleep 1; \
			attempt=$$((attempt + 1)); \
		done; \
		if [ "$$code" = "$$expected" ]; then \
			printf '%-28s %s (%s)\n' "$$label" "$$code" "$$url"; \
		else \
			printf '%-28s %s (expected %s) (%s)\n' "$$label" "$$code" "$$expected" "$$url"; \
			status=1; \
		fi; \
	}; \
	check_code "traefik-dashboard" "$(EDGE_PUBLIC_SCHEME)://traefik.$(LOCAL_DEV_DOMAIN)/" "200"; \
	check_code "web-home" "$(EDGE_PUBLIC_SCHEME)://$(LOCAL_DEV_DOMAIN)/" "200"; \
	check_code "api-status" "$(EDGE_PUBLIC_SCHEME)://api.$(LOCAL_DEV_DOMAIN)/v1/status" "200"; \
	exit $$status

edge-smoke-tls: ## Smoke-check Traefik TLS edge routes with GET requests (dashboard, web, api).
	@status=0; \
	check_code() { \
		label="$$1"; \
		url="$$2"; \
		expected="$$3"; \
		code="000"; \
		attempt=1; \
		while [ "$$attempt" -le 10 ]; do \
			code="$$(curl -k -sS -L -o /dev/null -w '%{http_code}' "$$url" || printf '000')"; \
			[ "$$code" = "$$expected" ] && break; \
			sleep 1; \
			attempt=$$((attempt + 1)); \
		done; \
		if [ "$$code" = "$$expected" ]; then \
			printf '%-28s %s (%s)\n' "$$label" "$$code" "$$url"; \
		else \
			printf '%-28s %s (expected %s) (%s)\n' "$$label" "$$code" "$$expected" "$$url"; \
			status=1; \
		fi; \
	}; \
	check_code "traefik-dashboard-tls" "https://traefik.$(LOCAL_DEV_DOMAIN)/" "200"; \
	check_code "web-home-tls" "https://$(LOCAL_DEV_DOMAIN)/" "200"; \
	check_code "api-status-tls" "https://api.$(LOCAL_DEV_DOMAIN)/v1/status" "200"; \
	exit $$status

edge-dns-doctor: ## Diagnose local edge DNS issues (.local with browser DNS caching/DoH) and suggest the right next step.
	@sh docker/scripts/edge-dns-doctor.sh "$(LOCAL_DEV_DOMAIN)"

dnsmasq-local: ## Install/update macOS Homebrew dnsmasq config + /etc/resolver for LOCAL_DEV_DOMAIN (requires sudo).
	@sh docker/scripts/setup-dnsmasq-local-macos.sh "$(LOCAL_DEV_DOMAIN)"
	@$(MAKE) dnsmasq-health

dnsmasq-health: ## Full dnsmasq functional health check (resolver file, port 53 listener, and wildcard hostname resolution).
	@sh docker/scripts/dnsmasq-health-check.sh "$(LOCAL_DEV_DOMAIN)"

tls-local-setup: ## Generate mkcert local TLS cert/key + Traefik `docker/traefik/dynamic/local-tls.yml` for LOCAL_DEV_DOMAIN.
	@sh docker/scripts/setup-traefik-local-tls.sh "$(LOCAL_DEV_DOMAIN)"

render-edge-routes: ## Generate local Traefik file-provider routes from LOCAL_DEV_DOMAIN.
	@TRAEFIK_ENABLE_DOCKER_PROVIDER=$(TRAEFIK_ENABLE_DOCKER_PROVIDER_BOOL) sh docker/scripts/render-traefik-local-routes.sh "$(LOCAL_DEV_DOMAIN)"

use-orbstack-domain: ## Write `LOCAL_DEV_DOMAIN=guyromellemagayano.local` to ENV_FILE (OrbStack native path).
	@sh docker/scripts/set-env-file-var.sh "$(ENV_FILE)" LOCAL_DEV_DOMAIN guyromellemagayano.local
	@printf 'Next: make down-edge && make up-edge\n'

env-local-normalize: ## Normalize root `.env.local` for local Docker and remove app-level `.env.local` files from Vercel link.
	@sh docker/scripts/normalize-local-env.sh "$(ENV_FILE)"

##@ 🌐 Edge Runtime (Traefik + App Services)

up-edge: ## Start Traefik + app stack over local hostnames (HTTP only) in background.
	@if [ "$(TRAEFIK_ENABLE_DOCKER_PROVIDER_BOOL)" = "true" ]; then \
		printf 'up-edge: TRAEFIK_ENABLE_DOCKER_PROVIDER=1 is deprecated; starting the debug overlay inline.\n'; \
		TRAEFIK_ENABLE_DOCKER_PROVIDER=1 $(MAKE) render-edge-routes; \
		$(COMPOSE_EDGE_DEBUG_BASE) up --build -d; \
	else \
		TRAEFIK_ENABLE_DOCKER_PROVIDER=0 $(MAKE) render-edge-routes; \
		$(COMPOSE_EDGE_BASE) up --build -d; \
	fi

up-edge-tls: ## Start Traefik + app stack with optional local TLS overlay (mkcert-ready) in background.
	@TRAEFIK_ENABLE_DOCKER_PROVIDER=0 $(MAKE) render-edge-routes
	@$(COMPOSE_EDGE_TLS_BASE) up --build -d

down-edge: ## Stop the edge stack (base + Traefik overlays) and remove profiled/orphaned containers.
	@$(COMPOSE_EDGE_ANY_ALL_PROFILES) down --remove-orphans

logs-edge: ## Follow Traefik + api + web logs (tails the last `LOG_TAIL` lines first).
	@$(COMPOSE_EDGE_ANY_NO_FORCE) logs --tail=$(LOG_TAIL) -f traefik web api docker-socket-proxy

##@ ☁️  Vercel

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

vercel-env-pull-web: ## Pull Vercel env vars for `apps/web` into `apps/web/$(VERCEL_PULL_ENV_FILE)` (requires `apps/web/.vercel/project.json`).
	@sh docker/scripts/vercel-env-pull.sh "apps/web" "$(VERCEL_PULL_ENV_FILE)" "$(VERCEL_ENV_TARGET)" "$(VERCEL_GIT_BRANCH)"

vercel-env-pull-api: ## Pull Vercel env vars for `apps/api` into `apps/api/$(VERCEL_PULL_ENV_FILE)` (requires `apps/api/.vercel/project.json`).
	@sh docker/scripts/vercel-env-pull.sh "apps/api" "$(VERCEL_PULL_ENV_FILE)" "$(VERCEL_ENV_TARGET)" "$(VERCEL_GIT_BRANCH)"

vercel-env-pull: ## Pull Vercel env vars for all linked app projects (`web`, `api`).
	@$(MAKE) vercel-env-pull-web
	@$(MAKE) vercel-env-pull-api

vercel-env-sync-local: ## Pull app env vars from Vercel and regenerate root `.env.local` from app-level files.
	@$(MAKE) vercel-env-pull
	@PREFER_APP_ENV_FILES=1 KEEP_APP_ENV_FILES=1 $(MAKE) env-local-normalize

##@ 🛠  Tooling

check-types: ## Run `check-types` in the tooling container (Turbo concurrency tuned for Docker bind mounts).
	@$(COMPOSE_BASE) --profile tooling run --rm tooling pnpm exec turbo run check-types --concurrency=$(TURBO_DOCKER_CONCURRENCY)

lint: ## Run `lint` in the tooling container (Turbo concurrency tuned for Docker bind mounts).
	@$(COMPOSE_BASE) --profile tooling run --rm tooling pnpm exec turbo run lint lint:styles --concurrency=$(TURBO_DOCKER_CONCURRENCY)

test: ## Run `test:run` in the tooling container with a sanitized env (avoids `.env.local` leaking into unit tests).
	@$(COMPOSE_BASE) --profile tooling run --rm tooling sh -lc 'unset API_GATEWAY_URL NEXT_PUBLIC_API_URL API_GATEWAY_CONTENT_PROVIDER CONTENT_REVALIDATE_SECRET E2E_CONTENT_ARTICLE_SLUG E2E_CONTENT_PAGE_SLUG; pnpm exec turbo run test:run --concurrency=$(TURBO_DOCKER_CONCURRENCY)'

tooling: ## Run an arbitrary tooling command via `TOOLING_CMD`.
	@$(COMPOSE_BASE) --profile tooling run --rm tooling sh -lc '$(TOOLING_CMD)'

##@ 🧪 Playwright E2E

e2e: ## Run full Playwright e2e suite in Docker (`e2e` service).
	@$(COMPOSE_BASE) --profile e2e up --build --abort-on-container-exit --exit-code-from e2e e2e

e2e-content: ## Run the content pipeline smoke suite in Docker (`e2e-content-smoke` service).
	@$(COMPOSE_BASE) --profile e2e up --build --abort-on-container-exit --exit-code-from e2e-content-smoke e2e-content-smoke

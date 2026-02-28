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
SANITY_ARGS ?= projects list
TOOLING_CMD ?= pnpm check-types
TURBO_DOCKER_CONCURRENCY ?= 2
LOG_TAIL ?= 100
WATCH_SERVICES ?= api web admin
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
PROD_SMOKE_ADMIN_URL ?= https://admin.guyromellemagayano.com
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
	validate-prod \
	prod-smoke \
	validate-edge \
	validate-edge-debug \
	validate-edge-tls \
	ps \
	ps-prod \
	ps-edge \
	build-prod \
	bootstrap \
	bootstrap-watch \
	bootstrap-detached \
	up \
	up-watch \
	up-detached \
	up-edge \
	up-edge-watch \
	up-edge-detached \
	up-edge-debug \
	up-edge-debug-watch \
	up-edge-debug-detached \
	up-edge-tls \
	up-edge-tls-watch \
	up-edge-tls-detached \
	up-prod \
	up-prod-detached \
	down \
	down-prod \
	down-edge \
	logs \
	logs-prod \
	logs-edge \
	watch \
	watch-edge \
	watch-edge-tls \
	restart \
	reinstall \
	edge-hosts \
	edge-smoke \
	edge-smoke-tls \
	edge-dns-doctor \
	dnsmasq-local \
	dnsmasq-local-print \
	dnsmasq-health \
	dnsmasq-status \
	dnsmasq-verify \
	tls-local-setup \
	use-localhost-domain \
	use-orbstack-domain \
	env-local-normalize \
	vercel-env-pull \
	vercel-env-pull-web \
	vercel-env-pull-api \
	vercel-env-pull-admin \
	vercel-env-sync-local \
	vercel-host-check \
	vercel \
	render-edge-routes \
	check-types \
	lint \
	test \
	tooling \
	tooling-shell \
	sanity \
	e2e \
	e2e-sanity \
	e2e-list-sanity \
	docs-catalog-check \
	docs-catalog-update

##@ 🧭 Help

help: ## Show a concise local Docker DX help menu (golden path + common commands).
	@printf '\n🐳 Local Docker Workflow (Quick Help)\n'
	@printf '\n🚦 Golden Path\n'
	@printf '%-42s %s\n' "make doctor" "Validate Docker + Compose."
	@printf '%-42s %s\n' "make env-local-normalize" "Normalize root .env.local before first Docker run."
	@printf '%-42s %s\n' "make bootstrap-watch" "First run: DNS setup + edge stack + watch."
	@printf '%-42s %s\n' "make edge-smoke" "Verify Traefik routes (web/api/admin)."
	@printf '\n🎯 Daily Use\n'
	@printf '%-42s %s\n' "make up-edge-watch" "Foreground dev with local hostnames."
	@printf '%-42s %s\n' "make up-edge-detached" "Background dev stack."
	@printf '%-42s %s\n' "make logs-edge" "Follow Traefik + app logs."
	@printf '%-42s %s\n' "make down-edge" "Stop edge stack."
	@printf '\n🌐 DNS Modes\n'
	@printf '%-42s %s\n' "make dnsmasq-local" "Manual local DNS helper for current LOCAL_DEV_DOMAIN."
	@printf '%-42s %s\n' "make dnsmasq-health" "Functional dnsmasq checks."
	@printf '%-42s %s\n' "make edge-dns-doctor" "Diagnose browser DNS_PROBE_* / DoH issues."
	@printf '%-42s %s\n' "make env-local-normalize" "Normalize root .env.local for Docker and remove app-level .env.local."
	@printf '%-42s %s\n' "make use-localhost-domain" "Switch to .localhost fallback mode."
	@printf '%-42s %s\n' "make use-orbstack-domain" "Switch to OrbStack native guyromellemagayano.local mode."
	@printf '%-42s %s\n' "make tls-local-setup" "Generate mkcert certs + Traefik local TLS config."
	@printf '\n🐞 Debug\n'
	@printf '%-42s %s\n' "make up-edge-debug-watch" "Docker-provider debug mode (socket-proxy)."
	@printf '%-42s %s\n' "make validate-edge-debug" "Validate debug overlay compose config."
	@printf '\n⚙️  Key Variables\n'
	@printf '%-26s %s (current: %s)\n' "LOCAL_DEV_DOMAIN" "Local edge domain" "$(LOCAL_DEV_DOMAIN)"
	@printf '%-26s %s (current: %s)\n' "ENV_FILE" "Compose env file" "$(ENV_FILE)"
	@printf '%-26s %s (current: %s)\n' "LOG_TAIL" "Default tail lines for logs" "$(LOG_TAIL)"
	@printf '%-26s %s (current: %s)\n' "WATCH_SERVICES" "Services passed to compose watch" "$(WATCH_SERVICES)"
	@printf '\n📚 Miscellaneous\n'
	@printf '%-42s %s\n' "make help-all" "Full target catalog + full variable list."
	@printf '%-42s %s\n' "make info" "Print effective compose settings."
	@printf '%-42s %s\n' "make prod-smoke" "Smoke-check deployed Vercel web/api/admin endpoints."
	@printf '%-42s %s\n' "make docs-catalog-check" "Verify docs/catalog/README.md matches repo READMEs."
	@printf '%-42s %s\n' "make docs-catalog-update" "Regenerate docs/catalog/README.md from repo READMEs."
	@printf '%-42s %s\n' "make vercel-host-check" "Validate host Vercel CLI availability/fallback."
	@printf '%-42s %s\n' "make vercel-env-pull" "Pull app envs from linked Vercel projects."
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
	@printf '%-32s %s (current: %s)\n' "EDGE_DEBUG_COMPOSE_FILE" "Edge Docker-provider debug overlay" "$(EDGE_DEBUG_COMPOSE_FILE)"
	@printf '%-32s %s (current: %s)\n' "EDGE_TLS_COMPOSE_FILE" "Optional TLS overlay (mkcert-ready)" "$(EDGE_TLS_COMPOSE_FILE)"
	@printf '%-32s %s (current: %s)\n' "EDGE_ORBSTACK_COMPOSE_FILE" "OrbStack custom-domain overlay" "$(EDGE_ORBSTACK_COMPOSE_FILE)"
	@printf '%-32s %s (current: %s)\n' "LOCAL_DEV_DOMAIN" "Local edge base domain (guyromellemagayano.local default; .localhost fallback)" "$(LOCAL_DEV_DOMAIN)"
	@printf '%-32s %s (current: %s)\n' "EDGE_PUBLIC_SCHEME" "Public edge URL scheme derived from LOCAL_DEV_DOMAIN" "$(EDGE_PUBLIC_SCHEME)"
	@printf '%-32s %s (current: %s)\n' "TRAEFIK_HTTP_PORT" "Traefik HTTP port" "$(TRAEFIK_HTTP_PORT)"
	@printf '%-32s %s (current: %s)\n' "TRAEFIK_HTTPS_PORT" "Traefik HTTPS port (TLS overlay)" "$(TRAEFIK_HTTPS_PORT)"
	@printf '%-32s %s (current: %s)\n' "TRAEFIK_DOCKER_SOCKET_PATH" "Docker socket path (debug overlay)" "$(TRAEFIK_DOCKER_SOCKET_PATH)"
	@printf '%-32s %s (current: %s)\n' "TRAEFIK_DOCKER_API_VERSION" "Docker API version (debug overlay)" "$(TRAEFIK_DOCKER_API_VERSION)"
	@printf '%-32s %s (current: %s)\n' "TRAEFIK_ENABLE_DOCKER_PROVIDER" "Legacy toggle (prefer up-edge-debug* targets)" "$(TRAEFIK_ENABLE_DOCKER_PROVIDER)"
	@printf '%-32s %s (current: %s)\n' "TRAEFIK_LOG_LEVEL" "Traefik log level (ERROR/INFO/DEBUG)" "$(TRAEFIK_LOG_LEVEL)"
	@printf '%-32s %s (current: %s)\n' "PROD_SMOKE_WEB_URL" "Production web URL for make prod-smoke" "$(PROD_SMOKE_WEB_URL)"
	@printf '%-32s %s (current: %s)\n' "PROD_SMOKE_API_URL" "Production API URL for make prod-smoke" "$(PROD_SMOKE_API_URL)"
	@printf '%-32s %s (current: %s)\n' "PROD_SMOKE_ADMIN_URL" "Production admin URL for make prod-smoke" "$(PROD_SMOKE_ADMIN_URL)"
	@printf '%-32s %s (current: %s)\n' "VERCEL_ENV_TARGET" "Vercel env target for make vercel-env*" "$(VERCEL_ENV_TARGET)"
	@printf '%-32s %s (current: %s)\n' "VERCEL_GIT_BRANCH" "Optional preview branch for make vercel-env*" "$(VERCEL_GIT_BRANCH)"
	@printf '%-32s %s (current: %s)\n' "VERCEL_PULL_ENV_FILE" "Output filename per app for make vercel-env*" "$(VERCEL_PULL_ENV_FILE)"
	@printf '%-32s %s (current: %s)\n' "VERCEL_ARGS" "Arguments for make vercel" "$(VERCEL_ARGS)"
	@printf '%-32s %s (current: %s)\n' "WATCH_SERVICES" 'Services passed to `docker compose watch`' "$(WATCH_SERVICES)"
	@printf '%-32s %s (current: %s)\n' "LOG_TAIL" 'Default tail lines for `make logs*`' "$(LOG_TAIL)"
	@printf '%-32s %s (current: %s)\n' "FORCE_PNPM_INSTALL" "1 forces pnpm reinstall in containers" "$(FORCE_PNPM_INSTALL)"
	@printf '%-32s %s (current: %s)\n' "SKIP_DNS_SETUP" 'Skip dnsmasq/hosts step in `make bootstrap*`' "$(SKIP_DNS_SETUP)"
	@printf '\n🚦 First Run (Recommended)\n'
	@printf '%-44s %s\n' "make doctor" "Validate Docker/Compose setup."
	@printf '%-44s %s\n' "make env-local-normalize" "Normalize root .env.local before first Docker run."
	@printf '%-44s %s\n' "make bootstrap-watch" "Golden path: DNS setup + edge stack + watch (foreground)."
	@printf '%-44s %s\n' "make bootstrap-detached" "Golden path (background) + use make logs-edge."
	@printf '%-44s %s\n' "make bootstrap-watch SKIP_DNS_SETUP=1" "Skip DNS bootstrap if already configured."
	@printf '\n🎯 Run Modes (Recommended)\n'
	@printf '%-44s %s\n' "make up-edge-watch" "Foreground (active coding)." 
	@printf '%-44s %s\n' "make up-edge-detached" "Background services (pair with make logs-edge)."
	@printf '\n🪟  Separate Terminal (Optional Monitoring)\n'
	@printf '%-44s %s\n' "make ps-edge" "Inspect edge stack service status."
	@printf '%-44s %s\n' "make logs-edge" "Follow Traefik + app logs."
	@printf '%-44s %s\n' "make watch-edge" 'Run Compose watch (best with `make up-edge-detached`).'
	@printf '%-44s %s\n' "make edge-smoke" "HTTP routing smoke check (dashboard/web/api/admin)."
	@printf '\n🐞 Debug / Troubleshooting\n'
	@printf '%-44s %s\n' "make dnsmasq-health" "Functional dnsmasq checks (truth source)."
	@printf '%-44s %s\n' "make dnsmasq-status" "Advisory Homebrew dnsmasq status only."
	@printf '%-44s %s\n' "make edge-dns-doctor" "Browser DNS_PROBE_* diagnosis + .localhost/OrbStack guidance."
	@printf '%-44s %s\n' "make use-orbstack-domain" "Switch LOCAL_DEV_DOMAIN to guyromellemagayano.local."
	@printf '%-44s %s\n' "make vercel-host-check" "Check host Vercel CLI install and fallback readiness."
	@printf '%-44s %s\n' "make vercel" "Run Vercel CLI on host."
	@printf '%-44s %s\n' "make vercel-env-pull" "Pull app-level envs from linked Vercel projects."
	@printf '%-44s %s\n' "make vercel-env-sync-local" "Pull app envs and regenerate root .env.local."
	@printf '%-44s %s\n' "make tls-local-setup" "Generate mkcert certs + Traefik local-tls.yml."
	@printf '%-44s %s\n' "make up-edge-debug-watch" "Docker-provider debug mode (socket-proxy-backed)."
	@printf '%-44s %s\n' "make prod-smoke" "Smoke-check deployed Vercel web/api/admin + sitemap."
	@printf '\n💡 Examples\n'
	@printf 'make bootstrap-watch\n'
	@printf 'make edge-smoke\n'
	@printf 'make up-edge-detached && make logs-edge\n'
	@printf 'make dnsmasq-local && make edge-smoke\n'
	@printf 'make edge-dns-doctor\n'
	@printf 'make vercel-host-check\n'
	@printf 'make vercel VERCEL_ARGS="whoami"\n'
	@printf 'make vercel VERCEL_ARGS="link --cwd apps/web"\n'
	@printf 'make vercel-env-pull VERCEL_ENV_TARGET=development\n'
	@printf 'make vercel-env-sync-local VERCEL_ENV_TARGET=preview VERCEL_GIT_BRANCH=feature/sanity-integration\n'
	@printf 'make use-localhost-domain\n'
	@printf 'make use-orbstack-domain && make up-edge-watch\n'
	@printf 'make tls-local-setup && make up-edge-tls-watch\n'
	@printf 'make up-edge-debug-watch  # debug Docker-provider routing\n'
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
	@printf 'SANITY_ARGS=%s\n' "$(SANITY_ARGS)"
	@printf 'TOOLING_CMD=%s\n' "$(TOOLING_CMD)"
	@printf 'TURBO_DOCKER_CONCURRENCY=%s\n' "$(TURBO_DOCKER_CONCURRENCY)"
	@printf 'LOG_TAIL=%s\n' "$(LOG_TAIL)"
	@printf 'WATCH_SERVICES=%s\n' "$(WATCH_SERVICES)"
	@printf 'LOCAL_DEV_DOMAIN=%s\n' "$(LOCAL_DEV_DOMAIN)"
	@printf 'EDGE_PUBLIC_SCHEME=%s\n' "$(EDGE_PUBLIC_SCHEME)"
	@printf 'TRAEFIK_HTTP_PORT=%s\n' "$(TRAEFIK_HTTP_PORT)"
	@printf 'TRAEFIK_HTTPS_PORT=%s\n' "$(TRAEFIK_HTTPS_PORT)"
	@printf 'TRAEFIK_DOCKER_SOCKET_PATH=%s\n' "$(TRAEFIK_DOCKER_SOCKET_PATH)"
	@printf 'TRAEFIK_DOCKER_API_VERSION=%s\n' "$(TRAEFIK_DOCKER_API_VERSION)"
	@printf 'TRAEFIK_ENABLE_DOCKER_PROVIDER=%s\n' "$(TRAEFIK_ENABLE_DOCKER_PROVIDER)"
	@printf 'TRAEFIK_LOG_LEVEL=%s\n' "$(TRAEFIK_LOG_LEVEL)"
	@printf 'PROD_WEB_PORT=%s\n' "$(PROD_WEB_PORT)"
	@printf 'PROD_API_PORT=%s\n' "$(PROD_API_PORT)"
	@printf 'PROD_SMOKE_WEB_URL=%s\n' "$(PROD_SMOKE_WEB_URL)"
	@printf 'PROD_SMOKE_API_URL=%s\n' "$(PROD_SMOKE_API_URL)"
	@printf 'PROD_SMOKE_ADMIN_URL=%s\n' "$(PROD_SMOKE_ADMIN_URL)"
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

validate-prod: ## Validate production compose config without printing secrets.
	@$(COMPOSE_PROD_NO_FORCE) config >/dev/null
	@printf 'docker compose production config validation: OK\n'

validate-edge: ## Validate base + Traefik edge overlay compose config without printing secrets.
	@if [ "$(TRAEFIK_ENABLE_DOCKER_PROVIDER_BOOL)" = "true" ]; then \
		printf 'validate-edge: TRAEFIK_ENABLE_DOCKER_PROVIDER=1 is deprecated for the default path; using validate-edge-debug instead.\n'; \
		$(MAKE) validate-edge-debug; \
	else \
		TRAEFIK_ENABLE_DOCKER_PROVIDER=0 $(MAKE) render-edge-routes; \
		$(COMPOSE_EDGE_BASE) config >/dev/null; \
		printf 'docker compose edge config validation: OK\n'; \
	fi

validate-edge-debug: ## Validate base + edge + Docker-provider debug overlay compose config without printing secrets.
	@TRAEFIK_ENABLE_DOCKER_PROVIDER=1 $(MAKE) render-edge-routes
	@$(COMPOSE_EDGE_DEBUG_BASE) config >/dev/null
	@printf 'docker compose edge debug config validation: OK\n'

validate-edge-tls: ## Validate base + edge + TLS overlay compose config without printing secrets.
	@TRAEFIK_ENABLE_DOCKER_PROVIDER=0 $(MAKE) render-edge-routes
	@$(COMPOSE_EDGE_TLS_BASE) config >/dev/null
	@printf 'docker compose edge TLS config validation: OK\n'

ps: ## Show status of local docker compose services (including profiled services if present).
	@$(COMPOSE_ALL_PROFILES) ps

ps-prod: ## Show status of production compose services.
	@$(COMPOSE_PROD_NO_FORCE) ps

ps-edge: ## Show status of the edge stack (Traefik + app services, including profiled services if present).
	@$(COMPOSE_EDGE_ANY_ALL_PROFILES) ps

##@ 🚀 App Stack

build-prod: ## Build production Docker images for api + web (no containers started).
	@$(COMPOSE_PROD_NO_FORCE) build

prod-smoke: ## Smoke-check deployed production `web`, `api`, `admin`, and `sitemap.xml` endpoints (Vercel-only topology).
	@sh docs/scripts/prod-vercel-smoke.sh "$(PROD_SMOKE_WEB_URL)" "$(PROD_SMOKE_API_URL)" "$(PROD_SMOKE_ADMIN_URL)" "$(PROD_SMOKE_ARTICLE_PATH)" "$(PROD_SMOKE_PAGE_PATH)"

bootstrap: ## First-run setup (local DNS + edge stack) in foreground; macOS/Homebrew dnsmasq auto-setup when available.
	@sh docker/scripts/bootstrap-local.sh foreground

bootstrap-watch: ## First-run setup (local DNS + edge stack + Compose watch) in foreground; macOS/Homebrew dnsmasq auto-setup when available.
	@sh docker/scripts/bootstrap-local.sh watch

bootstrap-detached: ## First-run setup (local DNS + edge stack) in background; macOS/Homebrew dnsmasq auto-setup when available.
	@sh docker/scripts/bootstrap-local.sh detached

up: ## Start api + web + admin in foreground (equivalent to `pnpm dev:docker` + admin).
	@$(COMPOSE_BASE) up --build

up-watch: ## Start api + web + admin in foreground with Compose watch (`docker compose up --watch`).
	@$(COMPOSE_BASE) up --build --watch

up-detached: ## Start api + web + admin in background.
	@$(COMPOSE_BASE) up --build -d

down: ## Stop the local docker stack and remove profiled/orphaned compose containers.
	@$(COMPOSE_ALL_PROFILES) down --remove-orphans

up-prod: ## Start production compose services (api + web) in foreground.
	@$(COMPOSE_PROD_NO_FORCE) up --build

up-prod-detached: ## Start production compose services (api + web) in background.
	@$(COMPOSE_PROD_NO_FORCE) up --build -d

down-prod: ## Stop production compose services and remove orphans.
	@$(COMPOSE_PROD_NO_FORCE) down --remove-orphans

logs: ## Follow api + web + admin logs (tails the last `LOG_TAIL` lines first; default 100).
	@$(COMPOSE_NO_FORCE) logs --tail=$(LOG_TAIL) -f web api admin

logs-prod: ## Follow production api + web logs (tails the last `LOG_TAIL` lines first).
	@$(COMPOSE_PROD_NO_FORCE) logs --tail=$(LOG_TAIL) -f web api

restart: ## Restart the local docker stack (down then detached up).
	@$(MAKE) down
	@$(MAKE) up-detached

reinstall: ## Start the stack and force pnpm reinstall in containers (`FORCE_PNPM_INSTALL=1`).
	@$(MAKE) up FORCE_PNPM_INSTALL=1

##@ 🌐 Edge (Traefik + Local Hostnames)

edge-hosts: ## Print /etc/hosts entries for the configured local hostname domain.
	@printf '127.0.0.1 %s\n' "$(LOCAL_DEV_DOMAIN)"
	@printf '127.0.0.1 api.%s\n' "$(LOCAL_DEV_DOMAIN)"
	@printf '127.0.0.1 admin.%s\n' "$(LOCAL_DEV_DOMAIN)"
	@printf '127.0.0.1 traefik.%s\n' "$(LOCAL_DEV_DOMAIN)"

edge-smoke: ## Smoke-check Traefik edge routes with GET requests (dashboard, web, api, admin) using EDGE_PUBLIC_SCHEME.
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
	check_code "admin-home" "$(EDGE_PUBLIC_SCHEME)://admin.$(LOCAL_DEV_DOMAIN)/" "200"; \
	exit $$status

edge-smoke-tls: ## Smoke-check Traefik TLS edge routes with GET requests (dashboard, web, api, admin).
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
	check_code "admin-home-tls" "https://admin.$(LOCAL_DEV_DOMAIN)/" "200"; \
	exit $$status

edge-dns-doctor: ## Diagnose local edge DNS issues (.local/.localhost with browser DNS caching/DoH) and suggest the right next step.
	@sh docker/scripts/edge-dns-doctor.sh "$(LOCAL_DEV_DOMAIN)"

dnsmasq-local-print: ## Print the dnsmasq and resolver file contents for the local edge domain (macOS/Homebrew).
	@printf '# %s/etc/dnsmasq.d/portfolio-local.conf\n' "$$(brew --prefix)"
	@printf 'address=/%s/127.0.0.1\n' "$(LOCAL_DEV_DOMAIN)"
	@printf '\n# /etc/resolver/%s\n' "$(LOCAL_DEV_DOMAIN)"
	@printf 'nameserver 127.0.0.1\nport 53\n'

dnsmasq-local: ## Install/update macOS Homebrew dnsmasq config + /etc/resolver for LOCAL_DEV_DOMAIN (requires sudo).
	@sh docker/scripts/setup-dnsmasq-local-macos.sh "$(LOCAL_DEV_DOMAIN)"
	@$(MAKE) dnsmasq-health
	@$(MAKE) dnsmasq-status

dnsmasq-health: ## Full dnsmasq functional health check (resolver file, port 53 listener, and wildcard hostname resolution).
	@sh docker/scripts/dnsmasq-health-check.sh "$(LOCAL_DEV_DOMAIN)"

dnsmasq-status: ## Show Homebrew dnsmasq service status (advisory only); use `make dnsmasq-health` for functional verification.
	@if [ "$$(uname -s)" != "Darwin" ]; then \
		printf 'dnsmasq-status: advisory Homebrew status check is macOS-specific; use `make dnsmasq-health` for functional checks.\n'; \
	elif ! command -v brew >/dev/null 2>&1; then \
		printf 'dnsmasq-status: Homebrew not found in PATH; use `make dnsmasq-health` for functional checks.\n'; \
	else \
		if command -v rg >/dev/null 2>&1; then \
			line="$$(brew services list 2>/dev/null | rg '^dnsmasq[[:space:]]' || true)"; \
		else \
			line="$$(brew services list 2>/dev/null | grep '^dnsmasq[[:space:]]' || true)"; \
		fi; \
		if [ -n "$$line" ]; then \
			printf '%s\n' "$$line"; \
			printf 'dnsmasq-status is advisory only; use `make dnsmasq-health` for functional verification.\n'; \
			printf '%s\n' "$$line" | grep -Eq '[[:space:]]error[[:space:]]+78([[:space:]]|$$)' && \
				printf 'Warning: Homebrew may report `error 78` even while dnsmasq is functionally working. Trust `make dnsmasq-health` and `make dnsmasq-verify`.\n' || true; \
		else \
			printf 'dnsmasq-status: no dnsmasq row found in `brew services list`.\n'; \
			printf 'Status is advisory only; use `make dnsmasq-health` for functional verification.\n'; \
		fi; \
	fi

dnsmasq-verify: ## Verify dnsmasq wildcard resolution for the local edge domain (hostname lookup only; uses system resolver on macOS).
	@status=0; \
	resolve_host() { \
		if [ "$$(uname -s)" = "Darwin" ] && command -v dscacheutil >/dev/null 2>&1; then \
			dscacheutil -q host -a name "$$1" 2>/dev/null | awk '/^ip_address: / {print $$2}'; \
		elif command -v getent >/dev/null 2>&1; then \
			getent hosts "$$1" 2>/dev/null | awk '{print $$1}'; \
		else \
			dig +short "$$1"; \
		fi; \
	}; \
	for host in "$(LOCAL_DEV_DOMAIN)" "api.$(LOCAL_DEV_DOMAIN)" "admin.$(LOCAL_DEV_DOMAIN)" "traefik.$(LOCAL_DEV_DOMAIN)"; do \
		result="$$(resolve_host "$$host" | tr '\n' ' ' | sed 's/[[:space:]]$$//')"; \
		if [ -n "$$result" ]; then \
			printf '%-44s %s\n' "$$host" "$$result"; \
		else \
			printf '%-44s %s\n' "$$host" 'NXDOMAIN / no DNS result'; \
			status=1; \
		fi; \
	done; \
	exit $$status

tls-local-setup: ## Generate mkcert local TLS cert/key + Traefik `docker/traefik/dynamic/local-tls.yml` for LOCAL_DEV_DOMAIN.
	@sh docker/scripts/setup-traefik-local-tls.sh "$(LOCAL_DEV_DOMAIN)"

render-edge-routes: ## Generate local Traefik file-provider routes from LOCAL_DEV_DOMAIN.
	@TRAEFIK_ENABLE_DOCKER_PROVIDER=$(TRAEFIK_ENABLE_DOCKER_PROVIDER_BOOL) sh docker/scripts/render-traefik-local-routes.sh "$(LOCAL_DEV_DOMAIN)"

use-localhost-domain: ## Write `LOCAL_DEV_DOMAIN=guyromellemagayano.localhost` to ENV_FILE (browser DoH fallback path).
	@sh docker/scripts/set-env-file-var.sh "$(ENV_FILE)" LOCAL_DEV_DOMAIN guyromellemagayano.localhost
	@printf 'Next: make down-edge && make up-edge-watch\n'

use-orbstack-domain: ## Write `LOCAL_DEV_DOMAIN=guyromellemagayano.local` to ENV_FILE (OrbStack native path).
	@sh docker/scripts/set-env-file-var.sh "$(ENV_FILE)" LOCAL_DEV_DOMAIN guyromellemagayano.local
	@printf 'Next: make down-edge && make up-edge-watch\n'

env-local-normalize: ## Normalize root `.env.local` for local Docker and remove app-level `.env.local` files from Vercel link.
	@sh docker/scripts/normalize-local-env.sh "$(ENV_FILE)"

##@ 🌐 Edge Runtime (Traefik + App Services)

up-edge: ## Start Traefik + app stack over local hostnames (HTTP only) in foreground.
	@if [ "$(TRAEFIK_ENABLE_DOCKER_PROVIDER_BOOL)" = "true" ]; then \
		printf 'up-edge: TRAEFIK_ENABLE_DOCKER_PROVIDER=1 is deprecated for the default path; using up-edge-debug instead.\n'; \
		$(MAKE) up-edge-debug; \
	else \
		TRAEFIK_ENABLE_DOCKER_PROVIDER=0 $(MAKE) render-edge-routes; \
		$(COMPOSE_EDGE_BASE) up --build; \
	fi

up-edge-watch: ## Start Traefik + app stack over local hostnames (HTTP only) in foreground with Compose watch.
	@if [ "$(TRAEFIK_ENABLE_DOCKER_PROVIDER_BOOL)" = "true" ]; then \
		printf 'up-edge-watch: TRAEFIK_ENABLE_DOCKER_PROVIDER=1 is deprecated for the default path; using up-edge-debug-watch instead.\n'; \
		$(MAKE) up-edge-debug-watch; \
	else \
		TRAEFIK_ENABLE_DOCKER_PROVIDER=0 $(MAKE) render-edge-routes; \
		$(COMPOSE_EDGE_BASE) up --build --watch; \
	fi

up-edge-detached: ## Start Traefik + app stack over local hostnames (HTTP only) in background.
	@if [ "$(TRAEFIK_ENABLE_DOCKER_PROVIDER_BOOL)" = "true" ]; then \
		printf 'up-edge-detached: TRAEFIK_ENABLE_DOCKER_PROVIDER=1 is deprecated for the default path; using up-edge-debug-detached instead.\n'; \
		$(MAKE) up-edge-debug-detached; \
	else \
		TRAEFIK_ENABLE_DOCKER_PROVIDER=0 $(MAKE) render-edge-routes; \
		$(COMPOSE_EDGE_BASE) up --build -d; \
	fi

up-edge-debug: ## Start Traefik + app stack in Docker-provider debug mode (socket-proxy-backed) in foreground.
	@TRAEFIK_ENABLE_DOCKER_PROVIDER=1 $(MAKE) render-edge-routes
	@$(COMPOSE_EDGE_DEBUG_BASE) up --build

up-edge-debug-watch: ## Start Traefik + app stack in Docker-provider debug mode with Compose watch.
	@TRAEFIK_ENABLE_DOCKER_PROVIDER=1 $(MAKE) render-edge-routes
	@$(COMPOSE_EDGE_DEBUG_BASE) up --build --watch

up-edge-debug-detached: ## Start Traefik + app stack in Docker-provider debug mode in background.
	@TRAEFIK_ENABLE_DOCKER_PROVIDER=1 $(MAKE) render-edge-routes
	@$(COMPOSE_EDGE_DEBUG_BASE) up --build -d

up-edge-tls: ## Start Traefik + app stack with optional local TLS overlay (mkcert-ready) in foreground.
	@TRAEFIK_ENABLE_DOCKER_PROVIDER=0 $(MAKE) render-edge-routes
	@$(COMPOSE_EDGE_TLS_BASE) up --build

up-edge-tls-watch: ## Start Traefik + app stack with optional local TLS overlay (mkcert-ready) in foreground with Compose watch.
	@TRAEFIK_ENABLE_DOCKER_PROVIDER=0 $(MAKE) render-edge-routes
	@$(COMPOSE_EDGE_TLS_BASE) up --build --watch

up-edge-tls-detached: ## Start Traefik + app stack with optional local TLS overlay (mkcert-ready) in background.
	@TRAEFIK_ENABLE_DOCKER_PROVIDER=0 $(MAKE) render-edge-routes
	@$(COMPOSE_EDGE_TLS_BASE) up --build -d

down-edge: ## Stop the edge stack (base + Traefik overlays) and remove profiled/orphaned containers.
	@$(COMPOSE_EDGE_ANY_ALL_PROFILES) down --remove-orphans

logs-edge: ## Follow Traefik + api + web + admin logs (tails the last `LOG_TAIL` lines first).
	@$(COMPOSE_EDGE_ANY_NO_FORCE) logs --tail=$(LOG_TAIL) -f traefik web api admin docker-socket-proxy

##@ 👀 Compose Watch

watch: ## Run Docker Compose watch for base stack services (use with `make up-detached`; source HMR remains app-level).
	@$(COMPOSE_BASE) watch $(WATCH_SERVICES)

watch-edge: ## Run Docker Compose watch for edge stack app services (use with `make up-edge-detached`).
	@$(COMPOSE_EDGE_BASE) watch $(WATCH_SERVICES)

watch-edge-tls: ## Run Docker Compose watch for edge TLS stack app services (use with `make up-edge-tls-detached`).
	@$(COMPOSE_EDGE_TLS_BASE) watch $(WATCH_SERVICES)

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

vercel-env-pull-admin: ## Pull Vercel env vars for `apps/admin` into `apps/admin/$(VERCEL_PULL_ENV_FILE)` (requires `apps/admin/.vercel/project.json`).
	@sh docker/scripts/vercel-env-pull.sh "apps/admin" "$(VERCEL_PULL_ENV_FILE)" "$(VERCEL_ENV_TARGET)" "$(VERCEL_GIT_BRANCH)"

vercel-env-pull: ## Pull Vercel env vars for all linked app projects (`web`, `api`, `admin`).
	@$(MAKE) vercel-env-pull-web
	@$(MAKE) vercel-env-pull-api
	@$(MAKE) vercel-env-pull-admin

vercel-env-sync-local: ## Pull app env vars from Vercel and regenerate root `.env.local` from app-level files.
	@$(MAKE) vercel-env-pull
	@PREFER_APP_ENV_FILES=1 KEEP_APP_ENV_FILES=1 $(MAKE) env-local-normalize

##@ 🛠  Tooling

check-types: ## Run `check-types` in the tooling container (Turbo concurrency tuned for Docker bind mounts).
	@$(COMPOSE_BASE) --profile tooling run --rm tooling pnpm exec turbo run check-types --concurrency=$(TURBO_DOCKER_CONCURRENCY)

lint: ## Run `lint` in the tooling container (Turbo concurrency tuned for Docker bind mounts).
	@$(COMPOSE_BASE) --profile tooling run --rm tooling pnpm exec turbo run lint lint:styles --concurrency=$(TURBO_DOCKER_CONCURRENCY)

test: ## Run `test:run` in the tooling container with a sanitized env (avoids `.env.local` leaking into unit tests).
	@$(COMPOSE_BASE) --profile tooling run --rm tooling sh -lc 'unset API_GATEWAY_URL NEXT_PUBLIC_API_URL API_GATEWAY_CONTENT_PROVIDER SANITY_PROJECT_ID SANITY_DATASET SANITY_API_VERSION SANITY_API_READ_TOKEN NEXT_PUBLIC_SANITY_PROJECT_ID NEXT_PUBLIC_SANITY_DATASET NEXT_PUBLIC_SANITY_API_VERSION; pnpm exec turbo run test:run --concurrency=$(TURBO_DOCKER_CONCURRENCY)'

tooling: ## Run an arbitrary tooling command via `TOOLING_CMD`.
	@$(COMPOSE_BASE) --profile tooling run --rm tooling sh -lc '$(TOOLING_CMD)'

tooling-shell: ## Open an interactive shell in the tooling container.
	@$(COMPOSE_BASE) --profile tooling run --rm tooling sh

sanity: ## Run Sanity CLI via web workspace (`SANITY_ARGS`, e.g. `projects list`).
	@$(COMPOSE_BASE) --profile tooling run --rm tooling sh -lc 'pnpm --filter web sanity $(SANITY_ARGS)'

##@ 🧪 Playwright E2E

e2e: ## Run full Playwright e2e suite in Docker (`e2e` service).
	@$(COMPOSE_BASE) --profile e2e up --build --abort-on-container-exit --exit-code-from e2e e2e

e2e-sanity: ## Run the Sanity pipeline smoke suite in Docker (`e2e-sanity-smoke` service).
	@$(COMPOSE_BASE) --profile e2e up --build --abort-on-container-exit --exit-code-from e2e-sanity-smoke e2e-sanity-smoke

e2e-list-sanity: ## List the `@sanity` Playwright tests in Docker without executing them.
	@$(COMPOSE_BASE) --profile e2e run --rm e2e-sanity-smoke pnpm --filter e2e exec playwright test --project chromium --grep '@sanity' --list

##@ 📚 Docs

docs-catalog-check: ## Verify `docs/catalog/README.md` is in sync with repo `README.md` files.
	@sh docs/scripts/check-readme-catalog.sh

docs-catalog-update: ## Regenerate `docs/catalog/README.md` from repo `README.md` files.
	@sh docs/scripts/update-readme-catalog.sh

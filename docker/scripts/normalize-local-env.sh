#!/bin/sh

set -eu

ROOT_ENV_FILE="${1:-.env.local}"
WEB_ENV_FILE="${2:-apps/web/.env.local}"
API_ENV_FILE="${3:-apps/api-portfolio/.env.local}"

pick_env_value() {
  key="$1"
  fallback="$2"
  shift 2

  for file_path in "$@"; do
    [ -f "$file_path" ] || continue

    candidate_value=$(
      awk -v key="$key" '
        BEGIN { pattern = "^[[:space:]]*" key "=" }
        $0 ~ pattern {
          sub(/^[^=]*=/, "", $0)
          value = $0
        }
        END {
          if (value != "") {
            print value
          }
        }
      ' "$file_path"
    )

    [ -n "${candidate_value:-}" ] || continue

    compact_value=$(printf '%s' "$candidate_value" | tr -d '[:space:]')
    if [ -n "$compact_value" ] && [ "$compact_value" != "\"\"" ] && [ "$compact_value" != "''" ]; then
      printf '%s' "$candidate_value"
      return 0
    fi
  done

  printf '%s' "$fallback"
}

if [ "${PREFER_APP_ENV_FILES:-0}" = "1" ]; then
  SOURCE_FILES="$WEB_ENV_FILE $API_ENV_FILE $ROOT_ENV_FILE"
else
  SOURCE_FILES="$ROOT_ENV_FILE $WEB_ENV_FILE $API_ENV_FILE"
fi

local_dev_domain=$(pick_env_value "LOCAL_DEV_DOMAIN" "\"guyromellemagayano.local\"" "$SOURCE_FILES")
local_dev_domain_plain=$(printf '%s' "$local_dev_domain" | sed 's/^"//; s/"$//')
local_url_scheme="https"
case "$local_dev_domain_plain" in
  localhost|127.0.0.1|0.0.0.0|::1)
    local_url_scheme="http"
    ;;
esac
portfolio_api_url="\"${local_url_scheme}://api.${local_dev_domain_plain}\""
next_public_api_url="\"${local_url_scheme}://api.${local_dev_domain_plain}\""
next_public_site_url="\"${local_url_scheme}://${local_dev_domain_plain}\""
portfolio_api_content_provider=$(pick_env_value "PORTFOLIO_API_CONTENT_PROVIDER" "$(pick_env_value "API_GATEWAY_CONTENT_PROVIDER" "\"local\"" "$SOURCE_FILES")" "$SOURCE_FILES")
portfolio_api_cors_origins=$(pick_env_value "PORTFOLIO_API_CORS_ORIGINS" "$(pick_env_value "API_GATEWAY_CORS_ORIGINS" "\"\"" "$SOURCE_FILES")" "$SOURCE_FILES")
content_revalidate_secret=$(pick_env_value "CONTENT_REVALIDATE_SECRET" "\"\"" "$SOURCE_FILES")

sitemap_site_url="\"${local_url_scheme}://${local_dev_domain_plain}\""
sitemap_include_cms_content=$(pick_env_value "SITEMAP_INCLUDE_CMS_CONTENT" "\"true\"" "$SOURCE_FILES")
sitemap_fail_on_cms_fetch_error=$(pick_env_value "SITEMAP_FAIL_ON_CMS_FETCH_ERROR" "\"false\"" "$SOURCE_FILES")

e2e_base_url=$(pick_env_value "E2E_BASE_URL" "\"http://127.0.0.1:3000\"" "$SOURCE_FILES")
e2e_use_external_servers=$(pick_env_value "E2E_USE_EXTERNAL_SERVERS" "\"\"" "$SOURCE_FILES")
e2e_content_article_slug=$(pick_env_value "E2E_CONTENT_ARTICLE_SLUG" "\"\"" "$SOURCE_FILES")
e2e_content_page_slug=$(pick_env_value "E2E_CONTENT_PAGE_SLUG" "\"\"" "$SOURCE_FILES")

enable_experimental_corepack=$(pick_env_value "ENABLE_EXPERIMENTAL_COREPACK" "\"1\"" "$SOURCE_FILES")
eslint_use_flat_config=$(pick_env_value "ESLINT_USE_FLAT_CONFIG" "\"true\"" "$SOURCE_FILES")
bundle_analyze=$(pick_env_value "BUNDLE_ANALYZE" "\"false\"" "$SOURCE_FILES")
npm_token=$(pick_env_value "NPM_TOKEN" "\"\"" "$SOURCE_FILES")
turbo_remote_cache_signature_key=$(pick_env_value "TURBO_REMOTE_CACHE_SIGNATURE_KEY" "\"\"" "$SOURCE_FILES")

tmp_env_file=$(mktemp)
trap 'rm -f "$tmp_env_file"' EXIT

cat >"$tmp_env_file" <<EOF
# Local Docker env (single source of truth)
LOCAL_DEV_DOMAIN=$local_dev_domain
ENABLE_EXPERIMENTAL_COREPACK=$enable_experimental_corepack
ESLINT_USE_FLAT_CONFIG=$eslint_use_flat_config
BUNDLE_ANALYZE=$bundle_analyze

# Local app URLs (used by host-side runs and Dockerized tooling)
PORTFOLIO_API_URL=$portfolio_api_url
NEXT_PUBLIC_API_URL=$next_public_api_url
NEXT_PUBLIC_SITE_URL=$next_public_site_url
PORTFOLIO_API_CONTENT_PROVIDER=$portfolio_api_content_provider
PORTFOLIO_API_CORS_ORIGINS=$portfolio_api_cors_origins

# Content revalidation auth
CONTENT_REVALIDATE_SECRET=$content_revalidate_secret

# Sitemap defaults for local
SITEMAP_SITE_URL=$sitemap_site_url
SITEMAP_INCLUDE_CMS_CONTENT=$sitemap_include_cms_content
SITEMAP_FAIL_ON_CMS_FETCH_ERROR=$sitemap_fail_on_cms_fetch_error

# E2E defaults
E2E_BASE_URL=$e2e_base_url
E2E_USE_EXTERNAL_SERVERS=$e2e_use_external_servers
E2E_CONTENT_ARTICLE_SLUG=$e2e_content_article_slug
E2E_CONTENT_PAGE_SLUG=$e2e_content_page_slug

# Optional auth/cache tokens (only if needed locally)
NPM_TOKEN=$npm_token
TURBO_REMOTE_CACHE_SIGNATURE_KEY=$turbo_remote_cache_signature_key
EOF

mv "$tmp_env_file" "$ROOT_ENV_FILE"

if [ "${KEEP_APP_ENV_FILES:-0}" != "1" ]; then
  rm -f "$WEB_ENV_FILE" "$API_ENV_FILE"
  printf 'Removed app-level .env.local files to keep root env as the single local source of truth.\n'
fi

printf 'Normalized local env file: %s\n' "$ROOT_ENV_FILE"
printf 'Domain: %s\n' "$local_dev_domain"

#!/bin/sh

set -eu

WEB_URL="${1:-}"
API_URL="${2:-}"
ADMIN_URL="${3:-}"
ARTICLE_PATH="${4:-}"
PAGE_PATH="${5:-}"

if [ -z "$WEB_URL" ] || [ -z "$API_URL" ] || [ -z "$ADMIN_URL" ]; then
  printf 'usage: %s <web-url> <api-url> <admin-url> [article-path] [page-path]\n' "$0" >&2
  exit 1
fi

status=0

trim_trailing_slash() {
  printf '%s' "$1" | sed 's#/*$##'
}

WEB_URL="$(trim_trailing_slash "$WEB_URL")"
API_URL="$(trim_trailing_slash "$API_URL")"
ADMIN_URL="$(trim_trailing_slash "$ADMIN_URL")"

check_http() {
  label="$1"
  url="$2"
  expected="$3"
  code="000"
  attempt=1

  while [ "$attempt" -le 5 ]; do
    code="$(curl -sS -L -o /dev/null -w '%{http_code}' "$url" || printf '000')"
    [ "$code" = "$expected" ] && break
    sleep 1
    attempt=$((attempt + 1))
  done

  if [ "$code" = "$expected" ]; then
    printf '%-28s %s (%s)\n' "$label" "$code" "$url"
    return 0
  fi

  printf '%-28s %s (expected %s) (%s)\n' "$label" "$code" "$expected" "$url" >&2
  status=1
  return 1
}

printf 'prod-smoke: web=%s api=%s admin=%s\n' "$WEB_URL" "$API_URL" "$ADMIN_URL"
printf '\n'

check_http "web-home" "$WEB_URL/" "200"
check_http "web-sitemap" "$WEB_URL/sitemap.xml" "200"

check_http "api-root" "$API_URL/" "200"
check_http "api-status" "$API_URL/v1/status" "200"
check_http "api-articles" "$API_URL/v1/content/articles" "200"
check_http "api-pages" "$API_URL/v1/content/pages" "200"

check_http "admin-home" "$ADMIN_URL/" "200"

if [ -n "$ARTICLE_PATH" ]; then
  case "$ARTICLE_PATH" in
    /*) ;;
    *) ARTICLE_PATH="/$ARTICLE_PATH" ;;
  esac
  check_http "web-article" "$WEB_URL$ARTICLE_PATH" "200"
fi

if [ -n "$PAGE_PATH" ]; then
  case "$PAGE_PATH" in
    /*) ;;
    *) PAGE_PATH="/$PAGE_PATH" ;;
  esac
  check_http "web-page" "$WEB_URL$PAGE_PATH" "200"
fi

if [ "$status" -eq 0 ]; then
  printf '\nprod-smoke: OK\n'
else
  printf '\nprod-smoke: FAILED\n' >&2
fi

exit "$status"

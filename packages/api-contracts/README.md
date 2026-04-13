# `@portfolio/api-contracts`

Canonical API contracts shared across apps and services in this monorepo.

## Purpose

- Keep API request/response shapes in one package.
- Avoid contract drift between `apps/api-portfolio`, `apps/web`, and future `apps/opsdesk`.
- Make portfolio API integrations strongly typed and replaceable.

## Exports

- Root (`@portfolio/api-contracts`)
  - content + HTTP contract exports
- Subpaths
  - `@portfolio/api-contracts/content`
  - `@portfolio/api-contracts/http`

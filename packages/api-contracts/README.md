# @portfolio/api-contracts

Canonical API contracts shared across apps and services in this monorepo.

## Purpose

- Keep API request/response shapes in one package.
- Avoid contract drift between `apps/api`, `apps/web`, and future `apps/admin`.
- Make API gateway integrations strongly typed and replaceable.

## Exports

- Root (`@portfolio/api-contracts`)
  - content + http contract exports
- Subpaths
  - `@portfolio/api-contracts/content`
  - `@portfolio/api-contracts/http`

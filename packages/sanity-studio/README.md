# @portfolio/sanity-studio

Reusable Sanity Studio configuration and schema package for the monorepo.

## Purpose

- Keep Sanity Studio schema and config independent from `apps/web`.
- Allow future apps to embed or host the same Studio config without copy/paste.
- Centralize schema evolution and Studio conventions in one place.

## Exports

- Root (`@portfolio/sanity-studio`)
  - `createSanityStudioConfig(options)`
  - `defaultSanitySchemaTypes`
  - `articleSchema`
- Subpaths
  - `@portfolio/sanity-studio/config/cli` -> `createSanityCliConfig(options)`
  - `@portfolio/sanity-studio/config/studio` -> `createSanityStudioConfig(options)`
  - `@portfolio/sanity-studio/schema-types` -> `defaultSanitySchemaTypes`, `articleSchema`

## Usage

```typescript
import {
  createSanityStudioConfig,
  defaultSanitySchemaTypes,
} from "@portfolio/sanity-studio";
import { createSanityCliConfig } from "@portfolio/sanity-studio/config/cli";
```

<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/utils` Source Guide

Internal source-level documentation for `@portfolio/utils`.

## Source Layout

```bash
packages/utils/
├── src/
│   ├── index.ts                    # Package entrypoint (`export * from "./react"`)
│   ├── test-setup.ts               # Vitest setup and environment helpers
│   └── react/
│       ├── index.ts                # React utility barrel exports
│       ├── bundle.ts               # Bundle and tree-shaking diagnostics
│       ├── component.ts            # Component prop/data-attribute helpers
│       ├── date.ts                 # Safe date formatting helpers
│       ├── image.ts                # Image source validation
│       ├── link.ts                 # Link validation + target/rel defaults
│       ├── navigation.ts           # Navigation item validation/filtering
│       └── __tests__/              # Unit tests per utility domain
```

## Module Responsibilities

### `react/component.ts`

- Content trimming (`trimStringContent`)
- Display-name normalization (`setDisplayName`)
- Data attribute and ARIA helper generation

### `react/link.ts`

- Link validity checks
- External target/rel safety defaults
- Fallback/default link prop normalization

### `react/navigation.ts`

- Type guard helpers for navigation data shape validation
- Filtering helpers for consumer-safe navigation arrays

### `react/image.ts`

- Validation for string URLs and object-based image sources
- Guards against empty/placeholder sources

### `react/date.ts`

- Safe date parsing + formatting with graceful fallback to empty string

### `react/bundle.ts`

- Environment checks (`development`, `production`, `test`)
- Tree-shaking diagnostics and reporting helpers
- Development-only bundle logging helpers

## Testing Strategy

- Domain-specific unit tests under `src/react/__tests__`
- Shared setup through `src/test-setup.ts`
- Execute from repo root:

```bash
pnpm --filter @portfolio/utils test:run
```

## Documentation Sync Rule

When adding or removing utility exports, update in the same change:

1. `src/react/index.ts`
2. `packages/utils/README.md`
3. `packages/utils/src/README.md`
4. Relevant test coverage in `src/react/__tests__`

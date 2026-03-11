<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/ui`

Shared React UI components for the portfolio workspace.

## Features

- Single package entrypoint with explicit exports
- Components tested with Vitest + Testing Library
- TypeScript-first source and build pipeline
- Workspace-integrated linting, formatting, and coverage scripts

## Package Exports

This package currently exports `CounterButton` and `Link` from the root entrypoint.

```typescript
import { CounterButton, Link } from "@portfolio/ui";
```

Subpath imports (for example `@portfolio/ui/counter-button`) are not part of the public API for this package.

## Components

### `CounterButton`

A stateful button component that renders and increments a count value.

```typescript
import { CounterButton } from "@portfolio/ui";

<CounterButton
  label="Counter"
  initialValue={0}
  min={0}
  max={100}
  step={1}
  variant="primary"
  size="medium"
  onCountChange={(nextCount) => {
    console.log(nextCount);
  }}
/>;
```

**Props:**

- `label: string`
- `initialValue: number`
- `min: number`
- `max: number`
- `step: number`
- `variant: "primary" | "secondary"`
- `size: "small" | "medium" | "large"`
- `onCountChange: (count: number) => void`

### `Link`

A thin wrapper around an anchor element with optional new-tab behavior.

```typescript
import { Link } from "@portfolio/ui";

<Link href="https://turbo.build/repo" newTab>
  Turborepo
</Link>;
```

**Props:**

- `href: string`
- `newTab?: boolean`
- All native anchor props (`AnchorHTMLAttributes<HTMLAnchorElement>`)

## Installation

Install the package into a workspace consumer:

```bash
pnpm add @portfolio/ui
```

Or reference it as a workspace package:

```json
{
  "dependencies": {
    "@portfolio/ui": "workspace:*"
  }
}
```

## Development

Run from `packages/ui`:

```bash
pnpm build
pnpm check-types
pnpm lint
pnpm test
pnpm test:run
pnpm test:coverage
```

## Testing

The package test suite covers:

- Rendering and prop behavior
- Interaction behavior (`CounterButton`, `Link` clicks and keyboard use)
- Attribute forwarding and link behavior
- Baseline accessibility checks via role-based queries

Coverage thresholds are configured in `vitest.config.ts`:

- Statements: `80`
- Branches: `75`
- Functions: `80`
- Lines: `80`

## Dependencies

- Runtime dependency: `@portfolio/logger` (workspace)
- Peer dependencies: `react`, `react-dom`

## Contributing

When adding or modifying components in `packages/ui`:

1. Keep exports in `src/index.ts` synchronized with public API changes.
2. Add or update unit tests in the component test files.
3. Keep this README aligned with actual runtime behavior and supported imports.

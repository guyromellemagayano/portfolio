<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/components`

Framework-agnostic React components for the portfolio workspace. The package is intended to work in Astro, React + Vite, and other React-compatible runtimes without depending on Next.js conventions or React Server Component boundaries.

## Contract

- Components render normal React elements synchronously.
- Components forward refs where the underlying element API supports it.
- Components may support an `as` prop when semantic element overrides are useful.
- Consumers import from the root package entrypoint only.
- The package does not expose public subpath imports.
- The package does not require framework-specific hydration flags.

This package is currently being migrated away from an earlier server/client split. During that migration, some implementation details may still reference old client-branch props or internal workspace utilities. Those details are implementation debt and should not be treated as the target public API.

## Installation

Install in a workspace consumer:

```bash
pnpm add @portfolio/components
```

Typical workspace dependency declaration:

```json
{
  "dependencies": {
    "@portfolio/components": "workspace:*"
  }
}
```

## Usage

Import public APIs from the package root:

```tsx
import { Button, Heading, Section } from "@portfolio/components";

export function Hero() {
  return (
    <Section aria-labelledby="hero-title">
      <Heading as="h1" id="hero-title">
        Portfolio
      </Heading>
      <Button type="button">View projects</Button>
    </Section>
  );
}
```

Subpath imports such as `@portfolio/components/button` are not public API.

## Framework Notes

### Astro

Use these components from React-enabled Astro islands or React components rendered by Astro. Prefer native `.astro` components for static page structure when React interactivity is not needed.

### React + Vite

Use the package like any React component library. No framework adapter or hydration-specific prop is required.

### Other React Runtimes

The intended contract is plain React rendering with standard DOM props. Runtime-specific routing, image optimization, data loading, and hydration policies belong in the consuming app.

## Public API Direction

The stable direction is a focused set of useful primitives rather than a package whose main value is wrapping every HTML tag. Existing exports may remain during migration, but new code should prefer components that add meaningful behavior, accessibility, styling, or composition value.

Current API groups:

- `Components`: React components exported from the root barrel.
- `Analytics Utilities`: optional helpers such as `createBatchedOnAnalytics`, `createFetchTransport`, and `createConsoleTransport`.
- `Polymorphic Utilities`: transitional helpers for `as`-based rendering and prop handling.
- `Types`: shared React component types.

Analytics helpers are optional consumer utilities. They should not be understood as automatic behavior for every component unless a component explicitly documents that behavior.

## Migration Notes

The current implementation still contains some legacy RSC-oriented pieces that will be removed in a follow-up slice:

- `isClient` and `isMemoized` component props.
- `.client` component wrappers and lazy client branches.
- `@portfolio/hooks` and `@portfolio/logger` as public dependency pressure.

The target peer dependency contract is `react` and `react-dom` only. Until the implementation is cleaned up, the manifest may still list temporary internal workspace dependencies needed by existing source files.

## Development

Run from `packages/components`:

```bash
pnpm build
pnpm check-types
pnpm lint
pnpm lint:styles
pnpm test
pnpm test:run
pnpm test:coverage
pnpm format:check
```

Recommended package checks before handoff:

```bash
pnpm --filter @portfolio/components check-types
pnpm --filter @portfolio/components lint
pnpm --filter @portfolio/components test:run
pnpm --filter @portfolio/components build
```

## Dependencies

- Target peer dependencies: `react`, `react-dom`.
- Temporary implementation dependencies: `@portfolio/hooks`, `@portfolio/logger`.
- Dev tooling: shared workspace configs, Vitest, Testing Library, TypeScript, and Bunchee.
- Package visibility: currently `"private": true`.

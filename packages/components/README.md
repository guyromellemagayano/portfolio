<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/components`

Framework-agnostic React primitives for the portfolio workspace. The package preserves stable MDN HTML element coverage as unstyled React components for Astro, React + Vite, and other React-compatible runtimes.

## Contract

- Components render normal React elements synchronously.
- Components forward refs where the underlying element API supports it.
- Stable HTML wrappers are generated from a checked-in MDN metadata snapshot.
- Components support an `as` prop for local polymorphism.
- Components include `data-component` and `data-slot="root"` by default while preserving explicit consumer values.
- Consumers import from the root package entrypoint only.
- The package does not expose public subpath imports.
- The package does not require framework-specific hydration flags.
- Deprecated, obsolete, and experimental HTML elements are not exported.

The component implementation follows this contract directly. Future slices should focus on higher-value primitives while keeping the root-only public import surface.

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
      <Heading id="hero-title">Portfolio</Heading>
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

The stable direction is an unstyled HTML foundation plus deliberate convenience primitives that help `@portfolio/ui` build a custom design system.

Current API groups:

- `Stable HTML wrappers`: stable MDN elements such as `A`, `Button`, `Img`, `Table`, `Svg`, and `Math`.
- `Heading`: the single heading primitive for `h1` through `h6`, using `as` for the target heading level.
- `Convenience primitives`: `Box`, `Text`, `Heading`, `VisuallyHidden`, `Field`, `FieldLabel`, `FieldDescription`, and `FieldError`.
- `Types`: shared React primitive types consumed by this package and downstream UI components.

Utility modules should only be exported when the package implementation actively uses them or when they are part of a deliberate, tested public primitive. The package does not expose dormant analytics or polymorphic helper utilities.

Element-specific defaults are intentionally narrow:

- `A` defaults to `href="#"` and adds `noopener noreferrer` for `target="_blank"`.
- `Button` defaults to `type="button"`.
- `Input` defaults to `type="text"`.
- `Img` defaults to `decoding="async"`.

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

- Peer dependencies: `react`, `react-dom`.
- Dev tooling: shared workspace configs, Vitest, Testing Library, TypeScript, and Bunchee.
- Package visibility: currently `"private": true`.

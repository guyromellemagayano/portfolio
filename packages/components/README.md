<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/components`

Shared React HTML-aligned component exports for the monorepo with typed element props, optional client hydration paths, and analytics helpers.

## Features

- 🚀 **Broad Component Surface**: 108 HTML-aligned component exports from one entrypoint
- 🧭 **Typed Common Props**: Shared `CommonComponentProps` across components (`as`, `isClient`, `isMemoized`, `debugId`, `debugMode`)
- 🔁 **Server + Client Branches**: Server-first render with optional lazy client branch and Suspense fallback
- ⚛️ **Ref-Friendly APIs**: Element-specific refs and props via `React.forwardRef`
- 📊 **Analytics Utilities**: Batched analytics handler and transport helpers
- 🧱 **Polymorphic Utilities**: Element config + prop validation/filtering helpers
- ✅ **Package Test Coverage**: Vitest + Testing Library setup with shared thresholds

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

## Export Overview

Public API is the root package entrypoint only.

```typescript
import {
  A,
  Button,
  Div,
  Form,
  Heading,
  Section,
  createBatchedOnAnalytics,
  createConsoleTransport,
  createFetchTransport,
  preparePolymorphicProps,
} from "@portfolio/components";
```

Subpath imports (for example `@portfolio/components/button`) are not part of the public API.

### Export Groups

- `Components`: HTML-aligned component exports from `src/index.ts`
- `Analytics`: `createBatchedOnAnalytics`, `createFetchTransport`, `createConsoleTransport`
- `Polymorphic Helpers`: `preparePolymorphicProps`, `validatePolymorphicProps`, `filterElementSpecificProps`
- `Types + Config Utilities`: `CommonComponentProps`, `PolymorphicComponentProps`, `getElementConfig`, `getElementsByCategory`, `elementSupportsFeature`

## Setup

### 1. Import From the Root Entrypoint

```tsx
import { Button, Heading, Section } from "@portfolio/components";
```

### 2. Use Shared Component Props

Use `as` for semantic overrides and `isClient`/`isMemoized` when you need the lazy client branch.

```tsx
import { Div } from "@portfolio/components";

<Div as="section" isClient isMemoized data-testid="shell">
  Interactive shell
</Div>;
```

### 3. Wire Analytics (Optional)

Use the batched helper and provide your transport:

```ts
import {
  createBatchedOnAnalytics,
  createFetchTransport,
} from "@portfolio/components";

const analytics = createBatchedOnAnalytics({
  transport: createFetchTransport("/api/analytics"),
  bufferSize: 20,
  flushIntervalMs: 2000,
});
```

## Integration Examples

### Semantic Component Usage

```tsx
import { Button, Div, Heading, Section } from "@portfolio/components";

export function Hero() {
  return (
    <Section aria-labelledby="hero-title">
      <Heading as="h1" id="hero-title">
        Portfolio
      </Heading>
      <Div>
        <Button type="button">View projects</Button>
      </Div>
    </Section>
  );
}
```

### Batched Analytics Event Dispatch

```ts
analytics.onAnalytics({
  type: "click",
  name: "hero-cta",
  properties: { section: "hero" },
});
```

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

## Testing

- Default config: `vitest.config.ts` (JSDOM + `src/test-setup.ts`)
- Lightweight config: `vitest.light.config.ts`
- Script-focused config: `vitest.scripts.config.ts`
- Coverage thresholds:
  - Statements: `80`
  - Branches: `75`
  - Functions: `80`
  - Lines: `80`

## Best Practices

### 1. **Use Semantic Defaults First**

- Keep element defaults unless a semantic override is required.
- Use `as` intentionally and keep ARIA relationships explicit at call sites.

### 2. **Prefer Root Imports**

- Import from `@portfolio/components` to keep usage aligned with the package public API.
- Avoid relying on internal file paths.

### 3. **Use Client Branches Deliberately**

- Enable `isClient` only when you need client-side behavior.
- Add `isMemoized` only for proven hot paths.

### 4. **Keep Analytics Transport-Specific**

- Use `createBatchedOnAnalytics` in consumers, not shared component internals.
- Keep transport concerns (`fetch`, beacon, console) at app/package integration boundaries.

## Troubleshooting

### Common Issues

**Cannot resolve `@portfolio/components` exports**

Ensure the dependency is declared in the consumer package and install workspace dependencies:

```bash
pnpm install
```

**Client branch not rendering as expected**

Check that `isClient` is set and verify test behavior with `vitest.config.ts` (JSDOM environment).

**Analytics events not dispatched**

Confirm `createBatchedOnAnalytics` is initialized with a valid `transport` and `onAnalytics` is wired in the consuming code.

## Dependencies

- Peer dependencies: `react`, `react-dom`, `@portfolio/hooks`, `@portfolio/logger`
- Dev dependencies: shared workspace tooling (`@portfolio/config-eslint`, `@portfolio/config-typescript`, `@portfolio/vitest-presets`, `vitest`, `typescript`, `bunchee`, and related test/lint tooling)
- Package visibility: currently `"private": true`

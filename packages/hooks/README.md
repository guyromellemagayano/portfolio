<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/hooks`

Shared React hooks for the portfolio workspace with a focused API for stable component IDs and debug-aware instrumentation.

## Features

- 🚀 **Single Focused Hook**: `useComponentId` for component ID generation + debug mode handling
- 🧭 **Type-Safe API**: Explicit `UseComponentIdOptions` and `UseComponentIdReturn` interfaces
- 🔒 **Data-Attribute Safe IDs**: Sanitizes React `useId()` output for attribute compatibility
- 🪵 **Logger Integration**: Development-only debug logging through `@portfolio/logger`
- 🔁 **Composable Usage**: Works across package and app components with consistent ID patterns

## Exports

Public API from the package root:

```typescript
import {
  useComponentId,
  type UseComponentIdOptions,
  type UseComponentIdReturn,
} from "@portfolio/hooks";
```

## Installation

Install in a workspace consumer:

```bash
pnpm add @portfolio/hooks
```

Typical workspace dependency declaration:

```json
{
  "dependencies": {
    "@portfolio/hooks": "workspace:*"
  }
}
```

## API Reference

### `useComponentId(options?)`

Generates a stable component ID (or uses a provided one) and returns debug mode state.

```typescript
function useComponentId(options?: UseComponentIdOptions): UseComponentIdReturn;
```

### `UseComponentIdOptions`

```typescript
interface UseComponentIdOptions {
  debugId?: string;
  debugMode?: boolean;
}
```

- `debugId`: Optional explicit ID override.
- `debugMode`: Enables debug logging behavior.

### `UseComponentIdReturn`

```typescript
interface UseComponentIdReturn {
  componentId: string;
  isDebugMode: boolean;
}
```

- `componentId`: Final ID used by the component.
- `isDebugMode`: Resolved debug mode flag.

## Setup

### 1. Basic Usage

```tsx
import { useComponentId } from "@portfolio/hooks";

export function Section() {
  const { componentId } = useComponentId();

  return <section data-component-id={componentId}>Content</section>;
}
```

### 2. Debug Override

```tsx
import { useComponentId } from "@portfolio/hooks";

export function Section(props: { debugId?: string; debugMode?: boolean }) {
  const { componentId, isDebugMode } = useComponentId({
    debugId: props.debugId,
    debugMode: props.debugMode,
  });

  return (
    <section
      data-component-id={componentId}
      data-debug-mode={isDebugMode ? "true" : undefined}
    >
      Content
    </section>
  );
}
```

### 3. Stable Custom IDs

```tsx
import { useComponentId } from "@portfolio/hooks";

export function ListItem(props: { id: string }) {
  const { componentId } = useComponentId({ debugId: props.id });

  return <li data-component-id={componentId}>Row</li>;
}
```

## Behavior Notes

- Generated IDs come from React `useId()` and are sanitized to `[a-zA-Z0-9_-]`.
- If `debugId` is provided, it overrides generated ID output.
- Debug logs run only when:
  - `debugMode` is `true`, and
  - `globalThis?.process?.env?.NODE_ENV === "development"`.
- The logger message format is:
  - `<DetectedComponentName> rendered with ID: <componentId>`

## Development

Run from `packages/hooks`:

```bash
pnpm build
pnpm check-types
pnpm lint
pnpm test
pnpm test:run
pnpm test:coverage
pnpm format:check
```

## Testing

This package includes unit tests for:

- Generated ID behavior
- `debugId` override behavior
- Debug mode state behavior
- Return contract stability

## Troubleshooting

### Common Issues

**Using `id` instead of `componentId`**

`useComponentId` returns `componentId`, not `id`.

```tsx
const { componentId } = useComponentId();
```

**Using `internalId` option**

Current API uses `debugId` for explicit ID override.

```tsx
const { componentId } = useComponentId({ debugId: "my-id" });
```

**No debug logs in local environment**

Ensure both conditions are true:

- `debugMode: true`
- `NODE_ENV=development`

## Dependencies

- Runtime dependency: `@portfolio/logger`
- Peer dependencies: `react`, `react-dom`
- Dev dependencies: shared workspace tooling (`@portfolio/config-eslint`, `@portfolio/config-typescript`, `@portfolio/vitest-presets`, `vitest`, `typescript`, and related test/lint tooling)

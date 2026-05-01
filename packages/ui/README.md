<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/ui`

Styled shadcn-inspired React design system components for the portfolio workspace. `@portfolio/ui` composes the unstyled primitives from `@portfolio/components` and owns visual styling, variants, and Radix-backed interaction behavior.

## Features

- Single package entrypoint with explicit exports
- Source-owned shadcn-style components; no `shadcn/ui` runtime dependency
- Tailwind-compatible class variants with `cva` and `cn()`
- Radix-backed interactive primitives through the unified `radix-ui` package
- Field-aware form controls that inherit accessibility ids and state from `Field`
- Button state helpers for icon labels, pending actions, and toggle controls
- Components tested with Vitest + Testing Library
- TypeScript-first source and build pipeline
- Workspace-integrated linting, formatting, and coverage scripts

## Package Exports

This package exports foundational and interactive components from the root entrypoint only.

```typescript
import { Button, Card, Dialog, Field, Input, Link } from "@portfolio/ui";
```

Subpath imports (for example `@portfolio/ui/counter-button`) are not part of the public API for this package.

## Components

### Foundational Components

- `Button`
- `Link`
- `Badge`
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Input`
- `Textarea`
- `Label`
- `Field`, `FieldLabel`, `FieldDescription`, `FieldError`
- `Section`
- `Separator`
- `Skeleton`
- `Alert`, `AlertTitle`, `AlertDescription`
- `Avatar`, `AvatarImage`, `AvatarFallback`
- `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`

```typescript
import { Button, Card, CardContent, CardHeader, CardTitle } from "@portfolio/ui";

<Card>
  <CardHeader>
    <CardTitle>Project</CardTitle>
  </CardHeader>
  <CardContent>
    <Button>View project</Button>
  </CardContent>
</Card>;
```

Button usage keeps action state explicit:

```typescript
import { Button } from "@portfolio/ui";

<Button loading>Saving</Button>;
<Button pressed>Pin</Button>;
<Button aria-label="Open menu" size="icon">
  ...
</Button>;
```

`loading` disables the button and adds `aria-busy` plus `data-loading`. `pressed` maps to `aria-pressed`. Icon-sized buttons require `aria-label` or `aria-labelledby`.

Link usage exposes navigation semantics for styling and measurement:

```typescript
import { Link } from "@portfolio/ui";

<Link href="/work">Work</Link>;
<Link href="https://example.com" newTab>
  External docs
</Link>;
<Link external href="/partners">
  Partner site
</Link>;
```

Absolute web URLs receive `data-external` by default, `external` can override that state, and `newTab` maps to `target="_blank"` plus safe `rel` handling and `data-new-tab`.

Styled components inherit primitive analytics metadata:

```typescript
import { Button } from "@portfolio/ui";

<Button analytics={{ event: "cta_click", placement: "hero" }}>
  Book a call
</Button>;
```

The rendered control receives stable `data-analytics-*` attributes without loading an analytics runtime.

Sections provide styled heading and description structure while preserving the primitive accessibility wiring:

```typescript
import { Section } from "@portfolio/ui";

<Section
  description="Proof points from recent delivery work."
  heading="Selected work"
  id="work"
>
  ...
</Section>;
```

Field controls reduce form boilerplate by inheriting ids and accessibility state from `Field`:

```typescript
import { Field, FieldDescription, FieldError, FieldLabel, Input } from "@portfolio/ui";

<Field id="email" invalid required>
  <FieldLabel>Email</FieldLabel>
  <Input />
  <FieldDescription>Use a work email.</FieldDescription>
  <FieldError>Enter a valid email.</FieldError>
</Field>;
```

`Input`, `Textarea`, and `SelectTrigger` receive the generated control id, invalid/required state, and described-by relationships automatically.

### Interactive Components

- `Dialog`
- `AlertDialog`
- `Tooltip`
- `DropdownMenu`
- `Tabs`
- `Select`
- `Popover`
- `Sheet`

Radix `asChild` composition belongs in this package, not in `@portfolio/components`.

```typescript
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@portfolio/ui";

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogTitle>Dialog title</DialogTitle>
  </DialogContent>
</Dialog>;
```

### Legacy Demo Component

`CounterButton` remains exported for compatibility with existing package tests, but it is not part of the long-term design-system surface.

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
- Interaction behavior for Radix-backed components
- Attribute forwarding, variant classes, and link behavior
- Baseline accessibility checks via role-based queries

Coverage thresholds are configured in `vitest.config.ts`:

- Statements: `80`
- Branches: `75`
- Functions: `80`
- Lines: `80`

## Dependencies

- Runtime dependencies: `@portfolio/components`, `class-variance-authority`, `clsx`, `lucide-react`, `radix-ui`, and `tailwind-merge`
- Peer dependencies: `react`, `react-dom`

## Contributing

When adding or modifying components in `packages/ui`:

1. Keep exports in `src/index.ts` synchronized with public API changes.
2. Add or update unit tests in the component test files.
3. Keep this README aligned with actual runtime behavior and supported imports.

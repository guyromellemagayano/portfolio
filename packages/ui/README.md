<!-- markdownlint-disable -->

# `@portfolio/ui`

Styled shadcn-inspired React design system components for the portfolio workspace. `@portfolio/ui` composes the unstyled primitives from `@portfolio/components` and owns visual styling, variants, and Radix-backed interaction behavior.

## Features

- Single package entrypoint with explicit exports
- Source-owned shadcn-style components; no `shadcn/ui` runtime dependency
- Tailwind-compatible class variants with `cva` and `cn()`
- Radix-backed interactive primitives through the unified `radix-ui` package
- Field-aware form controls that inherit accessibility ids and state from `Field`
- Low-boilerplate generated title, description, footer, and status slots for common component layouts
- Editorial content helpers for prose, code blocks, callouts, figures, timelines, stats, and feature lists
- Search and combobox field helpers with accessible label, description, error, and clear-control wiring
- Empty-state helpers for named fallback regions without repeated heading and description wiring
- Description-list helpers for semantic metadata, specs, and definition groups
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
- `VisuallyHidden`
- `Link`
- `SkipLink`, `SkipLinkTarget`
- `Breadcrumb`, `BreadcrumbTrail`
- `Pagination`, `PaginationControls`
- `Badge`, `BadgeList`, `StatusBadge`
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `InlineCode`, `CodeBlock`, `CodeBlockHeader`, `CodeBlockLanguage`, `CopyButton`
- `Prose`
- `Callout`, `CalloutIcon`, `CalloutTitle`, `CalloutDescription`, `CalloutActions`
- `DescriptionList`, `DescriptionListItem`, `DescriptionTerm`, `DescriptionDetails`
- `Input`, `InputField`
- `Textarea`, `TextareaField`
- `SearchInput`, `SearchField`
- `Combobox`, `ComboboxField`
- `Checkbox`
- `Switch`
- `CheckboxField`
- `SwitchField`
- `RadioGroup`, `RadioGroupItem`, `RadioGroupOption`
- `Label`
- `Form`, `Fieldset`, `Legend`, `FormActions`, `FormStatus`, `FormErrorSummary`
- `Field`, `FieldLabel`, `FieldDescription`, `FieldError`
- `Section`, `SectionHeader`, `SectionEyebrow`, `SectionHeading`, `SectionDescription`, `SectionActions`
- `EmptyState`, `EmptyStateHeader`, `EmptyStateIcon`, `EmptyStateTitle`, `EmptyStateDescription`, `EmptyStateActions`
- `Separator`
- `Skeleton`, `SkeletonText`, `SkeletonCard`
- `LiveRegion`, `StatusMessage`
- `Alert`, `AlertIcon`, `AlertTitle`, `AlertDescription`, `AlertActions`
- `Avatar`, `AvatarImage`, `AvatarFallback`
- `TableContainer`, `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`, `TableEmpty`, `TableLoading`
- `FeatureList`, `FeatureItem`, `FeatureIcon`, `FeatureTitle`, `FeatureDescription`
- `Figure`, `FigureImage`, `FigureCaption`
- `Timeline`, `TimelineItem`, `TimelineMarker`, `TimelineTime`, `TimelineTitle`, `TimelineDescription`
- `StatGroup`, `Stat`, `StatLabel`, `StatValue`, `StatDescription`

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

Common card and alert layouts can generate their semantic substructure:

```typescript
import { Alert, Button, Card } from "@portfolio/ui";

<Card
  description="Launch readiness, quality gates, and support status."
  footer={<Button>Open project</Button>}
  title="Portfolio rebuild"
>
  Delivery notes and next actions.
</Card>;

<Alert
  actions={<Button>Retry</Button>}
  description="The release check failed."
  title="Could not publish"
/>;
```

Button usage keeps action state explicit:

```typescript
import { Button, VisuallyHidden } from "@portfolio/ui";

<Button loading>Saving</Button>;
<Button pressed>Pin</Button>;
<Button aria-label="Open menu" size="icon">
  ...
</Button>;
<Button aria-labelledby="menu-label" size="icon">
  <span aria-hidden="true">...</span>
  <VisuallyHidden id="menu-label">Open menu</VisuallyHidden>
</Button>;
```

`loading` disables the button and adds `aria-busy` plus `data-loading`. `pressed` maps to `aria-pressed`. Icon-sized buttons require `aria-label` or `aria-labelledby`.

Prefer visible text for button names. Use `aria-label` for simple icon-only controls, `aria-labelledby` when another visible or hidden node should name the control, and `VisuallyHidden` when text should remain available to assistive technology without changing the visual layout.

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

Skip links wire keyboard users to the main content target without custom ids or focus attributes:

```typescript
import { SkipLink, SkipLinkTarget } from "@portfolio/ui";

<SkipLink />
<SkipLinkTarget>
  <h1>Home</h1>
  ...
</SkipLinkTarget>;
```

Use `targetId` when a layout has a different target. `SkipLinkTarget` renders a focusable `main` landmark by default.

Description lists render styled native `<dl>`, `<dt>`, and `<dd>` markup for metadata blocks without repeating the term/details structure:

```typescript
import { DescriptionList } from "@portfolio/ui";

<DescriptionList
  aria-label="Project facts"
  items={[
    { term: "Stack", description: "Astro and React" },
    { term: "Status", description: "Live" },
  ]}
  orientation="inline"
/>;
```

Use `DescriptionListItem`, `DescriptionTerm`, and `DescriptionDetails` directly when a definition group needs custom composition or per-item analytics props.

Breadcrumbs provide semantic navigation with an ordered trail and automatic current-page state:

```typescript
import { BreadcrumbTrail } from "@portfolio/ui";

<BreadcrumbTrail
  items={[
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { label: "Portfolio rebuild" },
  ]}
/>;
```

Use `BreadcrumbTrail` for the common route trail. Use `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, and `BreadcrumbSeparator` directly when individual rows need custom labels, separators, or analytics props.

Pagination helpers provide semantic navigation, current-page state, disabled edge controls, and accessible ellipsis text:

```typescript
import { PaginationControls } from "@portfolio/ui";

<PaginationControls
  next={{ href: "/work?page=3" }}
  pages={[
    { href: "/work?page=1", label: "1" },
    { current: true, href: "/work?page=2", label: "2" },
    { type: "ellipsis" },
  ]}
  previous={{ href: "/work?page=1" }}
/>;
```

Use `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, and `PaginationEllipsis` directly when a page needs custom item layout, labels, or analytics props.

Styled components inherit primitive analytics metadata:

```typescript
import { Button } from "@portfolio/ui";

<Button analytics={{ event: "cta_click", placement: "hero" }}>
  Book a call
</Button>;
```

The rendered control receives stable `data-analytics-*` attributes without loading an analytics runtime.

Live regions provide accessible async feedback without repeated ARIA wiring:

```typescript
import { LiveRegion, StatusMessage } from "@portfolio/ui";

<LiveRegion>Saved.</LiveRegion>;
<LiveRegion role="alert" visuallyHidden>
  Failed to save.
</LiveRegion>;
<StatusMessage intent="loading">Saving...</StatusMessage>;
<StatusMessage intent="error">Could not save.</StatusMessage>;
```

`LiveRegion` defaults to `role="status"`, `aria-live="polite"`, and `aria-atomic="true"`. `StatusMessage` switches errors to assertive alert announcements and marks loading messages busy.

Editorial helpers keep content-heavy surfaces semantic without repeated structure:

```typescript
import { Callout, CodeBlock, FeatureList, Figure, Prose, Stat, StatGroup, Timeline, TimelineItem } from "@portfolio/ui";

<Prose as="article" aria-label="Implementation notes">
  <p>Write content with native headings, lists, links, and code.</p>
</Prose>;

<CodeBlock code="pnpm --filter @portfolio/ui test:run:coverage" language="bash" />;

<Callout
  description="Check release health before publishing."
  intent="warning"
  title="Release note"
/>;

<FeatureList
  items={[
    {
      description: "Generated titles, descriptions, icons, and item slots.",
      title: "Low-boilerplate semantics",
    },
  ]}
/>;

<Figure
  alt="Portfolio UI preview"
  caption="A preview of the package surface."
  src="/preview.png"
/>;

<Timeline>
  <TimelineItem
    description="Prepared package release notes."
    time="2026"
    title="Release prep"
  />
</Timeline>;

<StatGroup aria-label="Project stats">
  <Stat description="Production launches" label="Projects" value="12" />
</StatGroup>;
```

Sections provide styled heading and description structure while preserving the primitive accessibility wiring:

```typescript
import { Button, Section } from "@portfolio/ui";

<Section
  actions={<Button>View all</Button>}
  description="Proof points from recent delivery work."
  eyebrow="Case studies"
  heading="Selected work"
  id="work"
>
  ...
</Section>;
```

`Section` wires visible headings and descriptions into `aria-labelledby` and `aria-describedby` by default. Use `eyebrow`, `actions`, and the matching prop bags for common section headers, or compose `SectionHeader`, `SectionHeading`, `SectionDescription`, and `SectionActions` manually when the layout needs custom markup.

Empty states provide named fallback regions with low-boilerplate title, description, icon, and action slots:

```typescript
import { Button, EmptyState } from "@portfolio/ui";

<EmptyState
  actions={<Button>Start project</Button>}
  description="Create the first project when you are ready."
  icon={<span aria-hidden="true">+</span>}
  id="projects-empty"
  title="No projects yet"
/>;
```

Use `EmptyStateHeader`, `EmptyStateIcon`, `EmptyStateTitle`, `EmptyStateDescription`, and `EmptyStateActions` directly when a fallback surface needs custom layout. The generated path wires `aria-labelledby` and `aria-describedby` from the visible title and description.

Table, skeleton, and badge helpers cover common loading and status states:

```typescript
import { BadgeList, SkeletonCard, SkeletonText, StatusBadge, Table, TableBody, TableContainer, TableEmpty, TableLoading } from "@portfolio/ui";

<BadgeList aria-label="Project statuses">
  <StatusBadge status="success">Live</StatusBadge>
  <StatusBadge status="warning">Review</StatusBadge>
</BadgeList>;

<TableContainer>
  <Table>
    <TableBody>
      <TableEmpty colSpan={3}>No projects.</TableEmpty>
      <TableLoading colSpan={3} />
    </TableBody>
  </Table>
</TableContainer>;

<SkeletonText lines={3} />;
<SkeletonCard />;
```

Forms expose styled native grouping semantics for full form flows:

```typescript
import { Button, Fieldset, Form, FormActions, InputField, Legend } from "@portfolio/ui";

<Form aria-label="Contact request">
  <Fieldset>
    <Legend>Project details</Legend>
    <InputField id="budget" label="Budget" required />
  </Fieldset>
  <FormActions>
    <Button>Submit</Button>
  </FormActions>
</Form>;
```

Use `Fieldset` and `Legend` for grouped controls so screen readers receive a native group name without extra ARIA.

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

Use the text field helpers when the common label/control/description/error layout is enough:

```typescript
import { InputField, SelectField, SelectItem, TextareaField } from "@portfolio/ui";

<InputField
  description="Use a work email."
  error="Enter a valid email."
  id="email"
  inputProps={{ type: "email" }}
  label="Email"
  required
/>;

<TextareaField
  description="Share the project context."
  id="message"
  label="Message"
  textareaProps={{ rows: 4 }}
/>;

<SelectField
  description="Choose the work type."
  error="Select one option."
  id="role"
  label="Role"
  placeholder="Choose a role"
  required
>
  <SelectItem value="engineering">Engineering</SelectItem>
</SelectField>;
```

Passing `error` marks the field invalid by default, while `invalid` remains available for explicit state control.

Search and combobox helpers follow the same field contract:

```typescript
import { ComboboxField, FormErrorSummary, FormStatus, SearchField } from "@portfolio/ui";

<FormErrorSummary errors={["Email is required."]} />;
<FormStatus intent="success">Saved.</FormStatus>;

<SearchField
  description="Search by project name or service."
  id="project-search"
  inputProps={{ onClear: () => setQuery(""), value: query }}
  label="Search"
/>;

<ComboboxField
  comboboxProps={{
    onValueChange: setTeam,
    options: [
      { label: "Engineering", value: "engineering" },
      { description: "Design systems and UX delivery.", label: "Design", value: "design" },
    ],
    placeholder: "Choose a team",
    value: team,
  }}
  description="Choose the delivery track."
  id="team"
  label="Team"
/>;
```

`SearchInput` shows its clear button only when there is a value and an `onClear` handler unless `showClear` is explicitly provided. `Combobox` renders a labeled input plus listbox, disabled option state, and an empty result message without requiring consumers to hand-write ARIA attributes.

Choice controls receive the same field state without native-only boilerplate:

```typescript
import {
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  RadioGroup,
  RadioGroupItem,
  Switch,
} from "@portfolio/ui";

<Field id="terms" invalid required>
  <FieldLabel>Accept terms</FieldLabel>
  <Checkbox />
  <FieldDescription>Required before continuing.</FieldDescription>
  <FieldError>Accept the terms to continue.</FieldError>
</Field>;

<Field id="updates" required>
  <FieldLabel>Email updates</FieldLabel>
  <Switch />
  <FieldDescription>Receive product updates.</FieldDescription>
</Field>;

<Field id="plan" required>
  <FieldLabel>Plan</FieldLabel>
  <RadioGroup defaultValue="pro">
    <div>
      <RadioGroupItem id="plan-pro" value="pro" />
      <label htmlFor="plan-pro">Pro</label>
    </div>
  </RadioGroup>
</Field>;
```

`Checkbox`, `Switch`, and `RadioGroup` inherit the field label, description, required state, and invalid state through ARIA attributes while keeping item labels local to each option.

Use the choice field helpers when the common label/control/description layout is enough:

```typescript
import {
  CheckboxField,
  Field,
  FieldDescription,
  FieldLabel,
  RadioGroup,
  RadioGroupOption,
  SwitchField,
} from "@portfolio/ui";

<CheckboxField
  description="Required before continuing."
  error="Accept the terms to continue."
  id="terms"
  label="Accept terms"
  required
/>;

<SwitchField
  description="Receive product updates."
  id="updates"
  label="Email updates"
  required
/>;

<Field id="plan" required>
  <FieldLabel>Plan</FieldLabel>
  <RadioGroup defaultValue="pro">
    <RadioGroupOption
      description="For production teams."
      id="plan-pro"
      label="Pro"
      value="pro"
    />
  </RadioGroup>
  <FieldDescription>Select one plan.</FieldDescription>
</Field>;
```

### Interactive Components

- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`
- `AlertDialog`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`
- `Tooltip`, `TooltipContent`
- `DropdownMenu`, `DropdownMenuItem`, `DropdownMenuShortcut`
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`, `AccordionPanel`
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `TabsPanels`
- `Select`
- `SelectField`
- `Popover`, `PopoverContent`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription`
- `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`
- `ToastProvider`, `ToastViewport`, `Toaster`, `Toast`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`

Radix `asChild` composition belongs in this package, not in `@portfolio/components`.

```typescript
import { Accordion, AccordionPanel } from "@portfolio/ui";

<Accordion collapsible type="single">
  <AccordionPanel
    description="Typical launch windows are planned up front."
    title="Delivery timeline"
    value="timeline"
  >
    Most focused launches take two to four weeks.
  </AccordionPanel>
</Accordion>;
```

Use `AccordionPanel` for common disclosure rows. Use `AccordionItem`, `AccordionTrigger`, and `AccordionContent` directly when the trigger or content layout needs custom composition.

```typescript
import { Dialog, DialogContent, DialogTrigger } from "@portfolio/ui";

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent
    closeLabel="Close profile editor"
    description="Update the account details shown on your public profile."
    footer={<button type="button">Save profile</button>}
    title="Edit profile"
  >
    Profile form fields
  </DialogContent>
</Dialog>;
```

```typescript
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@portfolio/ui";

<AlertDialog>
  <AlertDialogTrigger>Delete project</AlertDialogTrigger>
  <AlertDialogContent
    description="This action permanently removes the selected project."
    footer={
      <>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Delete</AlertDialogAction>
      </>
    }
    title="Delete project"
  />
</AlertDialog>;
```

Prefer `title`, `description`, `closeLabel`, and `footer` on `DialogContent` and `SheetContent` for the common path. Use `title`, `description`, and `footer` on `AlertDialogContent` so confirm flows have an accessible name, description, and action row without repeating header/footer markup. Use `headerProps`, `titleProps`, `descriptionProps`, and `footerProps` when generated slots need custom attributes or classes. Manual composition with `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, and `AlertDialogFooter` remains supported for custom layouts.

Popover, tooltip, tabs, dropdown, and toast helpers keep generated naming and instrumentation close to the component that needs it:

```typescript
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
  PopoverContent,
  TabsPanels,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  Toaster,
  ToastTitle,
  TooltipContent,
} from "@portfolio/ui";

<PopoverContent description="Filter the project list." title="Filters">
  Filter controls
</PopoverContent>;

<TooltipContent label="Copy link" />;

<DropdownMenuItem
  analytics={{ event: "menu_click", placement: "project_menu" }}
  shortcut="P"
>
  Project
</DropdownMenuItem>;
<DropdownMenuItem destructive>
  Delete
  <DropdownMenuShortcut>Del</DropdownMenuShortcut>
</DropdownMenuItem>;

<TabsPanels
  panels={[
    { content: "Overview content", label: "Overview", value: "overview" },
  ]}
/>;

<Toaster>
  <Toast open intent="success">
    <ToastTitle>Saved</ToastTitle>
    <ToastDescription>Profile saved.</ToastDescription>
    <ToastAction altText="Undo save">Undo</ToastAction>
    <ToastClose closeLabel="Dismiss saved message" />
  </Toast>
</Toaster>;
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

- Statements: `85`
- Branches: `85`
- Functions: `85`
- Lines: `85`

## Dependencies

- Runtime dependencies: `@portfolio/components`, `class-variance-authority`, `clsx`, `lucide-react`, `radix-ui`, and `tailwind-merge`
- Peer dependencies: `react`, `react-dom`

## Contributing

When adding or modifying components in `packages/ui`:

1. Keep exports in `src/index.ts` synchronized with public API changes.
2. Add or update unit tests in the component test files.
3. Keep this README aligned with actual runtime behavior and supported imports.

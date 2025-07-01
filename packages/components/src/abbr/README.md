# Abbr Component

Accessible abbreviation component with tooltips and analytics support.

## Features

- Performance optimized with React.memo
- Full ARIA support with proper title attributes
- Analytics tracking with Google Analytics
- Flexible styling with emphasized variant
- TypeScript support with comprehensive types
- Universal rendering for SSR and client-side

## Installation

```bash
pnpm add @packages/components
```

## Usage

```tsx
import { Abbr } from "@packages/components";

// Basic usage
<Abbr title="HyperText Markup Language">HTML</Abbr>

// With custom tooltip
<Abbr 
  title="JavaScript Object Notation"
  tooltip="A lightweight data interchange format"
>
  JSON
</Abbr>

// Emphasized styling
<Abbr title="Application Programming Interface" emphasized>
  API
</Abbr>

// With analytics
<Abbr title="Artificial Intelligence" analyticsId="ai-abbreviation">
  AI
</Abbr>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Full form of the abbreviation |
| `showTooltip` | `boolean` | `true` | Whether to show title as tooltip |
| `tooltip` | `string` | - | Custom tooltip content |
| `emphasized` | `boolean` | `false` | Apply emphasized styling |
| `analyticsId` | `string` | - | Analytics tracking identifier |
| `as` | `React.ElementType` | `"abbr"` | Component to render as |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized component |

## Examples

### Technical Documentation

```tsx
<p>
  Configure your <Abbr title="Application Programming Interface">API</Abbr> 
  endpoints using <Abbr title="JavaScript Object Notation">JSON</Abbr> format.
</p>
```

### Business Content

```tsx
<p>
  Our <Abbr title="Chief Executive Officer" emphasized>CEO</Abbr> 
  announced the new <Abbr title="Quarterly Business Review">QBR</Abbr> schedule.
</p>
```

### Custom Component

```tsx
<Abbr as={CustomElement} title="Cascading Style Sheets">
  CSS
</Abbr>
```

## Styling

```css
.abbr                 /* Base abbreviation styles */
.abbr--emphasized    /* Emphasized variant */
```

## Accessibility

- Proper `<abbr>` element with title attribute
- ARIA label support for screen readers
- Keyboard navigation with focus indicators
- Semantic HTML for assistive technologies

## Testing

```bash
pnpm test
```

## LICENSE

MIT

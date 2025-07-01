# A Component

Accessible anchor component with analytics tracking and multiple variants.

## Features

- Performance optimized with React.memo and hooks
- Full accessibility with ARIA support
- Analytics tracking with Google Analytics
- Multiple variants and customizable styling
- TypeScript support with comprehensive types
- Works in SSR and client-side environments

## Installation

```bash
pnpm add @packages/components
```

## Usage

```tsx
import { A } from "@packages/components";

// Basic usage
<A href="/about">About Us</A>

// With variants
<A href="/contact" variant="primary">Contact</A>

// With analytics
<A href="/signup" analyticsId="signup-link">Sign Up</A>

// With icon
<A href="/download" icon={<DownloadIcon />}>Download</A>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `"#"` | Link destination URL |
| `variant` | `"default" \| "primary" \| "secondary" \| "unstyled"` | `"default"` | Visual style variant |
| `active` | `boolean` | `false` | Whether link is currently active |
| `disabled` | `boolean` | `false` | Whether link is disabled |
| `loading` | `boolean` | `false` | Whether link is in loading state |
| `analyticsId` | `string` | - | Analytics tracking identifier |
| `icon` | `React.ReactNode` | - | Icon to display with link |
| `iconPosition` | `"left" \| "right"` | `"left"` | Icon position relative to text |
| `tooltip` | `string` | - | Tooltip text |
| `confirm` | `string` | - | Confirmation message before navigation |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized component |

## Examples

### Navigation Link

```tsx
<A href="/dashboard" active>Dashboard</A>
```

### External Link with Analytics

```tsx
<A href="https://example.com" analyticsId="external-link">
  Visit Example
</A>
```

### Action Link with Confirmation

```tsx
<A href="/delete" variant="secondary" confirm="Are you sure?">
  Delete Account
</A>
```

## Styling

```css
.a                    /* Base styles */
.a--default          /* Default variant */
.a--primary          /* Primary variant */
.a--secondary        /* Secondary variant */
.a--active           /* Active state */
.a--disabled         /* Disabled state */
.a--loading          /* Loading state */
```

## Accessibility

- Full ARIA support with proper attributes
- Keyboard navigation with Enter and Space
- Screen reader compatibility
- Focus management with visible indicators
- High contrast mode support

## Testing

```bash
pnpm test
```

## LICENSE

MIT

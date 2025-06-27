# A Component

A highly optimized, accessible anchor component with support for analytics, loading states, icons, and more.

## Features

- 🚀 **Performance Optimized**: Uses `useCallback`, `useMemo`, and React.memo for optimal rendering
- ♿ **Accessible**: Full ARIA support, keyboard navigation, and screen reader compatibility
- 📊 **Analytics Ready**: Built-in analytics tracking with Google Analytics support
- 🎨 **Flexible Styling**: Multiple variants and customizable appearance
- 🔒 **Security**: XSS protection and safe href validation
- 🔧 **TypeScript**: Comprehensive type definitions and prop validation
- 📱 **Responsive**: Mobile-first design with responsive breakpoints
- 🌐 **Universal**: Works in both server-side and client-side environments

## Installation

```bash
# Install the components package
pnpm add @packages/components
```

## Usage

```tsx
import { A } from "@packages/components";

// Basic usage
<A href="/about">About Us</A>

// With variants
<A href="/contact" variant="primary">Contact</A>
<A href="/help" variant="secondary">Help</A>

// With icons
<A href="/download" icon={<DownloadIcon />} iconPosition="right">
  Download
</A>

// With loading state
<A href="/api/data" loading>Loading Data</A>

// With analytics
<A href="/signup" analyticsId="signup-link">Sign Up</A>

// With confirmation
<A href="/delete" confirm="Are you sure?">Delete</A>

// With tooltip
<A href="/settings" tooltip="Configure your preferences">Settings</A>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `"#"` | The URL the link points to |
| `variant` | `"default" \| "primary" \| "secondary" \| "unstyled"` | `"default"` | Visual variant of the link |
| `active` | `boolean` | `false` | Whether the link is currently active |
| `disabled` | `boolean` | `false` | Whether the link is disabled |
| `loading` | `boolean` | `false` | Whether the link is in a loading state |
| `analyticsId` | `string` | - | Analytics identifier for tracking |
| `icon` | `React.ReactNode` | - | Icon to display alongside the link text |
| `iconPosition` | `"left" \| "right"` | `"left"` | Position of the icon relative to text |
| `tooltip` | `string` | - | Tooltip text for the link |
| `confirm` | `string` | - | Confirmation message before navigation |
| `prefetch` | `boolean` | `false` | Whether to prefetch the link |
| `isClient` | `boolean` | `false` | Whether to render as client component |
| `isMemoized` | `boolean` | `false` | Whether to use memoized client component |

## Variants

### Default

Standard link with underline on hover.

### Primary

Emphasized link with bold text and primary color.

### Secondary

Subtle link with muted color.

### Unstyled

Plain link without any styling.

## Accessibility

The component includes comprehensive accessibility features:

- **ARIA Attributes**: Proper `aria-disabled`, `aria-current`, `aria-label`, and `aria-describedby`
- **Keyboard Navigation**: Full keyboard support with Enter and Space key handling
- **Focus Management**: Visible focus indicators with `:focus-visible`
- **Screen Reader Support**: Proper semantic markup and ARIA labels
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects `prefers-reduced-motion` preference

## Analytics

The component automatically tracks clicks when `analyticsId` is provided:

```tsx
// Tracks with Google Analytics
<A href="/pricing" analyticsId="pricing-link">View Pricing</A>
```

## Security

- **XSS Protection**: Automatically sanitizes `javascript:` URLs
- **External Links**: Adds `rel="noopener noreferrer"` for external links
- **Safe Hrefs**: Validates and sanitizes href attributes

## Performance

- **Code Splitting**: Client components are lazy-loaded
- **Memoization**: Uses React.memo and useMemo for optimal rendering
- **Event Optimization**: Event handlers are memoized with useCallback
- **Bundle Size**: Minimal impact on bundle size

## Styling

The component uses CSS classes for styling:

```css
.a                    /* Base styles */
.a--default          /* Default variant */
.a--primary          /* Primary variant */
.a--secondary        /* Secondary variant */
.a--unstyled         /* Unstyled variant */
.a--active           /* Active state */
.a--disabled         /* Disabled state */
.a--loading          /* Loading state */
.a--with-icon        /* With icon */
.a--icon-left        /* Icon on left */
.a--icon-right       /* Icon on right */
```

## Examples

### Navigation Link

```tsx
<A href="/dashboard" active>Dashboard</A>
```

### External Link

```tsx
<A href="https://example.com" analyticsId="external-link">
  Visit Example
</A>
```

### Action Link with Confirmation

```tsx
<A 
  href="/delete-account" 
  variant="secondary"
  confirm="This action cannot be undone. Are you sure?"
  analyticsId="delete-account"
>
  Delete Account
</A>
```

### Loading State

```tsx
<A href="/api/data" loading analyticsId="data-load">
  Loading Data...
</A>
```

### Icon Link

```tsx
<A 
  href="/download" 
  icon={<DownloadIcon />} 
  iconPosition="right"
  variant="primary"
>
  Download PDF
</A>
```

## Testing

The component includes comprehensive tests covering:

- Rendering with different props
- Event handling
- Accessibility features
- State management
- Analytics tracking
- Security validation

Run tests with:

```bash
pnpm test
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT

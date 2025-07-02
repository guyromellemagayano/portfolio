# Base Component

HTML base element component for setting document base URL and default target with analytics tracking.

## Features

- Performance optimized with React.memo and hooks
- Proper HTML `<base>` element for document base URL specification
- Analytics tracking with Google Analytics
- Enhanced debugging styles for development
- TypeScript support with comprehensive types
- Universal rendering for SSR and client-side
- Polymorphic rendering support
- Accessibility with focus management for debugging

## Installation

```bash
pnpm add @packages/components
```

## Usage

```tsx
import { Base } from "@packages/components";

// Basic usage - set base URL for all relative links
<Base href="https://example.com/" />

// With target - set default target for all links
<Base href="https://example.com/" target="_blank" />

// With analytics
<Base href="https://example.com/" analyticsId="base-url-change" />

// For debugging (emphasized styling)
<Base href="https://example.com/" emphasized />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | - | The base URL for all relative URLs in the document |
| `target` | `string` | - | Default target for all hyperlinks and forms |
| `emphasized` | `boolean` | `false` | Apply debugging emphasis styling |
| `analyticsId` | `string` | - | Analytics tracking identifier |
| `onAnalytics` | `function` | - | Custom analytics function |
| `as` | `string \| Component` | `"base"` | Element or component to render as |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized component |

## Examples

### Setting Document Base URL

```tsx
<Base href="https://api.example.com/v1/" />
```

Now all relative URLs in the document will be resolved relative to `https://api.example.com/v1/`.

### Setting Default Link Target

```tsx
<Base href="https://example.com/" target="_blank" />
```

All links without an explicit target will open in a new window/tab.

### Development Debugging

```tsx
<Base href="https://example.com/" emphasized />
```

This will make the base element visible for debugging purposes.

### With Custom Analytics

```tsx
<Base
  href="https://api.example.com/"
  onAnalytics={(data) => {
    console.log('Base URL set:', data);
    // Send to custom analytics service
  }}
/>
```

## Important Notes

- The `<base>` element should be placed in the `<head>` of your document
- Only one `<base>` element is allowed per document
- The `<base>` element is a void element and cannot contain children
- Changes to the base URL after page load may not affect already-parsed content

## Styling

```css
.base                    /* Base element (normally hidden) */
.base--emphasized       /* Debugging emphasis styles */
```

## Accessibility

- Maintains semantic meaning of `<base>` element
- Focus indicators for debugging interactions
- High contrast mode compatibility
- Proper ARIA attributes when visible

## Testing

```bash
pnpm test
```

## LICENSE

MIT

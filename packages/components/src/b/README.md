# B Component

Accessible bring attention to (bold) component with analytics tracking and enhanced styling.

## Features

- Performance optimized with React.memo and hooks
- Semantic HTML with proper `<b>` element
- Analytics tracking with Google Analytics
- Enhanced styling with emphasized variant
- TypeScript support with comprehensive types
- Universal rendering for SSR and client-side
- Polymorphic rendering support
- Accessibility with focus management

## Installation

```bash
pnpm add @packages/components
```

## Usage

```tsx
import { B } from "@packages/components";

// Basic usage
<B>Important text</B>

// Emphasized variant
<B emphasized>Very important text</B>

// With analytics
<B analyticsId="cta-emphasis">Click to learn more</B>

// Polymorphic usage
<B as="strong">Semantically strong text</B>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `emphasized` | `boolean` | `false` | Apply extra bold styling |
| `analyticsId` | `string` | - | Analytics tracking identifier |
| `onAnalytics` | `function` | - | Custom analytics function |
| `as` | `string \| Component` | `"b"` | Element or component to render as |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized component |

## Examples

### Text Emphasis

```tsx
<p>
  The meeting is scheduled for <B>tomorrow at 3 PM</B>.
</p>
```

### Call-to-Action Text

```tsx
<B emphasized analyticsId="cta-emphasis">
  Limited time offer!
</B>
```

### Custom Element

```tsx
<B as="strong" className="highlight">
  Important notice
</B>
```

### With Custom Analytics

```tsx
<B
  onAnalytics={(data) => {
    console.log('Emphasis clicked:', data);
    // Send to custom analytics service
  }}
>
  Track this emphasis
</B>
```

## Styling

```css
.b                    /* Base bold styles */
.b--emphasized       /* Enhanced emphasis styles */
```

## Accessibility

- Maintains semantic meaning of `<b>` element
- Keyboard navigation support
- Focus indicators for interactive elements
- High contrast mode compatibility
- Proper ARIA attributes for screen readers

## Testing

```bash
pnpm test
```

## LICENSE

MIT

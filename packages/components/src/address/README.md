# Address Component

Semantic address component with analytics tracking and styling variants.

## Features

- Performance optimized with React.memo
- Proper semantic markup with `<address>` element
- Analytics tracking with Google Analytics
- Flexible styling with block and emphasized variants
- TypeScript support with comprehensive types
- Universal rendering for SSR and client-side

## Installation

```bash
pnpm add @packages/components
```

## Usage

```tsx
import { Address } from "@packages/components";

// Basic usage
<Address>
  123 Main Street<br />
  Anytown, USA 12345
</Address>

// Block display
<Address block>
  Company Name<br />
  123 Business Street<br />
  Suite 456<br />
  Anytown, State 12345
</Address>

// Emphasized styling
<Address emphasized>
  Important Address<br />
  123 Priority Lane<br />
  Urgent City, UC 54321
</Address>

// With analytics
<Address analyticsId="contact-address">
  Our Office<br />
  456 Office Blvd<br />
  Business City, BC 98765
</Address>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `block` | `boolean` | `false` | Display as block with margin |
| `emphasized` | `boolean` | `false` | Apply emphasized styling |
| `analyticsId` | `string` | - | Analytics tracking identifier |
| `onAnalytics` | `function` | - | Custom analytics function |
| `as` | `React.ElementType` | `"address"` | Component to render as |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized component |

## Examples

### Company Address

```tsx
<Address block emphasized>
  <strong>Acme Corporation</strong><br />
  123 Innovation Drive<br />
  Tech Park, Suite 200<br />
  Silicon Valley, CA 94000
</Address>
```

### Contact Information

```tsx
<Address analyticsId="contact-info">
  Customer Service<br />
  456 Help Desk Lane<br />
  Support City, SC 12345<br />
  <a href="tel:+1234567890">Phone: (123) 456-7890</a>
</Address>
```

### Event Venue

```tsx
<Address block>
  Grand Convention Center<br />
  789 Event Plaza<br />
  Conference Room A<br />
  Event City, EC 13579
</Address>
```

## Styling

```css
.address              /* Base address styles */
.address--block      /* Block display variant */
.address--emphasized /* Emphasized variant */
```

## Accessibility

- Semantic `<address>` element
- ARIA support for all standard attributes
- Screen reader friendly markup
- Keyboard navigation support

## Testing

```bash
pnpm test
```

## LICENSE

MIT

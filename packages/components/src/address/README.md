# Address Component

A semantic and accessible address component optimized for performance and analytics tracking.

## Features

- 🚀 **Performance Optimized**: Uses `useCallback`, `useMemo`, and React.memo for optimal rendering
- ♿ **Accessible**: Proper semantic markup with `<address>` element
- 📊 **Analytics Ready**: Built-in analytics tracking with Google Analytics support
- 🎨 **Flexible Styling**: Block and emphasized display options
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

// Complex address with custom markup
<Address block emphasized>
  <strong>Corporate Headquarters</strong><br />
  <span>123 Executive Drive</span><br />
  <span>Executive Suite 100</span><br />
  <span>Business City, State 12345</span><br />
  <span>United States</span>
</Address>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `block` | `boolean` | `false` | Whether to display as a block element with margin |
| `emphasized` | `boolean` | `false` | Whether the address should be emphasized with bold text |
| `analyticsId` | `string` | - | Analytics identifier for tracking |
| `onAnalytics` | `function` | - | Custom analytics function |
| `isClient` | `boolean` | `false` | Whether to render as client component |
| `isMemoized` | `boolean` | `false` | Whether to use memoized client component |
| `as` | `React.ElementType` | `"address"` | Component or element to render as |

## Styling Options

### Default

Standard address formatting with normal font weight.

### Block

Adds block display with bottom margin for spacing.

### Emphasized

Bold text with emphasized color for important addresses.

## Accessibility

The component includes proper accessibility features:

- **Semantic HTML**: Uses the `<address>` element for proper document structure
- **ARIA Support**: Accepts all standard ARIA attributes
- **Screen Reader Friendly**: Proper semantic markup for assistive technologies
- **Keyboard Navigation**: Focusable when needed with proper tabIndex support

## Analytics

The component automatically tracks clicks when `analyticsId` is provided:

```tsx
// Tracks with Google Analytics
<Address analyticsId="headquarters-address">
  Our Headquarters<br />
  123 Business Ave<br />
  Business City, BC 12345
</Address>

// Custom analytics function
<Address 
  onAnalytics={(data) => {
    console.log('Address clicked:', data);
    // Send to your analytics provider
  }}
>
  Contact Address<br />
  456 Contact St<br />
  Contact City, CC 67890
</Address>
```

## Performance

- **Code Splitting**: Client components are lazy-loaded
- **Memoization**: Uses React.memo for optimal rendering
- **Event Optimization**: Event handlers are memoized with useCallback
- **Bundle Size**: Minimal impact on bundle size

## Styling

The component uses CSS classes for styling:

```css
.address                    /* Base styles */
.address--block            /* Block display variant */
.address--emphasized       /* Emphasized variant */
```

### CSS Custom Properties

```css
.address {
  --color-text-emphasis: #1a1a1a;  /* Color for emphasized text */
}
```

## Examples

### Company Address

```tsx
<Address block emphasized>
  <strong>Acme Corporation</strong><br />
  123 Innovation Drive<br />
  Tech Park, Suite 200<br />
  Silicon Valley, CA 94000<br />
  United States
</Address>
```

### Contact Information

```tsx
<Address analyticsId="contact-info">
  Customer Service<br />
  456 Help Desk Lane<br />
  Support City, SC 12345<br />
  <a href="tel:+1234567890">Phone: (123) 456-7890</a><br />
  <a href="mailto:support@company.com">support@company.com</a>
</Address>
```

### Simple Address

```tsx
<Address>
  123 Residential St<br />
  Hometown, HT 56789
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

## Semantic Usage

The `<address>` element should be used for contact information related to:

- **Author/Owner**: Contact info for the page/article author
- **Organization**: Business or organization contact details  
- **Location**: Physical addresses for events, businesses, etc.

**Note**: The `<address>` element should not be used for arbitrary addresses (like mailing addresses in text) unless they represent contact information for the current context.

## Testing

The component includes comprehensive tests covering:

- Rendering with different props
- Event handling
- Accessibility features
- State management
- Analytics tracking
- Client/server rendering

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

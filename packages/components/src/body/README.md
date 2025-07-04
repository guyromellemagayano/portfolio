<!-- markdownlint-disable line-length -->
# Body Component

A universal body component with semantic structure, analytics, and accessibility support. Supports server-side and client-side rendering with polymorphic capabilities.

## Features

- **Semantic HTML**: Renders as `<body>` by default with proper semantic meaning
- **Polymorphic**: Can render as any HTML element using the `as` prop
- **Variants**: Scrollable and background variants for different use cases
- **Analytics**: Built-in analytics tracking with Google Analytics support
- **Accessibility**: Full ARIA support and keyboard navigation
- **Client-side rendering**: Optional client-side rendering with memoization
- **TypeScript**: Fully typed with comprehensive TypeScript support

## Usage

### Basic Usage

```tsx
import { Body } from '@your-org/components';

// Default body element
<Body>Your page content</Body>
```

### With Variants

```tsx
// Non-scrollable body
<Body scrollable={false}>Fixed content</Body>

// Body without background
<Body hasBackground={false}>Transparent body</Body>

// Custom styling
<Body className="custom-body" style={{ backgroundColor: 'blue' }}>
  Custom styled body
</Body>
```

### Polymorphic Rendering

```tsx
// Render as different element
<Body as="div">Div with body semantics</Body>
<Body as="section">Section with body semantics</Body>

// Custom component
const CustomContainer = React.forwardRef<HTMLElement, any>(
  (props, ref) => <div ref={ref} {...props} />
);

<Body as={CustomContainer}>Custom container</Body>
```

### Analytics Integration

```tsx
// With analytics ID
<Body analyticsId="main-body">Tracked body</Body>

// With custom analytics function
<Body 
  analyticsId="main-body"
  onAnalytics={(data) => {
    console.log('Analytics event:', data);
  }}
>
  Custom tracked body
</Body>
```

### Client-side Rendering

```tsx
// Client-side rendering
<Body isClient>Client-side body</Body>

// With memoization
<Body isClient isMemoized>Memoized client body</Body>
```

## Props

### BodyProps

Extends `React.HTMLAttributes<HTMLElement>` and `CommonComponentProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scrollable` | `boolean` | `true` | Whether the body should be scrollable |
| `hasBackground` | `boolean` | `true` | Whether the body should have a background |
| `analyticsId` | `string` | `undefined` | Analytics identifier for tracking |
| `onAnalytics` | `function` | `undefined` | Custom analytics function |
| `as` | `ElementType` | `"body"` | Render as different element |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized client component |

### CommonComponentProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `ElementType` | `"body"` | Render as different element |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized client component |

## CSS Classes

The component uses BEM methodology for CSS classes:

- `.body` - Base body styles
- `.body--scrollable` - Scrollable variant
- `.body--has-background` - Background variant

## Data Attributes

The component automatically adds data attributes for debugging and testing:

- `data-scrollable` - Indicates if body is scrollable
- `data-has-background` - Indicates if body has background
- `data-analytics-id` - Analytics identifier
- `data-polymorphic-element` - Element type when using polymorphic rendering
- `data-element-validation` - Validation warning in development

## Accessibility

- Supports all standard HTML body attributes
- Proper ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- High contrast mode support
- Reduced motion support

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)
- Mobile browsers

## Examples

### Full Page Layout

```tsx
import { Body } from '@your-org/components';

function App() {
  return (
    <Body 
      scrollable={true}
      hasBackground={true}
      analyticsId="app-body"
      className="app-body"
    >
      <header>Header content</header>
      <main>Main content</main>
      <footer>Footer content</footer>
    </Body>
  );
}
```

### Modal Overlay

```tsx
import { Body } from '@your-org/components';

function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  return (
    <Body 
      as="div"
      scrollable={false}
      hasBackground={false}
      className="modal-overlay"
      onClick={handleOverlayClick}
    >
      {children}
    </Body>
  );
}
```

### Analytics Tracking

```tsx
import { Body } from '@your-org/components';

function TrackedPage() {
  const handleAnalytics = (data) => {
    // Custom analytics implementation
    console.log('Body interaction:', data);
  };

  return (
    <Body 
      analyticsId="tracked-page"
      onAnalytics={handleAnalytics}
    >
      Page content with custom tracking
    </Body>
  );
}
```

## Migration Guide

### From Basic HTML Body

```tsx
// Before
<body className="app-body">Content</body>

// After
import { Body } from '@your-org/components';

<Body className="app-body">Content</Body>
```

### From Custom Body Component

```tsx
// Before
<CustomBody scrollable={false}>Content</CustomBody>

// After
<Body scrollable={false}>Content</Body>
```

## Performance

- Server-side rendering by default
- Optional client-side rendering for interactivity
- Memoization support for performance optimization
- Lazy loading of client components
- Minimal bundle size impact

## Testing

The component includes comprehensive tests covering:

- Basic rendering
- Variants and props
- Event handling
- Polymorphic rendering
- Analytics integration
- Client-side rendering
- Edge cases

Run tests with:

```bash
pnpm test src/body/index.test.tsx
```

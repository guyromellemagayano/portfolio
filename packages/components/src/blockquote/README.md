# Blockquote Component

A universal blockquote component with semantic quotation support, polymorphic validation, and proper cite attribution.

## Features

- **Semantic HTML**: Uses proper `<blockquote>` element by default
- **Polymorphic**: Render as any HTML element or custom component via `as` prop
- **Cite Attribution**: Support for the `cite` attribute to specify quote source
- **Client/Server Rendering**: Supports both SSR and client-side rendering
- **Analytics Ready**: Built-in analytics support with tracking capabilities
- **Polymorphic Validation**: Development warnings for invalid element-specific props
- **Type Safe**: Full TypeScript support with proper element typing
- **Accessible**: Follows accessibility best practices

## Basic Usage

```tsx
import { Blockquote } from "@repo/components";

// Basic blockquote
<Blockquote>
  To be or not to be, that is the question.
</Blockquote>

// With citation source
<Blockquote cite="https://example.com/source">
  The quote text from a specific source.
</Blockquote>

// Custom styling
<Blockquote className="my-quote-style">
  Custom styled quote
</Blockquote>
```

## Polymorphic Usage

```tsx
// Render as different element
<Blockquote as="div">
  Quote as div element
</Blockquote>

// Render as custom component
<Blockquote as={MyCustomQuoteComponent}>
  Quote with custom component
</Blockquote>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The quote content |
| `cite` | `string` | - | URL of the quote source |
| `as` | `ElementType` | `"blockquote"` | Element or component to render as |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized client component |
| `analyticsId` | `string` | - | Analytics tracking identifier |
| `onAnalytics` | `function` | - | Custom analytics callback |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles |

## Client-Side Rendering

```tsx
// Enable client rendering
<Blockquote isClient>
  Client-rendered quote
</Blockquote>

// With memoization for performance
<Blockquote isClient isMemoized>
  Memoized client quote
</Blockquote>
```

## Analytics

```tsx
// Basic analytics tracking
<Blockquote analyticsId="hero-quote">
  Tracked quote
</Blockquote>

// Custom analytics handler
<Blockquote onAnalytics={(data) => myAnalytics.track(data)}>
  Custom analytics quote
</Blockquote>
```

## Polymorphic Validation

The component includes runtime validation in development to help prevent invalid HTML:

```tsx
// ⚠️ This will show a warning in development
<Blockquote as="div" cite="https://example.com">
  Invalid: cite attribute only valid on blockquote elements
</Blockquote>

// ✅ This is valid
<Blockquote cite="https://example.com">
  Valid: cite attribute on blockquote element
</Blockquote>
```

## Accessibility

- Uses semantic `<blockquote>` element for screen readers
- Supports all standard ARIA attributes
- Proper focus management with keyboard navigation
- Quote marks added via CSS for visual users

## Styling

The component includes default styles that can be customized:

```css
.blockquote {
  margin: 1em 40px;
  padding: 0.5em 1em;
  border-left: 4px solid #ddd;
  font-style: italic;
  background-color: #f9f9f9;
  color: #555;
}
```

## Examples

### Literary Quote

```tsx
<Blockquote cite="https://shakespeare.org/hamlet">
  To be or not to be, that is the question:
  Whether 'tis nobler in the mind to suffer
  The slings and arrows of outrageous fortune...
</Blockquote>
```

### Pull Quote

```tsx
<Blockquote as="aside" className="pull-quote">
  This quote stands out from the main content
</Blockquote>
```

### Testimonial

```tsx
<Blockquote className="testimonial">
  This product changed our business completely!
</Blockquote>
```

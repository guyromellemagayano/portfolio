# Abbr Component

Universal abbreviation component with variants, analytics, and accessibility. Supports server-side and client-side rendering.

## Features

- 🚀 **Performance Optimized**: Uses `useCallback` and React.memo for optimal rendering
- ♿ **Accessible**: Full ARIA support with proper title and label attributes
- 📊 **Analytics Ready**: Built-in analytics tracking with Google Analytics support
- 🎨 **Flexible Styling**: Emphasized variant and customizable appearance
- 🔧 **TypeScript**: Comprehensive type definitions and prop validation
- 📱 **Responsive**: Mobile-first design with responsive breakpoints  
- 🌐 **Universal**: Works in both server-side and client-side environments

## Installation

```bash
# Install the components package
pnpm add @packages/components
```

## Basic Usage

```tsx
import { Abbr } from "@packages/components";

function Example() {
  return (
    <p>
      We use <Abbr title="HyperText Markup Language">HTML</Abbr> to structure our web pages.
    </p>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | The full form or expansion of the abbreviation |
| `showTooltip` | `boolean` | `true` | Whether to show the title as a tooltip |
| `tooltip` | `string` | - | Custom tooltip content (overrides title) |
| `emphasized` | `boolean` | `false` | Whether the abbreviation should be emphasized |
| `analyticsId` | `string` | - | Analytics identifier for tracking |
| `as` | `React.ElementType` | `"abbr"` | Custom component to render |
| `isClient` | `boolean` | `false` | Whether to use client-side rendering |
| `isMemoized` | `boolean` | `false` | Whether to use memoized client component |

Extends all standard HTML abbreviation attributes.

## Examples

### Basic Abbreviation

```tsx
<Abbr title="World Health Organization">WHO</Abbr>
```

### Custom Tooltip

```tsx
<Abbr 
  title="JavaScript Object Notation"
  tooltip="A lightweight data interchange format"
>
  JSON
</Abbr>
```

### Emphasized Abbreviation

```tsx
<Abbr 
  title="Application Programming Interface"
  emphasized
>
  API
</Abbr>
```

### With Analytics

```tsx
<Abbr 
  title="Artificial Intelligence"
  analyticsId="ai-abbreviation"
>
  AI
</Abbr>
```

### Client-Side Rendering

```tsx
<Abbr 
  title="React Server Components"
  isClient
>
  RSC
</Abbr>
```

### Custom Component

```tsx
const CustomAbbr = styled.abbr`
  border-bottom: 1px dotted;
  text-decoration: none;
`;

<Abbr 
  as={CustomAbbr}
  title="Cascading Style Sheets"
>
  CSS
</Abbr>
```

### Without Tooltip

```tsx
<Abbr 
  title="Graphics Interchange Format"
  showTooltip={false}
>
  GIF
</Abbr>
```

## Styling

### CSS Classes

- `.abbr` - Base abbreviation styles
- `.abbr--emphasized` - Applied when `emphasized={true}`

### CSS Custom Properties

```css
.abbr {
  /* Base styles */
  border-bottom: 1px dotted currentColor;
  text-decoration: none;
  cursor: help;
}

.abbr--emphasized {
  /* Emphasized styles */
  font-weight: bold;
  color: var(--abbr-emphasized-color, #0066cc);
}
```

### Example CSS

```css
/* Custom abbreviation styles */
.abbr {
  border-bottom: 1px dotted #666;
  text-decoration: none;
  cursor: help;
  transition: border-color 0.2s ease;
}

.abbr:hover,
.abbr:focus {
  border-color: #333;
}

.abbr--emphasized {
  font-weight: 600;
  color: #0066cc;
  border-bottom-style: solid;
}
```

## Accessibility

The component automatically handles accessibility features:

- **Title Attribute**: Provides the full expansion
- **ARIA Label**: Uses title or custom tooltip for screen readers
- **Keyboard Navigation**: Focusable and supports keyboard interaction
- **Semantic HTML**: Uses proper `<abbr>` element

## Analytics

When `analyticsId` is provided, the component tracks:

- Click events on abbreviations
- Abbreviation text and expanded text
- Custom event category for filtering

Example analytics event:

```javascript
gtag('event', 'click', {
  event_category: 'abbreviation',
  event_label: 'html-abbr',
  abbreviation_text: 'HTML',
  expanded_text: 'HyperText Markup Language'
});
```

## Performance

The component is optimized for performance:

- **Conditional Event Handlers**: Click handlers are only created when analytics are needed
- **Callback Optimization**: Analytics event handlers use `useCallback` for stability
- **Efficient Class Building**: Direct string concatenation instead of array operations
- **Lazy Analytics**: Analytics functions are only invoked when required
- **Minimal Re-renders**: Optimized prop spreading and conditional logic
- **Optional Memoization**: `MemoizedAbbr` available for high-frequency re-render scenarios

### When to Use Memoization

```tsx
// Default - sufficient for most use cases
import { Abbr } from "@packages/components";

// Memoized - use when parent re-renders frequently with same props
import { MemoizedAbbr } from "@packages/components";

function FrequentlyUpdatingParent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      {/* This won't re-render unnecessarily */}
      <MemoizedAbbr title="HyperText Markup Language">HTML</MemoizedAbbr>
    </div>
  );
}
```

## TypeScript

Full TypeScript support with comprehensive type definitions:

```tsx
import type { AbbrProps, AbbrRef } from "@packages/components";

const MyAbbr: React.FC<AbbrProps> = (props) => {
  return <Abbr {...props} />;
};

// With ref
const AbbrWithRef = React.forwardRef<AbbrRef, AbbrProps>((props, ref) => {
  return <Abbr ref={ref} {...props} />;
});
```

## Best Practices

1. **Always provide a title**: Include the full expansion of the abbreviation
2. **Use meaningful abbreviations**: Only abbreviate commonly understood terms
3. **Consider context**: Some abbreviations may not need explanation in technical documentation
4. **Test with screen readers**: Ensure the expanded text is properly announced
5. **Use analytics**: Track which abbreviations users interact with most

## Common Use Cases

### Technical Documentation

```tsx
<p>
  Configure your <Abbr title="Application Programming Interface">API</Abbr> 
  endpoints using <Abbr title="JavaScript Object Notation">JSON</Abbr> format.
</p>
```

### Medical/Scientific Content

```tsx
<p>
  The <Abbr title="World Health Organization" emphasized>WHO</Abbr> 
  recommends <Abbr title="Deoxyribonucleic Acid">DNA</Abbr> testing.
</p>
```

### Business Content

```tsx
<p>
  Our <Abbr title="Chief Executive Officer">CEO</Abbr> announced the new 
  <Abbr title="Quarterly Business Review">QBR</Abbr> schedule.
</p>
```

## Migration from HTML

Replace standard `<abbr>` elements:

```tsx
// Before
<abbr title="HyperText Markup Language">HTML</abbr>

// After  
<Abbr title="HyperText Markup Language">HTML</Abbr>
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

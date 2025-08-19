<!-- markdownlint-disable line-length -->
# Card Component

A comprehensive card component system that provides a flexible and accessible way to display content in card-like formats. The Card component follows the established patterns from Footer, Header, and Container components with full `useComponentId` integration, debug attributes, and comprehensive testing.

## Features

- **`useComponentId` Integration**: Automatic component ID generation and debug logging from `@guyromellemagayano/hooks`
- **Debug Attributes**: `data-card-*` attributes and `data-debug-mode` for development
- **Test Identifiers**: Consistent `data-testid` attributes for testing
- **Internal Props Pattern**: `_internalId` and `_debugMode` props for advanced usage
- **Component Pattern Alignment**: Follows the same internal/external component pattern as Footer, Header, and Container
- **Compound Component API**: Modular sub-components that can be used independently or together
- **TypeScript Support**: Full type safety with proper prop interfaces
- **Accessibility**: Semantic HTML structure and ARIA support
- **CSS Modules**: Consolidated styling with proper class name handling
- **Comprehensive Testing**: 99.64% code coverage with 42 test cases
- **Automatic DisplayName Management**: Uses `setDisplayName` utility for consistent component names

## Usage

### Basic Card

```typescript
import { Card } from "@web/components/card";

<Card>
  <span>Card content</span>
</Card>
```

### Complete Card Example

```typescript
import { Card } from "@web/components/card";

<Card>
  <Card.Eyebrow decorate>January 2024</Card.Eyebrow>
  <Card.Title href="/article">Article Title</Card.Title>
  <Card.Description>Article description goes here</Card.Description>
  <Card.Cta href="/article">Read more</Card.Cta>
</Card>
```

### With Debug Mode and Internal ID

```typescript
<Card _debugMode={true} _internalId="custom-card-id">
  <Card.Title _debugMode={true}>Title</Card.Title>
  <Card.Description>Description</Card.Description>
</Card>
```

### Individual Card Components

```typescript
import { 
  CardTitle, 
  CardLink, 
  CardDescription, 
  CardCta, 
  CardEyebrow 
} from "@web/components/card";

// Title with optional link
<CardTitle href="/link" target="_blank">Card Title</CardTitle>

// Standalone link
<CardLink href="/link">Link Content</CardLink>

// Description
<CardDescription>Card description text</CardDescription>

// Call to action
<CardCta href="/cta">Call to Action</CardCta>

// Eyebrow with decoration
<CardEyebrow decorate>Eyebrow text</CardEyebrow>
```

## Props

### Card Props

Extends `ArticleProps` and `CommonWebAppComponentProps`:

- **`_internalId`**: Override the auto-generated component ID
- **`_debugMode`**: Enable debug logging and attributes
- **`children`**: Card content
- **`className`**: Additional CSS classes
- **All standard Article props**: `id`, `aria-*`, etc.

### CardTitle Props

Extends `HeadingProps` and `CommonWebAppComponentProps`:

- **`href`**: Optional link URL (defaults to "#")
- **`target`**: Link target (defaults to "_self")
- **`title`**: Link title attribute
- **`_internalId`**: Override the auto-generated component ID
- **`_debugMode`**: Enable debug logging and attributes
- **`children`**: Title content (required for rendering)
- **`className`**: Additional CSS classes

### CardLink Props

Extends `HeadingProps` and `CommonWebAppComponentProps`:

- **`href`**: Optional link URL
- **`target`**: Link target (defaults to "_self")
- **`title`**: Link title attribute
- **`as`**: Heading level (defaults to "h2")
- **`_internalId`**: Override the auto-generated component ID
- **`_debugMode`**: Enable debug logging and attributes
- **`children`**: Link content (required for rendering)
- **`className`**: Additional CSS classes

### CardDescription Props

Extends `PProps` and `CommonWebAppComponentProps`:

- **`_internalId`**: Override the auto-generated component ID
- **`_debugMode`**: Enable debug logging and attributes
- **`children`**: Description content (required for rendering)
- **`className`**: Additional CSS classes

### CardCta Props

Extends `DivProps` and `CommonWebAppComponentProps`:

- **`href`**: Optional link URL
- **`target`**: Link target (defaults to "_self")
- **`title`**: Link title attribute
- **`_internalId`**: Override the auto-generated component ID
- **`_debugMode`**: Enable debug logging and attributes
- **`children`**: CTA content (required for rendering)
- **`className`**: Additional CSS classes

### CardEyebrow Props

Extends `TimeProps` and `CommonWebAppComponentProps`:

- **`decorate`**: Whether to add decorative line (defaults to false)
- **`_internalId`**: Override the auto-generated component ID
- **`_debugMode`**: Enable debug logging and attributes
- **`children`**: Eyebrow content (required for rendering)
- **`className`**: Additional CSS classes

## Rendered Data Attributes

### Card

- `data-card-id`: Component ID (auto-generated or custom)
- `data-debug-mode`: "true" when debug mode is enabled
- `data-testid="card-root"`: Test identifier

### CardTitle

- `data-card-title-id`: Component ID (auto-generated or custom)
- `data-debug-mode`: "true" when debug mode is enabled
- `data-testid="card-title-root"`: Test identifier

### CardLink

- `data-card-link-id`: Component ID (auto-generated or custom)
- `data-debug-mode`: "true" when debug mode is enabled
- `data-testid="card-link-root"`: Test identifier

### CardDescription

- `data-card-description-id`: Component ID (auto-generated or custom)
- `data-debug-mode`: "true" when debug mode is enabled
- `data-testid="card-description-root"`: Test identifier

### CardCta

- `data-card-cta-id`: Component ID (auto-generated or custom)
- `data-debug-mode`: "true" when debug mode is enabled
- `data-testid="card-cta-root"`: Test identifier

### CardEyebrow

- `data-card-eyebrow-id`: Component ID (auto-generated or custom)
- `data-debug-mode`: "true" when debug mode is enabled
- `data-testid="card-eyebrow-root"`: Test identifier

## CSS Module Structure

The Card component uses a single consolidated CSS module for all styling:

- **`Card.module.css`**: All card component styles including:
  - Main card styles
  - Title component styles
  - Link component styles with hover effects
  - Description component styles
  - Call-to-action component styles
  - Eyebrow component styles with decoration

## Implementation Details

The Card component follows the internal/external component pattern established in the codebase:

### Internal Components

- `InternalCardEyebrow`: Handles rendering and applies debug/test attributes
- `InternalCardLink`: Handles rendering and applies debug/test attributes
- `InternalCardTitle`: Handles rendering and applies debug/test attributes
- `InternalCardDescription`: Handles rendering and applies debug/test attributes
- `InternalCardCta`: Handles rendering and applies debug/test attributes

### Public Components

- `CardEyebrow`: Integrates `useComponentId` and passes internal props
- `CardLink`: Integrates `useComponentId` and passes internal props
- `CardTitle`: Integrates `useComponentId` and passes internal props
- `CardDescription`: Integrates `useComponentId` and passes internal props
- `CardCta`: Integrates `useComponentId` and passes internal props
- `Card`: Main card component with compound component exports

### Automatic DisplayName Management

The Card component uses the `setDisplayName` utility from `@guyromellemagayano/hooks` to automatically set `displayName` based on the function name:

```typescript
export const CardTitle = setDisplayName(
  React.forwardRef(function CardTitle(props, ref) {
    // Component implementation
  }),
  "CardTitle"
) as CardTitleComponent;
```

This eliminates the need to manually set `displayName` when it matches the function name, ensuring consistency between function names and React DevTools display names.

### Compound Component Pattern

```typescript
Card.Link = CardLink;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Cta = CardCta;
Card.Eyebrow = CardEyebrow;
```

### Conditional Rendering

All Card sub-components implement conditional rendering based on children:

```typescript
if (!children) return null;
```

This ensures components only render when they have meaningful content, improving performance and preventing empty DOM elements.

## Testing

The Card component has comprehensive test coverage (99.64%) with 42 test cases covering:

- **Main `Card` Component**: Children rendering, props, ref forwarding, debug attributes, internal ID
- **`CardTitle` Component**: Title rendering, link integration, props, debug attributes, conditional rendering
- **`CardLink` Component**: Link rendering, conditional link behavior, props, debug attributes
- **`CardDescription` Component**: Description rendering, props, debug attributes, conditional rendering
- **`CardCta` Component**: CTA rendering, link integration, icon display, props, debug attributes
- **`CardEyebrow` Component**: Eyebrow rendering, decoration, props, debug attributes, conditional rendering
- **Integration Tests**: Component composition, complex nested content, multiple children
- **Error Handling**: Empty, undefined, boolean, and number children
- **Accessibility**: Semantic HTML structure, ARIA attributes
- **CSS Module Integration**: Class application and combination
- **Performance**: Efficient rendering with many components

### Test Structure

```typescript
describe("Card Component", () => {
  describe("Main Card Component", () => {
    // Main card tests
  });
  
  describe("CardTitle Component", () => {
    // Title component tests
  });
  
  // ... other component tests
  
  describe("Integration Tests", () => {
    // Integration tests
  });
  
  describe("Error Handling", () => {
    // Error handling tests
  });
  
  describe("Accessibility", () => {
    // Accessibility tests
  });
  
  describe("CSS Module Integration", () => {
    // CSS module tests
  });
  
  describe("Performance", () => {
    // Performance tests
  });
});
```

## File Structure

```text
src/components/card/
├── Card.tsx                 # Main component with all sub-components and types
├── Card.test.tsx           # Comprehensive test suite
├── Card.module.css         # Consolidated styles for all components
├── index.ts                # Export file
└── README.md               # This documentation
```

## Dependencies

- **`@guyromellemagayano/hooks`**: For `useComponentId` and `setDisplayName` utilities
- **`@guyromellemagayano/components`**: For React HTML components (Article, Time, Heading, P, Div, Span, Link)
- **`@web/lib`**: For `cn` utility function
- **`@web/@types/components`**: For `CommonWebAppComponentProps` type

## Performance Considerations

- Components use `React.forwardRef` for optimal ref handling
- Conditional rendering prevents unnecessary DOM elements
- CSS modules provide scoped styling without conflicts
- Efficient prop spreading and destructuring
- Minimal re-renders with proper prop handling
- Consolidated CSS module reduces bundle size

## Browser Support

The Card component supports all modern browsers and includes:

- Semantic HTML5 elements (`<article>`, `<time>`, etc.)
- CSS Grid and Flexbox for layout
- CSS custom properties for theming
- Progressive enhancement for older browsers

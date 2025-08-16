<!-- markdownlint-disable line-length -->
# Container Component

A comprehensive layout container system featuring a main `Container` component with nested `ContainerOuter` and `ContainerInner` components, following our established development standards.

## 📁 File Structure

```bash
container/
├── Container.tsx        # Main container component with nested structure
├── Container.module.css # CSS modules for styling
├── Container.test.tsx   # Comprehensive test suite using Vitest
├── index.ts            # Component exports
└── README.md           # This documentation
```

## 🏗️ Architecture

This component follows the **"inline types for all components"** pattern and uses a **nested component structure** for consistent layout and styling. For detailed information about these architectural patterns, see the [Component Architecture Patterns](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#component-architecture-patterns) section in the Development Optimization Guide.

## 🚀 Features

- **Main Container Component**: Composes `ContainerOuter` and `ContainerInner`
- **ContainerOuter Component**: Outer layout wrapper with responsive behavior
- **ContainerInner Component**: Inner content wrapper with `max-width` constraints
- **Ref Forwarding**: Supports `React.forwardRef` for proper ref handling
- **CSS Modules**: Scoped styling with **Tailwind CSS** integration
- **Type Safe**: Full **TypeScript** support with proper type inference
- **Flexible Styling**: Accepts all standard div `props` and `className`
- **Conditional Rendering**: Gracefully handles `null`/`undefined`, children

## 📖 Usage

### Main Container Component

```typescript
import { Container } from '@/components/container'
import { Heading, Paragraph } from '@guyromellemagayano/components'

function MyPage() {
  return (
    <Container>
      <Heading as="h1">Page Title</Heading>
      <Paragraph>Page content goes here...</Paragraph>
    </Container>
  )
}
```

### Individual Container Components

```typescript
import { ContainerOuter, ContainerInner } from '@/components/container'
import { Div } from '@guyromellemagayano/components'

function MyLayout() {
  return (
    <ContainerOuter className="bg-gray-100">
      <ContainerInner className="py-8">
        <Div>Custom layout content</Div>
      </ContainerInner>
    </ContainerOuter>
  )
}
```

### With Custom Styling

```typescript
import { Container } from '@/components/container'
import { Header, Main, Heading, Paragraph } from '@guyromellemagayano/components'

function MyComponent() {
  return (
    <Container 
      className="bg-white shadow-lg rounded-lg"
      id="main-content"
    >
      <Header className="border-b pb-4">
        <Heading as="h1">Section Title</Heading>
      </Header>
      <Main className="py-6">
        <Paragraph>Main content area</Paragraph>
      </Main>
    </Container>
  )
}
```

### With ARIA Attributes

```typescript
import { Container } from '@/components/container'
import { Article, Heading, Paragraph } from '@guyromellemagayano/components'

function MyComponent() {
  return (
    <Container 
      role="main"
      aria-label="Main content area"
      className="min-h-screen"
    >
      <Article>
        <Heading as="h1">Article Title</Heading>
        <Paragraph>Article content...</Paragraph>
      </Article>
    </Container>
  )
}
```

### Complex Nested Content

```typescript
import { Container } from '@/components/container'
import { Div, Heading, Paragraph } from '@guyromellemagayano/components'

function MyComponent() {
  return (
    <Container>
      <Div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Div>
          <Heading as="h2">Left Column</Heading>
          <Paragraph>Content for left column...</Paragraph>
        </Div>
        <Div>
          <Heading as="h2">Right Column</Heading>
          <Paragraph>Content for right column...</Paragraph>
        </Div>
      </Div>
    </Container>
  )
}
```

## 🔧 Props

### Public Props

- `children?: ReactNode` - Content to render inside the container
- `className?: string` - CSS classes for styling
- `...rest` - All standard HTML div attributes

### Internal Props (Not for External Use)

- `_internalId?: string` - Override generated ID for debugging (inherited from CommonWebAppComponentProps)
- `_debugMode?: boolean` - Enable debug logging in development (inherited from CommonWebAppComponentProps)

## 🎨 Styling

The components use CSS modules with Tailwind CSS integration:

### CSS Module Structure

```css
/* Container.module.css */
@reference "tailwindcss";

.containerOuter {
  @apply w-full;
}

.containerOuterContent {
  @apply mx-auto px-4 sm:px-6 lg:px-8;
}

.containerInner {
  @apply max-w-7xl mx-auto;
}

.containerInnerContent {
  @apply w-full;
}
```

### Styling Examples

```typescript
// Tailwind CSS classes
<Container className="bg-gray-50 min-h-screen">
  <div className="text-center py-12">
    <h1>Centered Content</h1>
  </div>
</Container>

// Custom CSS modules
<Container className="custom-container">
  <div className="custom-content">
    <p>Custom styled content</p>
  </div>
</Container>

// Responsive design
<Container className="px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto">
    <h1>Responsive Container</h1>
  </div>
</Container>
```

## 🔒 Security & Type Safety

This component follows security best practices by using inline types and hiding internal implementation details. For detailed information about security patterns and type safety, see the [Security & Type Safety](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-security--type-safety) section in the Development Optimization Guide.

## 🔧 Implementation Details

### Component Structure

```typescript
// Container.tsx - Main implementation
export const Container = React.forwardRef<ContainerRef, ContainerProps>(
  function Container(props, ref) {
    const { children, _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    if (!children) return null;

    const element = (
      <ContainerOuter
        {...rest}
        ref={ref}
        data-container-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
      >
        <ContainerInner>{children}</ContainerInner>
      </ContainerOuter>
    );

    return element;
  }
);
```

### CSS Module Structure

```css
/* Container.module.css - Scoped styling */
@reference "tailwindcss";

.containerOuter {
  @apply w-full;
}

.containerOuterContent {
  @apply mx-auto px-4 sm:px-6 lg:px-8;
}

.containerInner {
  @apply max-w-7xl mx-auto;
}

.containerInnerContent {
  @apply w-full;
}
```

## 🧪 Testing

Comprehensive test coverage in `Container.test.tsx`:

- **Main Container Component**: Rendering, ref forwarding, props handling
- **ContainerOuter Component**: Individual outer container functionality
- **ContainerInner Component**: Individual inner container functionality
- **Integration**: Real-world usage patterns with nested content
- **Error Handling**: Graceful handling of `null`/`undefined` children
- **Accessibility**: Proper ARIA attributes and semantic structure
- **Styling**: CSS classes and responsive behavior

## 📚 Related Documentation

- [Development Optimization Guide](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md)
- [Component Architecture Patterns](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#component-architecture-patterns)
- [Security & Type Safety](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-security--type-safety)
- [Testing with Vitest](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-testing-with-vitest)

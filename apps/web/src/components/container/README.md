<!-- markdownlint-disable line-length -->
# Container Component

A comprehensive layout container system featuring a main `Container` component with nested `ContainerOuter` and `ContainerInner` components. This component implements advanced features including `useComponentId` integration, debug attributes, and follows our established development standards with full alignment to Footer and Header component patterns.

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

- **Main Container Component**: Composes `ContainerOuter` and `ContainerInner` with internal/external pattern
- **ContainerOuter Component**: Outer layout wrapper with responsive behavior and debug integration
- **ContainerInner Component**: Inner content wrapper with `max-width` constraints and debug integration
- **useComponentId Integration**: Automatic ID generation and debug logging across all components
- **Debug Attributes**: `data-container-*-id` and `data-debug-mode` attributes for development debugging
- **Test Identifiers**: `data-testid` attributes for reliable testing (`container-outer-root`, `container-inner-root`)
- **Internal Props Pattern**: Support for `_internalId` and `_debugMode` props following established patterns
- **Ref Forwarding**: Supports `React.forwardRef` for proper ref handling across all component levels
- **CSS Modules**: Scoped styling with **Tailwind CSS** integration
- **Type Safe**: Full **TypeScript** support with proper type inference and internal prop interfaces
- **Flexible Styling**: Accepts all standard div `props` and `className`
- **Conditional Rendering**: Gracefully handles null/undefined children
- **Component Pattern Alignment**: Follows the same high-quality patterns as Footer and Header components

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

### With Debug Mode and Internal ID

```typescript
import { Container } from '@/components/container'
import { Div, Heading, Paragraph } from '@guyromellemagayano/components'

function MyComponent() {
  return (
    <Container 
      _internalId="custom-container-id"
      _debugMode={true}
      className="bg-white"
    >
      <Div>
        <Heading as="h1">Debug-enabled Container</Heading>
        <Paragraph>This container will have debug logging enabled</Paragraph>
      </Div>
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
    <ContainerOuter 
      className="bg-gray-100"
      _debugMode={true}
    >
      <ContainerInner 
        className="py-8"
        _internalId="inner-layout"
      >
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

### Container Component Props

All components (`Container`, `ContainerOuter`, `ContainerInner`) support the same interface:

#### Public Props

- `children?: ReactNode` - Content to render inside the container
- `className?: string` - CSS classes for styling
- `...rest` - All standard HTML div attributes (ID, aria-*, role, etc.)

#### Internal Props (Development/Debug Use)

- `_internalId?: string` - Override generated component ID for debugging (inherited from `CommonWebAppComponentProps`)
- `_debugMode?: boolean` - Enable debug logging in development (inherited from `CommonWebAppComponentProps`)

### Rendered Data Attributes

When rendered, each component includes debug attributes:

#### Container (via ContainerOuter)

- `data-container-outer-id="generated-id"` - Unique component identifier
- `data-debug-mode="true"` - Present when debug mode is enabled
- `data-testid="container-outer-root"` - Test identifier for reliable testing

#### ContainerInner

- `data-container-inner-id="generated-id"` - Unique component identifier  
- `data-debug-mode="true"` - Present when debug mode is enabled
- `data-testid="container-inner-root"` - Test identifier for reliable testing

## 🎨 Styling

The components use CSS modules with Tailwind CSS integration:

### CSS Module Structure

```css
/* Container.module.css */
@reference "tailwindcss";

/* Applied to ContainerOuter root element */
.containerOuter {
  @apply w-full;
}

/* Applied to ContainerOuter content wrapper */
.containerOuterContent {
  @apply mx-auto px-4 sm:px-6 lg:px-8;
}

/* Applied to ContainerInner root element */  
.containerInner {
  @apply max-w-7xl mx-auto;
}

/* Applied to ContainerInner content wrapper */
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

The Container component follows the internal/external pattern for consistent architecture:

```typescript
// Internal Container component with full props
const InternalContainer = React.forwardRef<ContainerRef, InternalContainerProps>(
  function InternalContainer(props, ref) {
    const { children, componentId, isDebugMode, ...rest } = props;

    if (!children) return null;

    const element = (
      <InternalContainerOuter
        {...rest}
        ref={ref}
        componentId={componentId}
        isDebugMode={isDebugMode}
      >
        <InternalContainerInner>{children}</InternalContainerInner>
      </InternalContainerOuter>
    );

    return element;
  }
);

// Public Container component with useComponentId integration
export const Container = React.forwardRef<ContainerRef, ContainerProps>(
  function Container(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <InternalContainer
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }
);
```

### Individual Component Structure

Each component (ContainerOuter and ContainerInner) follows the same pattern:

```typescript
// Public component with useComponentId
export const ContainerOuter = React.forwardRef<ContainerOuterRef, ContainerOuterProps>(
  function ContainerOuter(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    return (
      <InternalContainerOuter
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );
  }
);

// Internal component with debug attributes
const InternalContainerOuter = React.forwardRef<ContainerOuterRef, InternalContainerOuterProps>(
  function InternalContainerOuter(props, ref) {
    const { children, className, componentId, isDebugMode, ...rest } = props;

    return (
      <Div 
        {...rest} 
        className={cn(styles.containerOuter, className)} 
        ref={ref}
        data-container-outer-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="container-outer-root"
      >
        <Div className={styles.containerOuterContent}>{children}</Div>
      </Div>
    );
  }
);
```

### Type Definitions

The component uses inline type definitions following established patterns:

```typescript
// Public component props
type ContainerRef = DivRef;
interface ContainerProps extends DivProps, CommonWebAppComponentProps {}

// Internal component props with debug capabilities
interface InternalContainerProps extends ContainerProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

// Individual component props follow the same pattern
interface ContainerOuterProps extends DivProps, CommonWebAppComponentProps {}
interface InternalContainerOuterProps extends ContainerOuterProps {
  componentId?: string;
  isDebugMode?: boolean;
}
```

## 🧪 Testing

Comprehensive test coverage in `Container.test.tsx` with **100% code coverage**:

### Test Categories

- **Main Container Component**: Rendering, ref forwarding, props handling, `useComponentId` integration
- **ContainerOuter Component**: Individual outer container functionality with debug attributes
- **ContainerInner Component**: Individual inner container functionality with debug attributes  
- **Integration**: Real-world usage patterns with nested content
- **Error Handling**: Graceful handling of `null`/`undefined` children
- **Accessibility**: Proper ARIA attributes and semantic structure
- **Styling**: CSS classes and responsive behavior

### Test Features

- **Debug Attribute Testing**: Validates `data-container-*-id` and `data-debug-mode` attributes
- **Component ID Testing**: Verifies `useComponentId` integration across all components
- **Test ID Validation**: Uses `data-testid` attributes for reliable element selection
- **Mocking**: Proper mocking of `@guyromellemagayano/components` and CSS modules
- **Edge Cases**: Empty children, whitespace-only children, boolean/number children
- **Performance**: Component memoization and structure validation

### Coverage Metrics

- **Statements**: 100%
- **Functions**: 100%
- **Lines**: 100%
- **Branches**: 87.5%

## 📚 Related Documentation

- [Development Optimization Guide](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md)
- [Component Architecture Patterns](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#component-architecture-patterns)
- [Security & Type Safety](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-security--type-safety)
- [Testing with Vitest](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-testing-with-vitest)

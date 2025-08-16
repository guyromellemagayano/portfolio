<!-- markdownlint-disable line-length -->
# Prose Component

A React component for rendering rich text content with consistent prose styling using Tailwind CSS Typography.

## 📁 File Structure

```bash
prose/
├── Prose.tsx              # Main component with inline types
├── Prose.module.css       # CSS modules for prose styling
├── Prose.test.tsx         # Comprehensive test suite
├── index.ts               # Component exports
└── README.md              # This documentation
```

## 🏗️ Architecture

This component follows the **"inline types for all components"** pattern and uses **shared hooks** for ID generation and debug logging. For detailed information about these architectural patterns, see the [Component Architecture Patterns](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#component-architecture-patterns) section in the Development Optimization Guide.

## 🚀 Features

- **Rich Text Styling** - Applies consistent typography using Tailwind CSS Typography
- **CSS Modules** - Scoped styling with automatic class name obfuscation
- **Type Safety** - Full TypeScript support with inline type definitions
- **Ref Forwarding** - Supports React.forwardRef for DOM access
- **Debug Support** - Built-in debug logging and ID generation
- **Accessibility** - Proper ARIA attributes and semantic HTML support
- **Flexible Content** - Handles any React children including complex HTML structures

## 📖 Usage

### Basic Usage

```typescript
import { Prose } from '@/components/prose'
import { Paragraph, Heading } from '@guyromellemagayano/components'

function ArticlePage() {
  return (
    <Prose>
      <Heading as="h1">Article Title</Heading>
      <Paragraph>This is the article content with proper typography styling.</Paragraph>
    </Prose>
  )
}
```

### With Custom Styling

```typescript
import { Prose } from '@/components/prose'
import { Paragraph, Heading, Div } from '@guyromellemagayano/components'

function BlogPost() {
  return (
    <Prose className="max-w-4xl mx-auto">
      <Heading as="h1">Blog Post Title</Heading>
      <Paragraph>Introduction paragraph...</Paragraph>
      <Div className="my-8">
        <Heading as="h2">Section Heading</Heading>
        <Paragraph>Section content with additional styling...</Paragraph>
      </Div>
    </Prose>
  )
}
```

### Complex Content Structure

```typescript
import { Prose } from '@/components/prose'
import { Heading, Paragraph, Div, Anchor } from '@guyromellemagayano/components'

function DocumentationPage() {
  return (
    <Prose className="prose-lg">
      <Heading as="h1">Documentation</Heading>
      <Paragraph>
        This is a comprehensive guide with <strong>bold text</strong> and{' '}
        <em>italic emphasis</em>.
      </Paragraph>
      
      <Div className="bg-gray-50 p-4 rounded-lg">
        <Heading as="h2">Code Example</Heading>
        <Paragraph>
          Here's how to use the component with{' '}
          <Anchor href="#example">proper linking</Anchor>.
        </Paragraph>
      </Div>
      
      <Heading as="h2">Features List</Heading>
      <ul>
        <li>Feature one with detailed explanation</li>
        <li>Feature two with additional context</li>
        <li>Feature three with examples</li>
      </ul>
    </Prose>
  )
}
```

## 🔧 Props

### Public Props

- `children?: ReactNode` - Content to be rendered with prose styling
- `className?: string` - Additional CSS classes to apply
- `...rest` - All standard HTML div attributes

### Internal Props (Not for External Use)

- `_internalId?: string` - Override generated ID for debugging (inherited from CommonWebAppComponentProps)
- `_debugMode?: boolean` - Enable debug logging in development (inherited from CommonWebAppComponentProps)

## 🎨 Styling

The component uses CSS modules with Tailwind CSS Typography integration:

```css
/* Prose.module.css */
@reference "@tailwindcss/typography";

.proseContainer {
  @apply prose dark:prose-invert;
}
```

### Tailwind Typography

The component applies Tailwind CSS Typography classes:

- `prose` - Base typography styling
- `dark:prose-invert` - Dark mode support

### Custom Styling

```typescript
// Apply custom classes
<Prose className="prose-lg prose-blue max-w-4xl">

// Conditional styling
<Prose className={`prose ${isDark ? 'dark:prose-invert' : ''}`}>

// Responsive styling
<Prose className="prose prose-sm md:prose-base lg:prose-lg">
```

## 🔒 Security & Type Safety

This component follows security best practices by using inline types and hiding internal implementation details. For detailed information about security patterns and type safety, see the [Security & Type Safety](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-security--type-safety) section in the Development Optimization Guide.

## 🔧 Implementation Details

### Component Structure

```typescript
// Prose.tsx - Main implementation
export const Prose = React.forwardRef<ProseRef, ProseProps>(
  function Prose(props, ref) {
    const { className, _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    return (
      <Div
        {...rest}
        ref={ref}
        className={cn(styles.proseContainer, className)}
        data-prose-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
      />
    );
  }
);
```

### CSS Module Structure

```css
/* Prose.module.css - Scoped styling */
@reference "@tailwindcss/typography";

.proseContainer {
  @apply prose dark:prose-invert;
}
```

## 🧪 Testing

Comprehensive test coverage in `Prose.test.tsx` (40 tests):

- **Basic Rendering**: Component renders correctly with various content
- **Props and Attributes**: Ref forwarding, className, props spreading
- **Hook Integration**: useComponentId hook functionality
- **CSS Module Integration**: Styling and class combination
- **Content Handling**: Text, HTML elements, React components
- **Edge Cases**: Long content, special characters, complex structures
- **Accessibility**: ARIA attributes, roles, semantic HTML
- **Integration**: Component interactions and dynamic updates

## 📚 Related Documentation

- [Development Optimization Guide](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md)
- [Component Architecture Patterns](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#component-architecture-patterns)
- [Security & Type Safety](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-security--type-safety)
- [Testing with Vitest](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-testing-with-vitest)

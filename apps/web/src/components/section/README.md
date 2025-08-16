<!-- markdownlint-disable line-length -->
# Section Component

A reusable section component for rendering visually distinct, accessible sections of content with proper semantic HTML structure.

## 📁 File Structure

```bash
section/
├── Section.tsx          # Main component implementation with inline types
├── Section.module.css   # Scoped styles using CSS modules
├── index.ts            # Component exports
├── Section.test.tsx    # Comprehensive test suite using Vitest
└── README.md           # This documentation
```

## 🏗️ Architecture

This component follows the **"inline types for all components"** pattern and uses **early return patterns** for performance optimization. For detailed information about these architectural patterns, see the [Component Architecture Patterns](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#️-component-architecture-patterns) section in the Development Optimization Guide.

## 🚀 Features

- **Semantic HTML**: Uses proper `<section>` element with accessibility attributes
- **Ref Forwarding**: Supports `React.forwardRef` for proper ref handling
- **CSS Modules**: Scoped styling with **Tailwind CSS** integration
- **Debug Support**: Internal debugging capabilities with environment detection
- **Performance Optimized**: Early return pattern for conditional rendering
- **Type Safe**: Full **TypeScript** support with proper type inference

## 📖 Usage

### Basic Usage

```typescript
import { Section } from '@/components/section'
import { Paragraph } from '@guyromellemagayano/components'

function MyPage() {
  return (
    <Section title="About Us">
      <Paragraph>This is the about section content.</Paragraph>
    </Section>
  )
}
```

### With Custom Styling

```typescript
<Section 
  title="Contact Information" 
  className="my-custom-section"
>
  <p>Contact details here...</p>
</Section>
```

### With Internal Props (Development Only)

```typescript
<Section 
  title="Debug Section"
  _internalId="debug-section-1"
  _debugMode={true}
>
  <p>This section has debug logging enabled.</p>
</Section>
```

## 🔧 Props

### Public Props

- `title?: string` - Section title (rendered as h2)
- `children?: ReactNode` - Section content
- `className?: string` - Additional CSS classes
- `...rest` - All standard HTML section attributes

### Internal Props (Not for External Use)

- `_internalId?: string` - Override generated ID for debugging (inherited from CommonWebAppComponentProps)
- `_debugMode?: boolean` - Enable debug logging in development (inherited from CommonWebAppComponentProps)

## 🎨 Styling

The component uses CSS modules with Tailwind CSS integration:

```css
/* Section.module.css */
@reference "tailwindcss";

/* Section container */
.section {
  @apply md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40;
}

/* Section grid layout */
.sectionGrid {
  @apply grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4;
}

/* Section title */
.sectionTitle {
  @apply text-sm font-semibold text-zinc-800 dark:text-zinc-100;
}

/* Section content */
.sectionContent {
  @apply md:col-span-3;
}
```

## 🔒 Security & Type Safety

This component follows security best practices by using inline types and hiding internal implementation details. For detailed information about security patterns and type safety, see the [Security & Type Safety](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-security--type-safety) section in the Development Optimization Guide.

## 🔧 Implementation Details

### Component Structure

```typescript
// Section.tsx - Main implementation
export const Section = React.forwardRef<SectionRef, SectionProps>(
  function Section(props, ref) {
    const { title, children, className, _internalId, _debugMode, ...rest } = props;
    
    // Hook usage at top level (compliance)
    const generatedId = useId();
    const id = _internalId || generatedId;
    
    // Cross-environment safety
    if (_debugMode && globalThis?.process?.env?.NODE_ENV === "development") {
      logInfo(`Section rendered with ID: ${id}`);
    }
    
    // Early return pattern (performance)
    if (!title && !children) return null;
    
    // Semantic HTML with accessibility
    return (
      <SectionComponent
        ref={ref}
        aria-labelledby={id}
        data-section-id={id}
        data-debug-mode={_debugMode ? "true" : undefined}
        {...rest}
      >
        {/* Grid layout with responsive design */}
        <Div className={styles.sectionGrid}>
          {title && <Heading as="h2" id={id}>{title}</Heading>}
          {children && <Div className={styles.sectionContent}>{children}</Div>}
        </Div>
      </SectionComponent>
    );
  }
);
```


### CSS Module Structure

```css
/* Section.module.css - Scoped styling */
@reference "tailwindcss";

.section {
  @apply md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40;
}

.sectionGrid {
  @apply grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4;
}

.sectionTitle {
  @apply text-sm font-semibold text-zinc-800 dark:text-zinc-100;
}

.sectionContent {
  @apply md:col-span-3;
}
```

## 🧪 Testing

Comprehensive test coverage in `__tests__/Section.test.tsx` (570 lines):

- **Basic Rendering**: Title, children, and conditional rendering
- **Props & Attributes**: Ref forwarding, className, data attributes
- **Internal Props**: Debug mode, ID generation, internal props handling
- **CSS Module Integration**: Style application and class combination
- **Accessibility**: ARIA attributes and semantic structure
- **Edge Cases**: Complex children, React elements, multiple children
- **Error Handling**: Various edge cases and error scenarios

## 📚 Related Documentation

- [Development Optimization Guide](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md)
- [Component Architecture Patterns](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#️-component-architecture-patterns)
- [Security & Type Safety](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-security--type-safety)
- [Testing with Vitest](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-testing-with-vitest)

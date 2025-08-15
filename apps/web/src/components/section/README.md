<!-- markdownlint-disable line-length -->
# Section Component

A reusable section component for rendering visually distinct, accessible sections of content with proper semantic HTML structure.

## 📁 File Structure

```bash
section/
├── Section.tsx          # Main component implementation
├── Section.module.css   # Scoped styles using CSS modules
├── index.ts            # Component exports
├── @types/Section.ts   # Type definitions (complex component pattern)
├── __tests__/          # Comprehensive test suite
└── README.md           # This documentation
```

## 🏗️ Architecture

This component follows the **"Separate type files for complex components with external dependencies"** pattern as outlined in our development standards.

### Why Separate Type Files?

- **External Dependencies**: Depends on `@guyromellemagayano/components`
- **Shared Types**: Extends multiple base interfaces
- **Complex Type Relationships**: Requires proper type composition
- **Maintainability**: Easier to manage complex type hierarchies

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

function MyPage() {
  return (
    <Section title="About Us">
      <p>This is the about section content.</p>
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

### Type Organization

This component follows the **complex component pattern** with separate type files:

- **External Dependencies**: Properly typed with `@guyromellemagayano/components`
- **Shared Types**: Extends `CommonWebAppComponentProps` for internal props
- **Controlled Exports**: Only necessary types are exported
- **Internal Props**: Inherited from `CommonWebAppComponentProps` (not explicitly defined in interface)
- **Type Inference**: Supports `typeof` and `React.ComponentProps` for prop types

### Security Benefits

- **API Surface Reduction**: Minimal exposed interfaces
- **Information Hiding**: Internal implementation details protected
- **Type Safety**: Compile-time error prevention
- **Controlled Access**: Internal props available but not promoted

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

### Type Definitions

```typescript
// @types/Section.ts - Type definitions
import type { SectionProps as SectionComponentProps, SectionRef as SectionComponentRef } from '@guyromellemagayano/components';
import type { CommonWebAppComponentProps } from '@web/@types/components';

/** Section component reference type. */
export type SectionRef = SectionComponentRef;

/** Section component props interface. */
export interface SectionProps extends SectionComponentProps, CommonWebAppComponentProps {}
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

## 📋 Compliance

This component is fully compliant with our development standards:

- ✅ **React.forwardRef**: Proper ref forwarding implementation
- ✅ **Early Return Pattern**: Performance optimization for conditional rendering
- ✅ **Cross-Environment Safety**: `globalThis` usage for environment detection
- ✅ **Hook Rules Compliance**: All hooks called at top level
- ✅ **Type Organization**: Separate type files for complex components
- ✅ **Security Principles**: Controlled type exports and internal prop hiding
- ✅ **CSS Modules**: Scoped styling with Tailwind integration
- ✅ **Comprehensive Testing**: High test coverage with various scenarios
- ✅ **Documentation**: **JSDoc** comments and README documentation

## 🔄 Migration Notes

This component serves as a **reference implementation** for complex components with external dependencies. For simpler components, consider using the **inline types pattern** instead.

## 📚 Related Documentation

- [Development Optimization Guide](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md)
- [Component Standards](../../../../../docs/components/COMPONENT_STANDARDS.md)
- [Testing Standards](../../../../../docs/components/TESTING.md)

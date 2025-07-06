<!-- markdownlint-disable line-length -->
# 🏗️ Component Development Standards & Conventions

This document outlines the established conventions, standards, and patterns for developing components in this library. All new components should follow these guidelines to maintain consistency, maintainability, and quality.

## 📚 Table of Contents

- [🏗️ Component Development Standards \& Conventions](#️-component-development-standards--conventions)
  - [📚 Table of Contents](#-table-of-contents)
  - [📁 File Structure](#-file-structure)
    - [File Naming Conventions](#file-naming-conventions)
  - [🏛️ Component Architecture](#️-component-architecture)
    - [Main Component (`index.tsx`)](#main-component-indextsx)
    - [Client Component (`index.client.tsx`)](#client-component-indexclienttsx)
  - [📘 TypeScript Standards](#-typescript-standards)
    - [Import Organization](#import-organization)
    - [Required Imports](#required-imports)
    - [Type Definitions](#type-definitions)
    - [Analytics Data Type](#analytics-data-type)
    - [Code Organization and Comments](#code-organization-and-comments)
  - [🔄 Polymorphic Validation](#-polymorphic-validation)
    - [Adding to ELEMENT\_CONFIGS](#adding-to-element_configs)
    - [Implementation in Component](#implementation-in-component)
    - [Data Attributes](#data-attributes)
  - [📊 Analytics Integration](#-analytics-integration)
    - [Required Props](#required-props)
    - [Implementation Pattern](#implementation-pattern)
    - [Data Attribute](#data-attribute)
  - [🎯 Event Handling](#-event-handling)
    - [Required Event Handlers](#required-event-handlers)
    - [Error Handling Patterns](#error-handling-patterns)
    - [Environment-Aware Behavior](#environment-aware-behavior)
    - [Implementation Pattern](#implementation-pattern-1)
  - [🎨 Styling Conventions](#-styling-conventions)
    - [CSS File Structure](#css-file-structure)
    - [BEM Methodology](#bem-methodology)
    - [Class Name Building](#class-name-building)
  - [✅ Standards Checklist](#-standards-checklist)
    - [Required Features](#required-features)
    - [Documentation Requirements](#documentation-requirements)
    - [Styling Standards](#styling-standards)
    - [Analytics Standards](#analytics-standards)
    - [Testing Standards](#testing-standards)
    - [Complex Components](#complex-components)
  - [🧪 Testing Standards](#-testing-standards)
    - [Test File Structure](#test-file-structure)
    - [Required Test Categories](#required-test-categories)
    - [JSDOM Compatibility](#jsdom-compatibility)
  - [📖 Documentation Requirements](#-documentation-requirements)
    - [README.md Structure](#readmemd-structure)
    - [With Variants](#with-variants)
    - [Polymorphic Rendering](#polymorphic-rendering)
    - [Analytics Integration](#analytics-integration)
  - [Props](#props)
    - [ComponentProps](#componentprops)
  - [CSS Classes](#css-classes)
  - [Data Attributes](#data-attributes-1)
  - [Accessibility](#accessibility)
  - [Browser Support](#browser-support)
  - [Examples](#examples)
    - [Example 1](#example-1)
  - [Migration Guide](#migration-guide)
    - [From Basic HTML](#from-basic-html)
  - [Performance](#performance)
  - [Testing](#testing)
    - [💾 Memoization](#-memoization)
  - [♿ Accessibility Standards](#-accessibility-standards)
    - [Required Features](#required-features-1)
    - [Implementation](#implementation)
  - [🔄 Migration Guide](#-migration-guide)
  - [💡 Best Practices](#-best-practices)
  - [🧠 Component Complexity Philosophy](#-component-complexity-philosophy)
    - [Organization Standards for Any Complexity Level](#organization-standards-for-any-complexity-level)
    - [3rd-Party CSS ClassName Support Requirements](#3rd-party-css-classname-support-requirements)
  - [🛠️ Implementation Patterns](#️-implementation-patterns)
    - [Variant Management](#variant-management)
    - [Style Merging Pattern](#style-merging-pattern)
    - [Element-Specific Defaults](#element-specific-defaults)
    - [JSDoc Documentation](#jsdoc-documentation)
    - [Export Pattern](#export-pattern)
  - [📋 Checklist for New Components](#-checklist-for-new-components)

## 📁 File Structure

Every component should have the following file structure:

```text
src/component-name/
├── index.tsx              # Main component (server-side)
├── index.client.tsx       # Client-side component
├── index.test.tsx         # Comprehensive test suite
├── styles.css             # Component styles (BEM methodology)
├── README.md              # Component documentation
└── utils.ts               # (Optional) Utility functions if complex
```

### File Naming Conventions

- Use kebab-case for directory names: `component-name/`
- Use camelCase for component names in code: `ComponentName`
- Use PascalCase for exported component names: `ComponentName`

## 🏛️ Component Architecture

### Main Component (`index.tsx`)

```tsx
import React, { Suspense, useCallback, useMemo } from "react";

import {
  type CommonComponentProps,
  ELEMENT_CONFIGS,
  validatePolymorphicProps,
} from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const ComponentClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ComponentClient };
});

const MemoizedComponentClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedComponentClient };
});

export type ComponentRef = React.ComponentRef<"element">;

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    CommonComponentProps {
  /** Component-specific prop description */
  variant?: boolean;
  /** Analytics identifier for tracking */
  analyticsId?: string;
  /** Custom analytics function */
  onAnalytics?: (data: {
    event: string;
    category: string;
    label: string;
    content: string;
  }) => void;
}

/**
 * Component description with semantic structure, analytics, and accessibility.
 * Supports server-side and client-side rendering.
 */
const ComponentName = React.forwardRef<ComponentRef, ComponentProps>(
  (props, ref) => {
    const {
      variant = true,
      analyticsId,
      onAnalytics,
      as: Component = "element",
      isClient = false,
      isMemoized = false,
      children,
      className,
      onClick,
      onMouseEnter,
      onFocus,
      style,
      ...rest
    } = props;

    const asElement = typeof Component === "string" ? Component : "unknown";
    const hasAnalytics = analyticsId || onAnalytics;

    // Polymorphic validation - warn about component-specific props when rendering as different element
    useMemo(() => {
      validatePolymorphicProps(
        "ComponentName",
        asElement,
        props as Record<string, unknown>,
        ELEMENT_CONFIGS.COMPONENT
      );
    }, [asElement, props]);

    // Event handlers - always use useCallback to maintain hooks order
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        // Only execute analytics if we have analytics setup
        if (hasAnalytics && (analyticsId || onAnalytics)) {
          const analyticsData = {
            event: "click",
            category: "component",
            label: analyticsId || "component-click",
            content: String(children || ""),
          };

          if (onAnalytics) {
            onAnalytics(analyticsData);
          } else if (analyticsId && typeof window !== "undefined") {
            try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const gtag = (window as any).gtag;
              if (gtag) {
                gtag("event", "click", {
                  event_category: analyticsData.category,
                  event_label: analyticsData.label,
                  component_content: analyticsData.content,
                });
              }
            } catch (error) {
              if (process.env.NODE_ENV === "development") {
                console.warn("Analytics tracking failed:", error);
              }
            }
          }
        }
        onClick?.(event);
      },
      [hasAnalytics, analyticsId, onAnalytics, children, onClick]
    );

    // Props with accessibility and semantic structure
    const enhancedProps = useMemo(
      () => ({
        ...rest,
        ref,
        className: [
          "component",
          variant && "component--variant",
          className,
        ]
          .filter(Boolean)
          .join(" "),
        style,
        onClick: handleClick,
        onMouseEnter,
        onFocus,
        "data-variant": variant ? "true" : "false",
        "data-analytics-id": analyticsId || undefined,
        "data-polymorphic-element":
          asElement !== "element" ? asElement : undefined,
        "data-element-validation":
          process.env.NODE_ENV === "development" && asElement !== "element"
            ? "warning"
            : undefined,
        // Accessibility attributes
        "aria-label": rest["aria-label"] || "Default label",
      }),
      [
        rest,
        variant,
        className,
        style,
        handleClick,
        onMouseEnter,
        onFocus,
        analyticsId,
        asElement,
      ]
    );

    // Base element
    const element = <Component {...enhancedProps}>{children}</Component>;

    // Client-side rendering
    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedComponentClient
        : ComponentClient;

      return (
        <Suspense fallback={element}>
          <ClientComponent {...props} ref={ref}>
            {children}
          </ClientComponent>
        </Suspense>
      );
    }

    return element;
  }
);

ComponentName.displayName = "ComponentName";

// Export the server component
export const Component = ComponentName;

// For most use cases, the server component is sufficient
// For client-side memoization, use isClient=true with isMemoized=true
export default Component;
```

### Client Component (`index.client.tsx`)

```tsx
import React, { forwardRef, memo } from "react";
import type { ComponentProps, ComponentRef } from "./index";

export const ComponentClient = forwardRef<ComponentRef, ComponentProps>(
  ({ as: Component = "element", children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

ComponentClient.displayName = "ComponentClient";

export const MemoizedComponentClient = memo(ComponentClient);
MemoizedComponentClient.displayName = "MemoizedComponentClient";
```

## 📘 TypeScript Standards

### Import Organization

Follow this specific import order for consistency:

```tsx
// 1. React imports
import React, { Suspense, useCallback, useMemo } from "react";

// 2. Type imports from internal modules
import {
  type CommonComponentProps,
  ELEMENT_CONFIGS,
  validatePolymorphicProps,
} from "../types";

// 3. Local imports (styles, utilities)
import "./styles.css";
```

### Required Imports

```tsx
import React, { Suspense, useCallback, useMemo } from "react";
import type { CommonComponentProps } from "../types";
import { ELEMENT_CONFIGS, validatePolymorphicProps } from "../types";
```

### Type Definitions

```tsx
export type ComponentRef = React.ComponentRef<"element">;

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    CommonComponentProps {
  // Component-specific props with JSDoc comments
  /** Description of the prop */
  variant?: boolean;
  /** Analytics identifier for tracking */
  analyticsId?: string;
  /** Custom analytics function */
  onAnalytics?: (data: AnalyticsData) => void;
}
```

### Analytics Data Type

```tsx
interface AnalyticsData {
  event: string;
  category: string;
  label: string;
  content: string;
}
```

### Code Organization and Comments

Follow these patterns for code organization and documentation:

```tsx
// Lazy load client components for code splitting
const ComponentClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ComponentClient };
});

// Polymorphic validation - warn about component-specific props when rendering as different element
useMemo(() => {
  validatePolymorphicProps(
    "ComponentName",
    asElement,
    props as Record<string, unknown>,
    ELEMENT_CONFIGS.COMPONENT
  );
}, [asElement, props]);

// Event handlers - always use useCallback to maintain hooks order
const handleClick = useCallback(
  (event: React.MouseEvent<HTMLElement>) => {
    // Only execute analytics if we have analytics setup
    if (hasAnalytics && (analyticsId || onAnalytics)) {
      // Analytics logic here
    }
    onClick?.(event);
  },
  [hasAnalytics, analyticsId, onAnalytics, children, onClick]
);

// Props with accessibility and semantic structure
const enhancedProps = useMemo(
  () => ({
    // Props configuration
  }),
  [/* dependencies */]
);

// Base element
const element = <Component {...enhancedProps}>{children}</Component>;

// Client-side rendering
if (isClient) {
  // Client rendering logic
}
```

## 🔄 Polymorphic Validation

### Adding to ELEMENT_CONFIGS

For components with element-specific props, add to `types.ts`:

```tsx
export const ELEMENT_CONFIGS = {
  // ... existing configs
  COMPONENT: createElementConfig(
    "element",
    ["prop1", "prop2"],
    "Description of why these props are element-specific."
  ),
} as const;
```

### Implementation in Component

```tsx
// Polymorphic validation - warn about element-specific props when rendering as different element
useMemo(() => {
  validatePolymorphicProps("ComponentName", asElement, props as Record<string, unknown>, ELEMENT_CONFIGS.COMPONENT);
}, [asElement, props]);
```

### Data Attributes

Always include these data attributes:

```tsx
"data-polymorphic-element":
  asElement !== "element" ? asElement : undefined,
"data-element-validation":
  process.env.NODE_ENV === "development" && asElement !== "element"
    ? "warning"
    : undefined,
```

## 📊 Analytics Integration

### Required Props

```tsx
analyticsId?: string;
onAnalytics?: (data: AnalyticsData) => void;
```

### Implementation Pattern

```tsx
const hasAnalytics = analyticsId || onAnalytics;

const handleClick = useCallback(
  (event: React.MouseEvent<HTMLElement>) => {
    if (hasAnalytics && (analyticsId || onAnalytics)) {
      const analyticsData = {
        event: "click",
        category: "component",
        label: analyticsId || "component-click",
        content: String(children || ""),
      };

      if (onAnalytics) {
        onAnalytics(analyticsData);
      } else if (analyticsId && typeof window !== "undefined") {
        try {
          const gtag = (window as any).gtag;
          if (gtag) {
            gtag("event", "click", {
              event_category: analyticsData.category,
              event_label: analyticsData.label,
              component_content: analyticsData.content,
            });
          }
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.warn("Analytics tracking failed:", error);
          }
        }
      }
    }
    onClick?.(event);
  },
  [hasAnalytics, analyticsId, onAnalytics, children, onClick]
);
```

### Data Attribute

```tsx
"data-analytics-id": analyticsId || undefined,
```

## 🎯 Event Handling

### Required Event Handlers

Always support these event handlers:

```tsx
onClick?: (event: React.MouseEvent<HTMLElement>) => void;
onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
```

### Error Handling Patterns

Implement robust error handling for external integrations:

```tsx
// Analytics error handling
try {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (window as any).gtag;
  if (gtag) {
    gtag("event", "click", {
      event_category: analyticsData.category,
      event_label: analyticsData.label,
      component_content: analyticsData.content,
    });
  }
} catch (error) {
  if (process.env.NODE_ENV === "development") {
    console.warn("Analytics tracking failed:", error);
  }
}
```

### Environment-Aware Behavior

```tsx
// Only execute in browser environment
if (typeof window !== "undefined") {
  // Browser-specific code
}

// Development-only warnings
if (process.env.NODE_ENV === "development") {
  console.warn("Development warning");
}
```

### Implementation Pattern

```tsx
// Always use useCallback for event handlers
const handleClick = useCallback(
  (event: React.MouseEvent<HTMLElement>) => {
    // Analytics logic here
    onClick?.(event);
  },
  [onClick, /* other dependencies */]
);

// Pass to enhancedProps
const enhancedProps = useMemo(
  () => ({
    // ... other props
    onClick: handleClick,
    onMouseEnter,
    onFocus,
  }),
  [/* dependencies */]
);
```

## 🎨 Styling Conventions

### CSS File Structure

```css
/* =============================================================================
   COMPONENT STYLES
   ============================================================================= */

.component {
  /* Base styles */
}

/* Variants */
.component--variant {
  /* Variant styles */
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .component {
    /* Dark mode styles */
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .component {
    /* High contrast styles */
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .component {
    /* Reduced motion styles */
  }
}

/* Focus styles for accessibility */
.component:focus-visible {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .component {
    /* Print styles */
  }
}
```

### BEM Methodology

- Base class: `.component`
- Variants: `.component--variant`
- Modifiers: `.component--modifier`

### Class Name Building

```tsx
className: [
  "component",
  variant && "component--variant",
  className,
]
  .filter(Boolean)
  .join(" "),
```

## ✅ Standards Checklist

### Required Features

- [ ] TypeScript interfaces with comprehensive prop documentation
- [ ] `forwardRef` implementation for proper ref forwarding
- [ ] Performance optimizations (`useCallback`, `useMemo`)
- [ ] Lazy-loaded client components
- [ ] Analytics support (optional but consistent interface)
- [ ] Accessibility attributes (ARIA, semantic HTML)
- [ ] Responsive design considerations
- [ ] Error boundary compatibility
- [ ] Support for `as` prop (polymorphic components)
- [ ] CSS class naming convention (`component`, `component--modifier`)
- [ ] Polymorphic validation (if element-specific props exist)

### Documentation Requirements

Every component must include:

- **📄 README.md with the following:**

  - [ ] Feature overview with emoji bullets
  - [ ] Installation instructions
  - [ ] Basic usage examples
  - [ ] Props table with types and descriptions
  - [ ] Advanced examples
  - [ ] Accessibility notes
  - [ ] Styling information
  - [ ] Performance notes
  - [ ] Browser support

- **🏷️ Props Interface with JSDoc comments**

  ```tsx
  interface ComponentProps {
    /** Clear description of what this prop does */
    propName: PropType;
  }
  ```

- **📝 Component JSDoc**

  ```tsx
  /**
   * Brief component description.
   * 
   * Supports server-side and client-side rendering.
   */
  ```

### Styling Standards

- Use **CSS** custom properties for themeable values
- Follow **BEM**-like naming: `.component`, `.component--modifier`, `.component__element`
- Include responsive breakpoints
- Support for high contrast mode
- Respect `prefers-reduced-motion`

### Analytics Standards

When implementing analytics:

```tsx
interface AnalyticsData {
  event: string;
  category: string;
  label: string;
  content: string;
  // Component-specific fields
}

function fireAnalytics(analyticsId: string, data: AnalyticsData): void {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", data.event, {
        event_category: data.category,
        event_label: data.label,
        component_content: data.content,
        // Additional data
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Analytics tracking failed:", error);
    }
  }
}
```

### Testing Standards

Every component must have:

- Unit tests for all props and variants
- Accessibility tests
- Event handling tests
- Analytics tracking tests
- Error boundary tests
- Client/server rendering tests
- Polymorphic validation tests

### Complex Components

For components with significant complexity (>300 lines):

1. **🔧 Extract utilities to `utils.ts`**:

```tsx
// utils.ts
export function validateInput(value: string): boolean {
  // Implementation
}

export function calculateDimensions(props: Props): Dimensions {
  // Implementation
}
```

2. **🧩 Use sub-components for UI parts**:

```tsx
function ComponentSubpart({ data }: SubpartProps) {
  return <div>{/* Implementation */}</div>;
}
```

3. **📊 Group related functionality**:

```tsx
// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

// =============================================================================
// ANALYTICS INTEGRATION
// =============================================================================

// =============================================================================
// MAIN COMPONENT
// =============================================================================
```

## 🧪 Testing Standards

### Test File Structure

```tsx
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Component, type ComponentProps } from ".";

describe("Component Component", () => {
  let mockConsoleWarn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    mockConsoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Test categories
  describe("Basic Rendering", () => { /* tests */ });
  describe("Variants", () => { /* tests */ });
  describe("Analytics Integration", () => { /* tests */ });
  describe("Event Handling", () => { /* tests */ });
  describe("Polymorphic Rendering", () => { /* tests */ });
  describe("Data Attributes", () => { /* tests */ });
  describe("Client-side Rendering", () => { /* tests */ });
  describe("Edge Cases", () => { /* tests */ });
});
```

### Required Test Categories

1. **🔍 Basic Rendering**: Default props, custom content, semantic meaning
2. **🎛️ Variants**: All component variants and their classes/attributes
3. **🎨 Custom Styling**: className merging, custom styles
4. **📊 Analytics Integration**: analyticsId, onAnalytics, data attributes
5. **🎯 Event Handling**: onClick, onMouseEnter, onFocus
6. **🔄 Polymorphic Rendering**: `as` prop functionality
7. **🏷️ Data Attributes**: All data attributes in different scenarios
8. **🖥️ Client-side Rendering**: isClient, isMemoized
9. **🔧 Edge Cases**: Empty content, complex children, ref forwarding

### JSDOM Compatibility

For components that render as `<body>`, `<html>`, or other restricted elements:

```tsx
// Use smoke tests for restricted elements
it("renders as <body> without throwing (smoke test)", () => {
  expect(() => render(<Body {...defaultProps} />)).not.toThrow();
});

// Use polymorphic rendering for DOM assertions
it("renders with default props as div", () => {
  const { container } = render(<Body as="div" {...defaultProps} />);
  const element = container.querySelector("div");
  expect(element).toBeInTheDocument();
});
```

## 📖 Documentation Requirements

### README.md Structure

```markdown
# Component Name

Brief description of the component.

## Features

- **Feature 1**: Description
- **Feature 2**: Description

## Usage

### Basic Usage

```tsx
import { Component } from '@your-org/components';

<Component>Content</Component>
```

### With Variants

```tsx
<Component variant>Variant content</Component>
```

### Polymorphic Rendering

```tsx
<Component as="div">Div with component semantics</Component>
```

### Analytics Integration

```tsx
<Component analyticsId="tracked-component">Tracked content</Component>
```

## Props

### ComponentProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `boolean` | `true` | Description |
| `analyticsId` | `string` | `undefined` | Analytics identifier |

## CSS Classes

- `.component` - Base component styles
- `.component--variant` - Variant styles

## Data Attributes

- `data-variant` - Indicates variant state
- `data-analytics-id` - Analytics identifier
- `data-polymorphic-element` - Element type when polymorphic
- `data-element-validation` - Validation warning in development

## Accessibility

- ARIA support
- Keyboard navigation
- Focus management

## Browser Support

- Modern browsers
- IE11+ (with polyfills)

## Examples

### Example 1

```tsx
// Code example
```

## Migration Guide

### From Basic HTML

```tsx
// Before
<element className="custom">Content</element>

// After
import { Component } from '@your-org/components';

<Component className="custom">Content</Component>
```

## Performance

- Server-side rendering by default
- Optional client-side rendering
- Memoization support

## Testing

Run tests with:

```bash
pnpm test src/component-name/index.test.tsx
```

```

## ⚡ Performance Considerations

### 🖥️ Server-Side Rendering

- Default to server-side rendering
- Use `isClient` prop for client-side features
- Use `isMemoized` for performance optimization

### Lazy Loading

```tsx
const ComponentClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ComponentClient };
});
```

### 💾 Memoization

```tsx
// Use useMemo for expensive computations
const enhancedProps = useMemo(
  () => ({
    // computed props
  }),
  [/* dependencies */]
);

// Use useCallback for event handlers
const handleClick = useCallback(
  (event) => {
    // handler logic
  },
  [/* dependencies */]
);
```

## ♿ Accessibility Standards

### Required Features

1. **ARIA Support**: All standard ARIA attributes
2. **Keyboard Navigation**: Full keyboard support
3. **Focus Management**: Proper focus handling
4. **Screen Reader Support**: Semantic HTML and ARIA
5. **High Contrast**: High contrast mode support
6. **Reduced Motion**: Respects `prefers-reduced-motion`
7. **Focus Visible**: Clear focus indicators

### Implementation

```tsx
// Focus styles in CSS
.component:focus-visible {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  .component {
    /* Disable animations */
  }
}

// High contrast support
@media (prefers-contrast: high) {
  .component {
    /* High contrast styles */
  }
}
```

## 🔄 Migration Guide

For existing components that don't follow these standards:

- **Check props interface** - ensure all props have JSDoc comments
- **Verify accessibility** - add missing ARIA attributes
- **Standardize analytics** - ensure consistent interface
- **Update documentation** - follow the README template
- **Extract complex utilities** - move to separate files if needed
- **Add missing tests** - ensure comprehensive coverage
- **Add polymorphic validation** - if component has element-specific props

## 💡 Best Practices

- **Keep components focused** - single responsibility principle
- **Optimize for performance** - memoize expensive operations
- **Design for accessibility** - think about all users
- **Write clear documentation** - help other developers
- **Test thoroughly** - prevent regressions
- **Consider edge cases** - handle errors gracefully
- **Plan for growth** - extensible architecture

## 🧠 Component Complexity Philosophy

**Complexity is not a limitation** - Components should be as feature-rich and comprehensive as needed, provided they:

- Follow established conventions and standards
- Have exhaustive, clear documentation
- Properly support 3rd-party CSS classnames
- Maintain clean, organized code structure

### Organization Standards for Any Complexity Level

- **Utility Functions**: Extract to `utils.ts` for better organization and reusability
- **Section Comments**: Use clear section dividers for different functionality
- **Comprehensive Documentation**: More features = more examples and edge cases documented
- **CSS Flexibility**: Always support external CSS classes without conflicts
- **Exhaustive Features**: Include all necessary functionality rather than limiting scope

### 3rd-Party CSS ClassName Support Requirements

All components MUST properly support external CSS classes:

```tsx
// REQUIRED: Always merge external className with component classes
className: [
  "component",           // Base component class
  variant && `component--${variant}`,  // Variant classes
  className,             // 3rd-party/external classes
]
  .filter(Boolean)
  .join(" ")
```

## 🛠️ Implementation Patterns

### Variant Management

```tsx
// Multiple boolean variants with clear naming
scrollable?: boolean;
hasBackground?: boolean;

// Variant classes with BEM methodology
className: [
  "body",
  scrollable && "body--scrollable",
  hasBackground && "body--has-background",
  className,
]
  .filter(Boolean)
  .join(" "),

// Data attributes for debugging
"data-scrollable": scrollable ? "true" : "false",
"data-has-background": hasBackground ? "true" : "false",
```

### Style Merging Pattern

```tsx
// Merge custom styles with component logic
style: {
  ...style,
  overflow: scrollable ? undefined : "hidden",
},
```

### Element-Specific Defaults

```tsx
// Use semantic element as default
as: Component = "body",

// Validate against element-specific config
ELEMENT_CONFIGS.BODY
```

### JSDoc Documentation

```tsx
/**
 * Universal body component with semantic structure, analytics, and accessibility.
 * Supports server-side and client-side rendering.
 */
```

### Export Pattern

```tsx
// Named export for the component
export const Body = BodyComponent;

// Default export with usage guidance
export default Body;
```

## 📋 Checklist for New Components

- [ ] File structure follows conventions
- [ ] TypeScript types are properly defined
- [ ] Polymorphic validation is implemented (if needed)
- [ ] Analytics integration is included
- [ ] Event handlers are implemented with useCallback
- [ ] Styles follow BEM methodology
- [ ] Comprehensive test suite is written
- [ ] Documentation is complete
- [ ] Accessibility features are implemented
- [ ] Performance optimizations are in place
- [ ] Component is added to polymorphic validation tests
- [ ] Component coverage is updated

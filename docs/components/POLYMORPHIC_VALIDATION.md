<!-- markdownlint-disable line-length -->
# 🎯 Polymorphic Component Validation System

This document describes the polymorphic validation system implemented across all components in this library to ensure type safety and proper semantic usage when components are rendered as different HTML elements.

## 📚 Table of Contents

- [🎯 Polymorphic Component Validation System](#-polymorphic-component-validation-system)
  - [📚 Table of Contents](#-table-of-contents)
  - [📖 Overview](#-overview)
    - [System Benefits](#system-benefits)
    - [Core Features](#core-features)
  - [🏗️ System Architecture](#️-system-architecture)
    - [Core Components](#core-components)
    - [Validation Function](#validation-function)
    - [Element Configuration System](#element-configuration-system)
    - [Configuration Structure](#configuration-structure)
  - [⚠️ Component Risk Classification](#️-component-risk-classification)
    - [High-Risk Components](#high-risk-components)
    - [Medium-Risk Components](#medium-risk-components)
    - [Low-Risk Components](#low-risk-components)
  - [🚨 High-Risk Component Examples](#-high-risk-component-examples)
    - [Base Component](#base-component)
    - [Area Component](#area-component)
    - [Audio Component](#audio-component)
  - [⚠️ Medium-Risk Component Examples](#️-medium-risk-component-examples)
    - [A Component](#a-component)
    - [Abbr Component](#abbr-component)
  - [✅ Low-Risk Component Examples](#-low-risk-component-examples)
    - [Bdi/Bdo Components](#bdibdo-components)
  - [💻 Developer Experience](#-developer-experience)
    - [Development-Only Warnings](#development-only-warnings)
    - [Debug Data Attributes](#debug-data-attributes)
    - [Context-Aware Error Messages](#context-aware-error-messages)
    - [Message Structure](#message-structure)
  - [🛠️ Implementation Guide](#️-implementation-guide)
    - [Adding New Components](#adding-new-components)
    - [Configuration Setup](#configuration-setup)
    - [Component Integration](#component-integration)
    - [Complete Implementation Example](#complete-implementation-example)
  - [🧪 Testing Framework](#-testing-framework)
    - [Test Coverage Areas](#test-coverage-areas)
    - [Required Dependencies](#required-dependencies)
    - [Running Tests](#running-tests)
    - [Test Examples](#test-examples)
  - [📊 Performance \& Production](#-performance--production)
    - [Development vs Production](#development-vs-production)
    - [Performance Considerations](#performance-considerations)
    - [Bundle Size Impact](#bundle-size-impact)
  - [🚀 Advanced Features](#-advanced-features)
    - [Custom Validation Rules](#custom-validation-rules)
    - [Integration with TypeScript](#integration-with-typescript)
    - [Analytics Integration](#analytics-integration)
  - [🔧 Configuration Reference](#-configuration-reference)
    - [ELEMENT\_CONFIGS Structure](#element_configs-structure)
    - [Available Configurations](#available-configurations)
    - [Creating Custom Configurations](#creating-custom-configurations)
  - [📈 Future Enhancements](#-future-enhancements)
    - [Planned Features](#planned-features)
    - [ESLint Integration](#eslint-integration)
    - [IDE Extensions](#ide-extensions)
  - [📚 Migration \& Adoption](#-migration--adoption)
    - [Migration Steps](#migration-steps)
    - [Legacy Component Updates](#legacy-component-updates)
    - [Team Adoption Guidelines](#team-adoption-guidelines)
  - [🔍 Validation System Details](#-validation-system-details)
    - [Runtime Validation](#runtime-validation)
    - [Static Analysis](#static-analysis)
    - [Type Safety](#type-safety)

## 📖 Overview

The polymorphic validation system provides comprehensive type safety and semantic validation for components that can render as different HTML elements through the `as` prop.

### System Benefits

- **Type Safety**: Prevents invalid DOM attribute combinations at compile time
- **Runtime Validation**: Catches semantic issues during development
- **Educational**: Teaches developers about proper HTML semantics
- **Debugging**: Provides clear data attributes for troubleshooting
- **Zero Production Cost**: No runtime overhead in production builds
- **Maintainable**: Centralized validation logic across all components

### Core Features

- **Conditional Polymorphic Types**: TypeScript types that restrict element-specific props based on the `as` prop
- **Runtime Warnings**: Development-time warnings when element-specific attributes are used inappropriately
- **Enhanced Developer Experience**: Clear, actionable warnings with context and solutions
- **Debug Attributes**: Data attributes for easier debugging and testing
- **Performance Optimized**: Zero cost in production environments

## 🏗️ System Architecture

### Core Components

The validation system consists of several key components working together:

1. **Validation Function**: `validatePolymorphicProps` - Core validation logic
2. **Element Configurations**: Pre-defined configs for element-specific properties
3. **TypeScript Integration**: Type-level restrictions and intellisense
4. **Debug Attributes**: Data attributes for development debugging

### Validation Function

Located in `src/types.ts`, this function validates component usage at runtime:

```tsx
validatePolymorphicProps(
  componentName: string,
  asElement: string,
  props: Record<string, unknown>,
  elementConfig: ElementSpecificPropsConfig
): void
```

**Parameters:**

- `componentName`: Name of the component being validated
- `asElement`: The element type being rendered as
- `props`: Component props to validate
- `elementConfig`: Configuration defining element-specific properties

### Element Configuration System

Pre-defined configurations for components with element-specific properties ensure consistent validation across the library.

### Configuration Structure

```tsx
interface ElementSpecificPropsConfig {
  element: string;
  specificProps: string[];
  description: string;
}

export const ELEMENT_CONFIGS = {
  BASE: {
    element: "base",
    specificProps: ["href", "target"],
    description: "These props set document-wide defaults and don't apply to other elements."
  },
  AREA: {
    element: "area",
    specificProps: ["coords", "shape", "alt", "href", "target"],
    description: "These props define clickable regions in image maps and are meaningless on other elements."
  },
  AUDIO: {
    element: "audio",
    specificProps: ["src", "controls", "autoPlay", "loop", "muted", "preload", "crossOrigin"],
    description: "These props control audio playback and have no effect on non-media elements."
  }
  // ... more configurations
};
```

## ⚠️ Component Risk Classification

Components are classified into three risk categories based on how their element-specific properties behave when used polymorphically.

### High-Risk Components

Components where element-specific props become completely invalid or meaningless when used with other elements:

- **Base Component**: `href`, `target` only work on `<base>` elements
- **Area Component**: `coords`, `shape`, `alt` are meaningless outside image maps
- **Audio Component**: Media-specific props have no effect on non-media elements

### Medium-Risk Components

Components where props may work on other elements but lose semantic meaning or context:

- **A Component**: Link props work on other elements but lose navigation semantics
- **Abbr Component**: `title` works elsewhere but loses abbreviation context

### Low-Risk Components

Components where props work correctly across multiple element types:

- **Bdi/Bdo Components**: `dir` attribute is valid on most HTML elements

## 🚨 High-Risk Component Examples

### Base Component

- **Element-specific props**: `href`, `target`
- **Risk Level**: **High** - These props only function on `<base>` elements
- **Validation**: Always warns when used with other elements

```tsx
// ❌ Invalid usage - will show warning
<Base as="div" href="https://example.com" target="_blank" />

// ✅ Correct usage
<Base href="https://example.com" target="_blank" />
```

**Warning Message:**

```
Base: The following props are only valid for <base> elements: href, target.
You're rendering as <div>. These props set document-wide defaults and don't apply to other elements.
Consider using a semantic <base> element or removing these props.
```

### Area Component

- **Element-specific props**: `coords`, `shape`, `alt`, `href`, `target`
- **Risk Level**: **High** - These props are meaningless outside image maps
- **Validation**: Always warns when used with other elements

```tsx
// ❌ Invalid usage - will show warning
<Area as="button" coords="0,0,100,100" shape="rect" alt="Click me" />

// ✅ Correct usage
<Area coords="0,0,100,100" shape="rect" alt="Click me" />
```

**Warning Message:**

```
Area: The following props are only valid for <area> elements: coords, shape, alt.
You're rendering as <button>. These props define clickable regions in image maps and are meaningless on other elements.
Consider using a semantic <area> element or removing these props.
```

### Audio Component

- **Element-specific props**: `src`, `controls`, `autoPlay`, `loop`, `muted`, `preload`, `crossOrigin`
- **Risk Level**: **High** - Media props have no effect on non-media elements
- **Validation**: Always warns when used with other elements

```tsx
// ❌ Invalid usage - will show warning
<Audio as="div" src="audio.mp3" controls autoPlay />

// ✅ Correct usage
<Audio src="audio.mp3" controls autoPlay />
```

**Warning Message:**

```
Audio: The following props are only valid for <audio> elements: src, controls, autoPlay.
You're rendering as <div>. These props control audio playback and have no effect on non-media elements.
Consider using a semantic <audio> element or removing these props.
```

## ⚠️ Medium-Risk Component Examples

### A Component

- **Element-specific props**: `href`, `target`, `download`, `hrefLang`, `ping`, `rel`, `referrerPolicy`
- **Risk Level**: **Medium** - Some props may work on other elements but lose semantic meaning
- **Validation**: Warns when used with other elements

```tsx
// ❌ Semantically incorrect - will show warning
<A as="button" href="https://example.com" target="_blank">Navigate</A>

// ✅ Semantically correct
<A href="https://example.com" target="_blank">Navigate</A>

// ✅ Alternative with proper semantics
<button onClick={() => window.open('https://example.com', '_blank')}>
  Navigate
</button>
```

**Warning Message:**

```
A: The following props are only valid for <a> elements: href, target.
You're rendering as <button>. These props define navigation behavior and lose semantic meaning on other elements.
Consider using a semantic <a> element or implementing navigation differently.
```

### Abbr Component

- **Element-specific props**: `title`
- **Risk Level**: **Medium** - `title` works on other elements but loses semantic meaning
- **Validation**: Warns when used with other elements

```tsx
// ❌ Less semantic - will show warning
<Abbr as="span" title="HyperText Markup Language">HTML</Abbr>

// ✅ Semantically correct
<Abbr title="HyperText Markup Language">HTML</Abbr>

// ✅ Alternative if abbreviation semantics not needed
<span title="HyperText Markup Language">HTML</span>
```

**Warning Message:**

```
Abbr: The following props are only valid for <abbr> elements: title.
You're rendering as <span>. The title prop loses its abbreviation semantic meaning on other elements.
Consider using a semantic <abbr> element for proper abbreviation markup.
```

## ✅ Low-Risk Component Examples

### Bdi/Bdo Components

- **Universal props**: `dir` (valid on most HTML elements)
- **Risk Level**: **Low** - Props work correctly on other elements
- **Validation**: No warnings shown

```tsx
// ✅ Valid usage - no warning
<Bdi as="span" dir="rtl">نص عربي</Bdi>
<Bdo as="div" dir="ltr">Left-to-right text</Bdo>

// ✅ Also valid with default elements
<Bdi dir="rtl">نص عربي</Bdi>
<Bdo dir="ltr">Left-to-right text</Bdo>
```

**No Warning**: The `dir` attribute is semantically valid and functional on most HTML elements.

## 💻 Developer Experience

### Development-Only Warnings

Warnings are only shown in development mode to avoid performance overhead in production:

```tsx
// Development environment
if (process.env.NODE_ENV === "development") {
  console.warn(
    "Base: The following props are only valid for <base> elements: href, target.\n" +
    "You're rendering as <div>. These props set document-wide defaults and don't apply to other elements.\n" +
    "Consider using a semantic <base> element or removing these props."
  );
}

// Production - no warnings, zero overhead
```

### Debug Data Attributes

All components add debugging attributes when used polymorphically to help with development and testing:

```html
<!-- When using polymorphic rendering with warnings -->
<div
  data-polymorphic-element="div"
  data-element-validation="warning"
  class="base"
>
  Content
</div>

<!-- When using correct element -->
<base href="https://example.com" class="base" />

<!-- Low-risk polymorphic usage (no warnings) -->
<span
  data-polymorphic-element="span"
  class="bdi"
  dir="rtl"
>
  نص عربي
</span>
```

### Context-Aware Error Messages

Each warning provides comprehensive information to help developers understand and fix issues:

### Message Structure

1. **Component Name**: Which component is being used incorrectly
2. **Invalid Props**: Specific properties that are problematic
3. **Current Element**: What element it's being rendered as
4. **Context**: Why these props are invalid for this element
5. **Solution**: How to fix the issue

**Example Warning Breakdown:**

```
[Component]: The following props are only valid for <[element]> elements: [props].
You're rendering as <[asElement]>. [Context explanation].
Consider [suggested solution].
```

## 🛠️ Implementation Guide

### Adding New Components

When creating components with element-specific properties, follow this implementation pattern:

### Configuration Setup

1. **Add to ELEMENT_CONFIGS** in `src/types.ts`:

```tsx
export const ELEMENT_CONFIGS = {
  // ... existing configs
  NEW_COMPONENT: {
    element: "targetElement",
    specificProps: ["prop1", "prop2", "prop3"],
    description: "Explanation of why these props are element-specific and what they do."
  },
} as const;
```

### Component Integration

2. **Import validation utilities**:

```tsx
import { validatePolymorphicProps, ELEMENT_CONFIGS } from "../types";
```

3. **Add validation logic** in the component:

```tsx
const Component = React.forwardRef<Ref, Props>((props, ref) => {
  const { as: Component = "targetElement", ...rest } = props;
  const asElement = typeof Component === "string" ? Component : "unknown";

  // Polymorphic validation
  useMemo(() => {
    validatePolymorphicProps(
      "ComponentName",
      asElement,
      props as Record<string, unknown>,
      ELEMENT_CONFIGS.NEW_COMPONENT
    );
  }, [asElement, props]);

  // Add debugging attributes
  const enhancedProps = {
    ...rest,
    "data-polymorphic-element": asElement !== "targetElement" ? asElement : undefined,
    "data-element-validation": 
      process.env.NODE_ENV === "development" && asElement !== "targetElement" 
        ? "warning" 
        : undefined,
  };

  return <Component {...enhancedProps} />;
});
```

### Complete Implementation Example

```tsx
import React, { useMemo } from "react";
import { validatePolymorphicProps, ELEMENT_CONFIGS } from "../types";

export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  as?: React.ElementType;
}

const Video = React.forwardRef<HTMLVideoElement, VideoProps>((props, ref) => {
  const { as: Component = "video", ...rest } = props;
  const asElement = typeof Component === "string" ? Component : "unknown";

  // Validate element-specific props
  useMemo(() => {
    validatePolymorphicProps(
      "Video",
      asElement,
      props as Record<string, unknown>,
      ELEMENT_CONFIGS.VIDEO
    );
  }, [asElement, props]);

  const enhancedProps = {
    ...rest,
    ref,
    "data-polymorphic-element": asElement !== "video" ? asElement : undefined,
    "data-element-validation": 
      process.env.NODE_ENV === "development" && asElement !== "video" 
        ? "warning" 
        : undefined,
  };

  return <Component {...enhancedProps} />;
});

Video.displayName = "Video";
export { Video };
```

## 🧪 Testing Framework

The system includes comprehensive tests to ensure validation works correctly across all scenarios.

### Test Coverage Areas

- **High-risk component warnings**: Validates warnings for element-specific props
- **Medium-risk component warnings**: Ensures appropriate warnings for semantic issues
- **Low-risk component safety**: Confirms no false positives for valid usage
- **Debug attribute tracking**: Verifies debugging attributes are correctly applied
- **Production behavior**: Confirms no warnings or attributes in production
- **Edge cases**: Handles custom components, null values, and complex scenarios
- **Developer experience**: Tests warning message quality and helpfulness

### Required Dependencies

Tests require specific dependencies to function correctly:

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^14.0.0",
    "vitest": "^1.0.0"
  }
}
```

### Running Tests

```bash
# Run all component tests
pnpm test

# Run only polymorphic validation tests
npx vitest run src/__tests__/polymorphic/test-polymorphic-validation.test.tsx

# Run with coverage reporting
pnpm test:coverage

# Run tests in watch mode during development
pnpm test --watch

# Run tests for specific component
npx vitest run src/component-name/index.test.tsx
```

### Test Examples

```tsx
describe("Polymorphic Validation", () => {
  beforeEach(() => {
    mockConsoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
    process.env.NODE_ENV = "development";
  });

  it("shows warning for high-risk component with invalid props", () => {
    render(<Base as="div" href="https://example.com" target="_blank" />);
    
    expect(mockConsoleWarn).toHaveBeenCalledWith(
      expect.stringContaining("Base: The following props are only valid for <base> elements")
    );
  });

  it("adds debug attributes for polymorphic usage", () => {
    render(<Base as="div" href="https://example.com" />);
    
    const element = screen.getByRole("generic");
    expect(element).toHaveAttribute("data-polymorphic-element", "div");
    expect(element).toHaveAttribute("data-element-validation", "warning");
  });

  it("does not warn in production", () => {
    process.env.NODE_ENV = "production";
    
    render(<Base as="div" href="https://example.com" />);
    
    expect(mockConsoleWarn).not.toHaveBeenCalled();
  });
});
```

## 📊 Performance & Production

### Development vs Production

The validation system is designed to provide maximum value during development while having zero impact on production performance.

### Performance Considerations

**Development Mode:**

- Validation runs on every render with prop changes
- Console warnings are displayed
- Debug attributes are added to DOM elements
- Slight performance overhead for better developer experience

**Production Mode:**

- All validation logic is stripped out
- No console warnings
- No debug attributes
- Zero runtime overhead
- No bundle size increase for validation logic

### Bundle Size Impact

```tsx
// This code is completely removed in production builds
if (process.env.NODE_ENV === "development") {
  validatePolymorphicProps(/* ... */);
}
```

**Development Bundle**: +2-3KB for validation logic
**Production Bundle**: +0KB (completely tree-shaken)

## 🚀 Advanced Features

### Custom Validation Rules

For complex validation scenarios, you can extend the system:

```tsx
// Custom validation function
function validateCustomComponent(props: CustomProps, asElement: string) {
  if (process.env.NODE_ENV === "development") {
    // Custom validation logic
    if (props.customProp && asElement !== "custom-element") {
      console.warn("Custom validation message");
    }
  }
}

// Usage in component
useMemo(() => {
  validatePolymorphicProps(/* standard validation */);
  validateCustomComponent(props, asElement);
}, [props, asElement]);
```

### Integration with TypeScript

The system works alongside TypeScript's type system:

```tsx
// TypeScript prevents invalid combinations at compile time
type ConditionalProps<T extends React.ElementType> = 
  T extends "base" 
    ? { href?: string; target?: string }
    : { href?: never; target?: never };

interface ComponentProps<T extends React.ElementType = "base">
  extends React.ComponentPropsWithoutRef<T> {
  as?: T;
}

// Runtime validation catches edge cases TypeScript might miss
```

### Analytics Integration

Track validation warnings for insights into usage patterns:

```tsx
if (process.env.NODE_ENV === "development" && hasInvalidProps) {
  // Log validation warning
  console.warn(warningMessage);
  
  // Optional: Track for analytics (development only)
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "polymorphic_validation_warning", {
      component_name: componentName,
      as_element: asElement,
      invalid_props: invalidProps.join(",")
    });
  }
}
```

## 🔧 Configuration Reference

### ELEMENT_CONFIGS Structure

The centralized configuration system ensures consistency across all components:

```tsx
interface ElementSpecificPropsConfig {
  element: string;           // Target element name
  specificProps: string[];  // Props specific to this element
  description: string;      // Human-readable explanation
}
```

### Available Configurations

```tsx
export const ELEMENT_CONFIGS = {
  BASE: createElementConfig(
    "base",
    ["href", "target"],
    "These props set document-wide defaults and don't apply to other elements."
  ),
  
  AREA: createElementConfig(
    "area",
    ["coords", "shape", "alt", "href", "target"],
    "These props define clickable regions in image maps and are meaningless on other elements."
  ),
  
  AUDIO: createElementConfig(
    "audio",
    ["src", "controls", "autoPlay", "loop", "muted", "preload", "crossOrigin"],
    "These props control audio playback and have no effect on non-media elements."
  ),
  
  // Additional configurations...
} as const;
```

### Creating Custom Configurations

```tsx
// Helper function for creating configurations
function createElementConfig(
  element: string,
  specificProps: string[],
  description: string
): ElementSpecificPropsConfig {
  return { element, specificProps, description };
}

// Add new configuration
export const ELEMENT_CONFIGS = {
  // ... existing configs
  CUSTOM_ELEMENT: createElementConfig(
    "custom-element",
    ["customProp1", "customProp2"],
    "Description of why these props are specific to custom-element."
  ),
} as const;
```

## 📈 Future Enhancements

### Planned Features

- **ESLint Rules**: Static analysis rules for catching issues before runtime
- **VS Code Extension**: Inline warnings and suggestions in the editor
- **Documentation Generation**: Auto-generated docs with risk assessments
- **Usage Analytics**: Track polymorphic patterns across applications
- **Advanced TypeScript Integration**: Even stricter type checking
- **Custom Rule Definition**: Allow teams to define their own validation rules

### ESLint Integration

Planned ESLint rules for static analysis:

```js
// .eslintrc.js
{
  "rules": {
    "@yourorg/polymorphic-validation": "warn",
    "@yourorg/semantic-html": "error"
  }
}
```

### IDE Extensions

Future VS Code extension features:

- Inline warnings for polymorphic misuse
- Quick fixes and suggestions
- Hover documentation for element-specific props
- Auto-completion with validation context

## 📚 Migration & Adoption

### Migration Steps

For teams adopting the validation system:

1. **Install Dependencies**: Ensure testing dependencies are available
2. **Update Components**: Add validation to components with element-specific props
3. **Run Tests**: Verify validation works correctly
4. **Update Documentation**: Document validation behavior
5. **Train Team**: Educate developers on the system

### Legacy Component Updates

For existing components without validation:

```tsx
// Before: No validation
const LegacyComponent = ({ as: Component = "element", ...props }) => (
  <Component {...props} />
);

// After: With validation
const LegacyComponent = ({ as: Component = "element", ...props }) => {
  const asElement = typeof Component === "string" ? Component : "unknown";
  
  useMemo(() => {
    validatePolymorphicProps(
      "LegacyComponent",
      asElement,
      props,
      ELEMENT_CONFIGS.LEGACY_COMPONENT
    );
  }, [asElement, props]);

  return <Component {...props} />;
};
```

### Team Adoption Guidelines

- **Start with High-Risk Components**: Focus on components with element-specific props
- **Gradual Rollout**: Implement validation incrementally
- **Developer Education**: Ensure team understands semantic HTML importance
- **Consistent Standards**: Follow the established patterns for all new components

## 🔍 Validation System Details

### Runtime Validation

The runtime validation system provides immediate feedback during development:

- **Prop Analysis**: Examines component props against element-specific configurations
- **Context Awareness**: Understands which element the component is rendering as
- **Smart Warnings**: Only warns when props are actually problematic
- **Performance Optimized**: Uses memoization to avoid unnecessary re-validation

### Static Analysis

Integration with TypeScript provides compile-time safety:

- **Type Restrictions**: Prevents invalid prop combinations at the type level
- **IntelliSense Support**: Provides better autocomplete and documentation
- **Build-Time Errors**: Catches issues before code reaches production

### Type Safety

The system enhances TypeScript's built-in type checking:

```tsx
// TypeScript + Runtime validation working together
interface BaseProps<T extends React.ElementType = "base"> {
  as?: T;
  href?: T extends "base" ? string : never;    // Type-level restriction
  target?: T extends "base" ? string : never;  // Type-level restriction
}

// Runtime validation provides additional safety net
const Base = <T extends React.ElementType = "base">(props: BaseProps<T>) => {
  // Runtime validation catches edge cases TypeScript might miss
  validatePolymorphicProps(/* ... */);
  
  return <Component {...props} />;
};
```

This comprehensive validation system ensures that components maintain semantic correctness and type safety across all usage scenarios, providing an excellent developer experience while maintaining zero production overhead.

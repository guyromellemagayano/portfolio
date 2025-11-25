---
apply: by file patterns
patterns: apps/**/*.tsx, packages/**/*.tsx
---

# React + TypeScript Standards

## Component Architecture

- **Main Components**: Use `setDisplayName` for proper component naming, extend
  `React.ComponentProps<typeof ElementType>` + `ComponentProps` for utility props
- **Sub-components**: Use `useComponentId` hook internally, receive `internalId`/`debugMode` props directly, use
  `setDisplayName`, `hasMeaningfulText` for content validation
- **Component Props**: Extend `React.ComponentProps<typeof BaseComponent>` + `ComponentProps` for utility props
- **Consistent Prop Names**: All components use `internalId`/`debugMode` (external props) from `ComponentProps`
- **Compound Components**: Manually attach sub-components as properties to main component
- **Performance**: Use `React.memo` with custom comparison functions for expensive components
- **State Management**: Use custom hooks for complex state logic, Context for shared state
- **Error Boundaries**: Implement error boundaries for component error handling
- **Loading States**: Provide loading, error, and empty states for all data-dependent components

## File Structure Standards

```bash
components/component/
├── Component.tsx              # Main component with compound type definition
├── Component.module.css       # Main styles
├── index.ts                   # Public exports
├── __tests__/                 # Main tests
│   ├── Component.test.tsx
│   └── Component.integration.test.tsx
├── constants/
│   └── Component.i18n.ts      # Internationalization labels
├── _internal/                 # Sub-components
│   ├── index.ts
│   ├── ComponentSub/          # Each sub-component
│   │   ├── ComponentSub.tsx   # Inline types, no separate .types.ts
│   │   ├── ComponentSub.module.css
│   │   ├── index.ts
│   │   └── __tests__/
└── _data/                     # Data and queries
    ├── index.ts
    ├── Component.data.ts
    ├── Component.queries.ts
    └── Component.types.ts
```

## Utility Function Standards

- **`useComponentId`**: For ID generation and debug mode in sub-components
- **`setDisplayName`**: For component naming in all components
- **`hasMeaningfulText`**: For content validation in sub-components
- **`isValidLink`**: For link validation
- **`getLinkTargetProps`**: For link target/rel attributes
- **`cn`**: For className composition from `@web/lib`

## TypeScript Standards

- **Strict mode**: Always use strict TypeScript
- **Type Co-location**: Keep types close to their usage - use inline types for component-specific interfaces
- **Interface Naming**: `ComponentProps`, `ComponentCompoundComponent`
- **Export Types**: Re-export types from index files only when shared across multiple components
- **Component Props**: Extend base component props + utility props
- **Avoid Separate Types Files**: Don't create separate `.types.ts` files for single-component interfaces - use inline
  types instead
- **Compound Component Types**: Define compound component types inline in main component file
- **Generic Types**: Use generics for reusable component patterns
- **Discriminated Unions**: Use discriminated unions for component states
- **Utility Types**: Leverage TypeScript utility types for complex type transformations
- **Type Guards**: Implement type guards for runtime type checking

## Testing Standards

- **Vitest**: Use Vitest for all testing
- **RTL**: Use React Testing Library for component tests
- **Mocking**: Mock dependencies properly, use `vi.mock()`
- **Globals**: Import `describe`, `it`, `expect`, `afterEach`, `vi` explicitly
- **Test Structure**: Arrange/Act/Assert pattern
- **Cleanup**: Use `afterEach(cleanup)` in all test files

### Standard Test Categories

Every component should include these test categories:

#### **1. Basic Rendering Tests**

- ✅ Renders children correctly
- ✅ Applies custom className
- ✅ Renders with debug mode enabled
- ✅ Renders with custom component ID
- ✅ Passes through HTML attributes

#### **2. Content Validation Tests**

- ✅ Does not render when no content
- ✅ Handles null/undefined/empty children
- ✅ Validates content with `hasMeaningfulText`

#### **3. Debug Mode Tests**

- ✅ Applies data-debug-mode when enabled
- ✅ Does not apply when disabled/undefined

#### **4. Component Structure Tests**

- ✅ Renders as correct element type
- ✅ Applies correct CSS classes
- ✅ Combines CSS module + custom classes

#### **5. Ref Forwarding Tests**

- ✅ Forwards ref correctly
- ✅ Ref points to correct element

#### **6. Accessibility Tests**

- ✅ Proper semantic structure
- ✅ Correct data attributes for debugging

#### **7. Edge Cases Tests**

- ✅ Complex children content
- ✅ Special characters
- ✅ Empty strings

#### **8. Component-Specific Tests**

- ✅ Test unique component features (e.g., `brandName` for FooterBrand, `href` for CardCta)
- ✅ Test component-specific logic and behavior

### Test File Structure

```typescript
import React from "react";
import {cleanup, render, screen} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {ComponentName} from "../ComponentName";

// Mock dependencies
vi.mock("@guyromellemagayano/components", () => ({
  Div: vi.fn(({children, ...props}) => (
    <div data - testid = "grm-div"
{...
  props
}
>
{
  children
}
</div>
)),
}))
;

vi.mock("@guyromellemagayano/utils", () => ({
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../ComponentName.module.css", () => ({
  default: {componentName: "componentName"},
}));

describe("ComponentName", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    // Test cases...
  });

  describe("Content Validation", () => {
    // Test cases...
  });

  // Additional test categories...
});
```

## Internationalization (i18n) Standards

### File Naming Conventions

- **Use dot notation**: `Component.i18n.ts` (not `ComponentLabels.ts` or `ComponentLabels.i18n.ts`)
- **Consistent naming**: All i18n files follow the pattern `{ComponentName}.i18n.ts`
- **Clear intent**: The `.i18n.ts` extension immediately indicates internationalization purpose
- **Future-ready**: Perfect for Sanity CMS + third-party i18n package integration

### i18n File Structure

```typescript
// ============================================================================
// COMPONENT INTERNATIONALIZATION
// ============================================================================

/** `ComponentI18n` type. */
export type ComponentI18n = Readonly<Record<string, string>>;

/** `COMPONENT_I18N` object. */
export const COMPONENT_I18N = {
  // Action labels
  cta: "Call to action",
  submit: "Submit",
  cancel: "Cancel",

  // Content labels
  title: "Title",
  description: "Description",

  // Navigation labels
  goBack: "Go back",
  nextPage: "Next page",

  // Error messages
  invalidData: "Invalid data provided",
  requiredField: "This field is required",

  // Accessibility labels
  ariaLabel: "Accessible label",
  ariaDescription: "Accessible description",
} as const satisfies ComponentI18n;
```

### i18n Integration Patterns

- **Import pattern**: `import { COMPONENT_I18N } from "./constants/Component.i18n";`
- **Usage pattern**: `{COMPONENT_I18N.cta}` or `aria-label={COMPONENT_I18N.ariaLabel}`
- **Type safety**: Use `satisfies ComponentI18n` for compile-time validation
- **Const assertion**: Use `as const` for literal type inference
- **Readonly**: Use `Readonly<Record<string, string>>` for immutability

### i18n Testing Standards

```typescript
// Mock i18n constants in tests
vi.mock("../constants/Component.i18n", () => ({
  COMPONENT_I18N: {
    cta: "Read article",
    goBack: "Go back to articles",
    invalidData: "Invalid article data",
    // ... other labels
  },
}));
```

## Styling Standards

- **Tailwind + CSS Modules**: Use `cn()` helper for className composition from `@web/lib`
- **No global leaks**: Keep styles scoped to components
- **CSS Modules**: Co-locate with components

## Export Patterns

- **Internal Components**: Use `export { ComponentInternal as Component }` for internal components
- **Type Exports**: Re-export types from index files only when shared across multiple components
- **Public API**: Clean exports from main index files
- **Avoid Cyclic Dependencies**: Don't create circular imports between components and their types
- **Compound Components**: Manually attach sub-components as properties

## Dependency Management

### **Avoiding Cyclic Dependencies**

- **Inline Types**: Use inline type definitions for component-specific interfaces
- **Self-Contained Components**: Each component should be able to function without importing types from sibling
  components
- **Shared Types**: Only create separate `.types.ts` files for types used across multiple components
- **Import Hierarchy**: Maintain clear import hierarchy - parent components can import from children, but not vice versa

### **Type Organization**

- **Component-Specific Types**: Define interfaces directly in the component file
- **Shared Types**: Place in `_data/Component.types.ts` or root `Component.types.ts`
- **Utility Types**: Keep in `@guyromellemagayano/utils` or `@guyromellemagayano/hooks`

### **Type Composition & Scope Guidelines**

#### **1. Component-Level Types (Inline)**

```typescript
// ✅ GOOD: Inline types for single-component interfaces
interface ComponentProps
  extends Omit<React.ComponentProps<"elementType">, "children">,
    ComponentProps {
  /** Component-specific prop */
  customProp?: string;
}
```

**When to use**: Component-specific interfaces used only by that component

#### **2. Sub-Component Types (Inline)**

```typescript
// ✅ GOOD: Inline types for sub-components
interface SubComponentProps
  extends Omit<React.ComponentProps<typeof ElementType>, "children">,
    ComponentProps {
  /** Sub-component specific prop */
  subProp?: string;
}
```

**When to use**: Sub-component interfaces used only within the component tree

#### **3. Shared Component Types (Separate File)**

```typescript
// ✅ GOOD: Separate file for types shared across multiple components
// Component.types.ts
export interface SharedComponentProps {
  /** Shared prop used by multiple components */
  sharedProp: string;
}
```

**When to use**: Types used by multiple components in the same feature

#### **4. Data Types (Data Folder)**

```typescript
// ✅ GOOD: Data-specific types in _data folder
// _data/Component.data.ts
export interface ComponentData {
  /** Component title */
  title: string;
  /** Component description */
  description: string;
}

export type ComponentLink = {
  kind: "internal" | "external";
  label: string;
  href: string;
  newTab?: boolean;
  rel?: string;
};
```

**When to use**: Types related to data fetching, API responses, or data structures

#### **5. Utility Types (Packages)**

```typescript
// ✅ GOOD: Utility types in packages
// @guyromellemagayano/utils
export interface ComponentProps {
  internalId?: string;
  debugMode?: boolean;
}
```

**When to use**: Types used across multiple features or applications

#### **6. Compound Component Types (Main Component)**

```typescript
// ✅ GOOD: Compound component types in main component file
type ComponentCompoundComponent = React.ComponentType<ComponentProps> & {
  SubComponent: typeof SubComponent;
};
```

**When to use**: Types that define the compound component structure

### **Type Placement Hierarchy**

```bash
Component/
├── Component.tsx              # Main component + compound types
├── Component.types.ts         # Shared types (only if needed)
├── _internal/
│   └── SubComponent/
│       └── SubComponent.tsx   # Inline sub-component types
└── _data/
    ├── Component.data.ts      # Data types
    └── Component.types.ts     # Data-specific types
```

### **Type Composition Patterns**

#### **Base Component Props**

```typescript
// ✅ GOOD: Extend base component props
interface ComponentProps
  extends Omit<React.ComponentProps<"elementType">, "children">,
    ComponentProps {
  // Component-specific props
}
```

#### **Compound Component Props**

```typescript
// ✅ GOOD: Compound component with sub-components
type ComponentCompoundComponent = React.ComponentType<ComponentProps> & {
  SubComponent: typeof SubComponent;
  AnotherSub: typeof AnotherSub;
};
```

#### **Data Props**

```typescript
// ✅ GOOD: Data-driven props
interface ComponentProps {
  data?: ComponentData;
  onDataChange?: (data: ComponentData) => void;
}
```

#### **Event Props**

```typescript
// ✅ GOOD: Event handler props
interface ComponentProps {
  onClick?: (event: React.MouseEvent) => void;
  onValueChange?: (value: string) => void;
}
```

### **Type Naming Conventions**

- **Component Props**: `ComponentNameProps`
- **Compound Component**: `ComponentNameCompoundComponent`
- **Data Types**: `ComponentNameData`
- **Event Types**: `ComponentNameEvent`
- **Utility Types**: `ComponentNameUtils`

### **Type Export Patterns**

```typescript
// ✅ GOOD: Export only what's needed
// Component.tsx
interface ComponentProps { /* ... */
}

type ComponentCompoundComponent = /* ... */;

// index.ts
export {Component} from "./Component";
export type {ComponentCompoundComponent} from "./Component";
```

## Component Examples

### Main Component

```typescript
import {COMPONENT_I18N} from "./constants/Component.i18n";

interface ComponentProps
  extends Omit<React.ComponentProps<"elementType">, "children">,
    ComponentProps {
  /** Optional custom prop override */
  customProp?: string;
}

type ComponentCompoundComponent = React.ComponentType<ComponentProps> & {
  /** A sub-component that provides specific functionality */
  SubComponent: typeof SubComponent;
};

/** Component with all props */
const Component = setDisplayName(function Component(props) {
  const {
    className,
    internalId,
    debugMode,
    customProp = DEFAULT_CUSTOM_PROP,
    ...rest
  } = props;

  const element = (
    <elementType
      {...rest}
  className = {cn(styles.component, className
)
}
  data - component - id = {internalId}
  data - debug - mode = {debugMode ? "true" : undefined}
  data - testid = "component-root"
  >
  <SubComponent customProp = {customProp}
  />
  < /elementType>
)
  ;

  return element;
} as ComponentCompoundComponent);

// ============================================================================
// COMPONENT COMPOUND COMPONENTS
// ============================================================================

Component.SubComponent = SubComponent;

export {Component};
```

### Sub-component

```typescript
interface SubComponentProps
  extends Omit<React.ComponentProps<typeof ElementType>, "children">,
    ComponentProps {
  /** Sub-component specific prop */
  customProp?: string;
}

/** Sub-component for specific functionality. */
const SubComponent: React.FC<SubComponentProps> = setDisplayName(
  function SubComponent(props) {
    const {className, internalId, debugMode, customProp, ...rest} = props;

    const {id, isDebugMode} = useComponentId({
      internalId,
      debugMode,
    });

    if (!hasMeaningfulText(customProp)) return null;

    const element = (
      <ElementType
        {...rest}
    className = {cn(styles.subComponent, className
  )
  }
    data - sub - component - id = {id}
    data - debug - mode = {isDebugMode ? "true" : undefined}
    data - testid = "sub-component-root"
      >
      {customProp}
      < /ElementType>
  )
    ;

    return element;
  }
);

export {SubComponent};
```

## Import Organization

### **Standard Import Order**

```typescript
// 1. React
import React from "react";

// 2. External packages
import {useComponentId} from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  hasMeaningfulText,
  setDisplayName,
} from "@guyromellemagayano/utils";

// 3. Internal packages
import {cn} from "@web/lib";

// 4. Relative imports (data first, then internal, then parent)
import {type ComponentData} from "../_data";
import {SubComponent} from "./_internal";
import styles from "./Component.module.css";
```

### **Type Imports**

```typescript
// ✅ GOOD: Use type imports for types
import {type ComponentProps} from "@guyromellemagayano/utils";
import {type ComponentData} from "../_data";

// ❌ BAD: Don't import types as values
import {ComponentProps} from "@guyromellemagayano/utils";
```

## Data Organization

### **Data File Structure**

```typescript
// _data/Component.data.ts
export const COMPONENT_DEFAULT_DATA = {
  title: "Default Title",
  description: "Default Description",
} as const;

// constants/Component.i18n.ts
export const COMPONENT_I18N = {
  title: "Component Title",
  subtitle: "Component Subtitle",
  cta: "Call to action",
} as const satisfies ComponentI18n;
```

### **Type Definitions**

```typescript
// _data/Component.types.ts
export interface ComponentData {
  /** Component title */
  title: string;
  /** Component description */
  description: string;
}

export type ComponentLink = {
  kind: "internal" | "external";
  label: string;
  href: string;
  newTab?: boolean;
  rel?: string;
};
```

### **Export Patterns**

```typescript
// _data/index.ts
// Data exports
export * from "./Component.data";
export * from "./Component.queries";

// Type exports
export * from "./Component.types";
```

<!-- markdownlint-disable MD013 MD024 MD036 MD051 -->
# 🚀 Monorepo Development Optimization Guide

A comprehensive guide for optimizing and standardizing development across **ALL applications** in the portfolio monorepo.

## 📋 Table of Contents

- [🎯 Quick Start](#quick-start)
- [📖 Overview](#overview)
- [🏗️ Universal Architecture](#universal-architecture)
- [🔧 Core Patterns & Conventions](#core-patterns--conventions)
- [📚 Component Standards](#component-standards)
- [🔄 Migration Guide](#migration-guide)
- [🧪 Testing Standards](#testing-standards)
- [🔒 Security & Type Safety](#security--type-safety)
- [✅ Compliance Checklist](#compliance-checklist)
- [🛠️ Troubleshooting](#troubleshooting)
- [📊 Expected Outcomes](#expected-outcomes)
- [🏆 Industry Standards Alignment](#industry-standards-alignment)
- [🎯 Conclusion](#conclusion)

<a id="quick-start"></a>

## 🎯 Quick Start

<a id="the-universal-rules-all-apps-must-follow"></a>

### The Universal Rules (ALL Apps MUST Follow)

1. **Type Organization**: ALWAYS use inline types - no separate type files
2. **Component Structure**: Use React.forwardRef + early returns + JSX element assignment
3. **File Organization**: Feature-first structure with consistent naming
4. **Security**: Minimal API surface - only export components, never types
5. **Performance**: Lazy loading + tree shaking + conditional rendering

<a id="implementation-priority"></a>

### Implementation Priority

1. **Start with `apps/web`** - Establish patterns
2. **Apply to `apps/storefront`** - Extend patterns
3. **Apply to `apps/admin`** - Complete standardization
4. **Future apps** - Follow established patterns

<a id="overview"></a>

## 📖 Overview

<a id="goals"></a>

### Goals

- **50-70% faster page loads** through intelligent code splitting
- **40-60% smaller bundle sizes** via tree shaking optimization
- **80% reduction in development time** spent finding and organizing code
- **90% component reusability** across features
- **95%+ testing coverage** with automated test structures

<a id="current-problems"></a>

### Current Problems

1. **Inconsistent patterns** across apps
2. **Poor code splitting** - All components load upfront
3. **Difficult to find files** - No clear naming conventions
4. **Limited reusability** - Components tightly coupled to specific apps
5. **Performance bottlenecks** - Large bundle sizes, slow initial loads

<a id="universal-architecture"></a>

## 🏗️ Universal Architecture

<a id="file-structure-applies-to-all-apps"></a>

### File Structure (Applies to ALL Apps)

```bash
apps/{app-name}/src/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Route groups
│   │   ├── (marketing)/          # Marketing pages
│   │   ├── (content)/            # Content pages
│   │   └── (auth)/               # Auth pages
│   ├── api/                      # API routes
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── providers.tsx             # Context providers
│
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components (atomic design)
│   │   ├── atoms/                # Smallest components
│   │   ├── molecules/            # Combinations of atoms
│   │   └── organisms/            # Complex components
│   ├── features/                 # Feature-specific components
│   ├── layouts/                  # Layout components
│   └── sections/                 # Page sections
│
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
├── types/                        # Global TypeScript types
├── styles/                       # Global styles and themes
└── assets/                       # Static assets
```

<a id="performance-benefits"></a>

### Performance Benefits

<a id="1-automatic-code-splitting"></a>

#### 1. Automatic Code Splitting

```typescript
// Before: Everything loads upfront
import { Header, Footer, Card, Prose } from '@/components'

// After: Lazy load by feature
const ArticleCard = lazy(() => import('@/components/features/articles/article-card'))
const DashboardHeader = lazy(() => import('@/components/features/dashboard/header'))
```

<a id="2-tree-shaking-optimization"></a>

#### 2. Tree Shaking Optimization

```typescript
// Before: Imports entire component library
import { Button } from '@/components'

// After: Only imports what you use
import { Button } from '@/components/ui/atoms/button'
```

<a id="3-route-based-performance"></a>

#### 3. Route-Based Performance

```typescript
// Route-specific code splitting (automatic)
// /articles → Only loads article components
// /dashboard → Only loads dashboard components

// Component-level code splitting
const ArticleCard = dynamic(() => import('@/components/features/articles/article-card'), {
  loading: () => <ArticleCardSkeleton />,
  ssr: false // For client-only components
})
```

<a id="core-patterns--conventions"></a>

## 🔧 Core Patterns & Conventions

<a id="1-type-organization-universal-rule"></a>

### 1. Type Organization (Universal Rule)

**ALWAYS use inline types - no separate type files, no exceptions.**

<a id="the-right-way-inline-types"></a>

#### ✅ **The Right Way: Inline Types**

```typescript
// components/section/Section.tsx
import React, { useId } from "react";
import {
  Div,
  Heading,
  Section as SectionComponent,
  type SectionProps as SectionComponentProps,
  type SectionRef as SectionComponentRef,
} from "@guyromellemagayano/components";
import { CommonWebAppComponentProps } from "@web/@types";

// Inline type definitions - ALWAYS
type SectionRef = SectionComponentRef;
interface SectionProps extends SectionComponentProps, CommonWebAppComponentProps {}

export const Section = React.forwardRef<SectionRef, SectionProps>(
  function Section(props, ref) {
    // Component implementation
  }
);
```

<a id="the-wrong-way-separate-type-files"></a>

#### ❌ **The Wrong Way: Separate Type Files**

```typescript
// ❌ DON'T DO THIS - Separate type files are deprecated
// components/section/@types/Section.ts
export interface SectionProps { ... }
export type SectionRef = ...;

// components/section/Section.tsx
import type { SectionProps, SectionRef } from './@types/Section'
```

<a id="2-component-structure-universal-rule"></a>

### 2. Component Structure (Universal Rule)

**Use React.forwardRef + early returns + JSX element assignment.**

<a id="required-pattern"></a>

#### ✅ **Required Pattern**

```typescript
export const Component = React.forwardRef<ComponentRef, ComponentProps>(
  function Component(props, ref) {
    const { children, className, _internalId, _debugMode, ...rest } = props;
    
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });
    
    // Early return for performance
    if (!children) return null;
    
    // ✅ REQUIRED: Assign JSX to const element
    const element = (
      <Div
        {...rest}
        ref={ref}
        className={cn(styles.component, className)}
        data-component-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="component-root"
      >
        {children}
      </Div>
    );

    // ✅ REQUIRED: Return the element variable
    return element;
  }
);
```

<a id="3-internalexternal-component-pattern"></a>

### 3. Internal/External Component Pattern

**For complex components that need multiple sub-components.**

<a id="required-structure"></a>

#### ✅ **Required Structure**

```typescript
// ============================================================================
// INTERNAL COMPONENT
// ============================================================================

interface InternalComponentProps extends ComponentProps {
  componentId?: string;
  isDebugMode?: boolean;
}

const InternalComponent = setDisplayName(
  React.forwardRef(function InternalComponent(props, ref) {
    const { children, className, componentId, isDebugMode, ...rest } = props;

    if (!children) return null;

    const element = (
      <Div
        {...rest}
        ref={ref}
        className={cn(styles.component, className)}
        data-component-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="component-root"
      >
        {children}
      </Div>
    );

    return element;
  }),
  "InternalComponent"
) as InternalComponentType;

// ============================================================================
// EXTERNAL COMPONENT
// ============================================================================

export const Component = setDisplayName(
  React.forwardRef(function Component(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <InternalComponent
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }),
  "Component"
) as ComponentType;
```

<a id="4-import-organization-universal-rule"></a>

### 4. Import Organization (Universal Rule)

**Consistent import order across all files.**

```typescript
// 1. React imports
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

// 2. External library imports
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// 3. Internal package imports
import {
  Button,
  Div,
  type DivProps,
  type DivRef,
} from "@guyromellemagayano/components";
import { setDisplayName, useComponentId } from "@guyromellemagayano/hooks";

// 4. Local type imports
import type { CommonWebAppComponentProps } from "@web/@types";

// 5. Local component imports
import { Container } from "@web/components/container";

// 6. Local utility imports
import { cn } from "@web/lib";

// 7. Local asset imports
import styles from "./Component.module.css";
```

<a id="5-usecomponentid-hook-integration-universal-rule"></a>

### 5. useComponentId Hook Integration (Universal Rule)

**Every component MUST integrate with useComponentId.**

```typescript
export const Component = setDisplayName(
  React.forwardRef(function Component(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <InternalComponent
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }),
  "Component"
) as ComponentType;
```

<a id="6-conditional-rendering-pattern-universal-rule"></a>

### 6. Conditional Rendering Pattern (Universal Rule)

**Use early returns for performance optimization.**

```typescript
const Component = setDisplayName(
  React.forwardRef(function Component(props, ref) {
    const { title, children, ...rest } = props;

    // Multiple condition checks
    if (!title && !children) return null;

    const element = (
      <Div ref={ref} {...rest}>
        {title && <Heading>{title}</Heading>}
        {children && <Div>{children}</Div>}
      </Div>
    );

    return element;
  }),
  "Component"
) as ComponentType;
```

<a id="7-css-module-integration-universal-rule"></a>

### 7. CSS Module Integration (Universal Rule)

**Use CSS modules with consistent class naming.**

```typescript
import styles from "./Component.module.css";

const Component = setDisplayName(
  React.forwardRef(function Component(props, ref) {
    const { children, className, ...rest } = props;

    if (!children) return null;

    const element = (
      <Div
        {...rest}
        ref={ref}
        className={cn(styles.component, className)}  // CSS module + custom className
        data-testid="component-root"
      >
        <Div className={styles.componentContent}>   // Nested CSS module classes
          {children}
        </Div>
      </Div>
    );

    return element;
  }),
  "Component"
) as ComponentType;
```

<a id="component-standards"></a>

## 📚 Component Standards

<a id="component-selection-guide"></a>

### Component Selection Guide

| Component Type | Pattern | Use Case | Example |
|----------------|---------|----------|---------|
| **Simple Component** | Direct Implementation | Basic UI elements | Section, Prose, Button |
| **Complex Component** | Internal/External | Multi-part components | Header, Footer, Container |
| **Compound Component** | Compound Pattern | Related sub-components | Icon, Card, Navigation |
| **Layout Component** | Direct Implementation | Page structure | BaseLayout, ArticleLayout |

<a id="component-architecture-summary"></a>

### Component Architecture Summary

| Component Type | Pattern Used | Complexity | Purpose |
|----------------|--------------|------------|---------|
| **Simple Components** | Direct Implementation | Low | Basic UI elements |
| **Complex Components** | Internal/External | High | Multi-part components |
| **Compound Components** | Compound Pattern | Medium | Related sub-components |
| **Layout Components** | Direct Implementation | Medium | Page structure |

<a id="component-evolution-pattern"></a>

### Component Evolution Pattern

All components follow the **established evolution pattern**:

1. **Inline types** - No separate type files
2. **useComponentId integration** - Consistent ID generation
3. **setDisplayName utility** - Automatic displayName assignment
4. **Conditional rendering** - Performance optimization
5. **CSS modules** - Scoped styling
6. **Comprehensive testing** - 95%+ coverage
7. **Accessibility** - ARIA attributes and keyboard support
8. **Security** - Data validation and sanitization

<a id="migration-guide"></a>

## 🔄 Migration Guide

<a id="step-1-set-up-path-aliases"></a>

### Step 1: Set Up Path Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/ui/*": ["./src/components/ui/*"],
      "@/features/*": ["./src/components/features/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/hooks/*": ["./src/hooks/*"]
    }
  }
}
```

<a id="step-2-create-component-template"></a>

### Step 2: Create Component Template

<a id="named-exports-recommended"></a>

#### Named Exports (Recommended)

```typescript
// components/ui/atoms/button/index.ts
export { Button } from './Button'

// components/ui/atoms/button/Button.tsx
import React from 'react'
import styles from './Button.module.css'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = function Button({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) {
  const element = (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      {...props}
    >
      {children}
    </button>
  );

  return element;
}

Button.displayName = 'Button'
```

<a id="step-3-type-organization-migration"></a>

### Step 3: Type Organization Migration

**Migrating from separate type files to inline types:**

```typescript
// ❌ BEFORE: Separate type file (deprecated)
// components/section/@types/Section.ts
export interface SectionProps { ... }
export type SectionRef = ...;

// components/section/Section.tsx
import type { SectionProps, SectionRef } from './@types/Section'
```

```typescript
// ✅ AFTER: Inline types (recommended)
// components/section/Section.tsx
import React, { useId } from "react";
import {
  Div,
  Heading,
  Section as SectionComponent,
  type SectionProps as SectionComponentProps,
  type SectionRef as SectionComponentRef,
} from "@guyromellemagayano/components";
import { CommonWebAppComponentProps } from "@web/@types";

// Inline type definitions
type SectionRef = SectionComponentRef;
interface SectionProps extends SectionComponentProps, CommonWebAppComponentProps {}

export const Section = React.forwardRef<SectionRef, SectionProps>(
  function Section(props, ref) {
    // Component implementation
  }
);
```

<a id="testing-standards"></a>

## 🧪 Testing Standards

<a id="why-vitest--jest"></a>

### Why Vitest > Jest

- **Native ESM Support**: Built for modern ES modules
- **Parallel Execution**: Tests run in parallel by default
- **Smart Caching**: Intelligent caching of test results
- **Workspace Awareness**: Native understanding of monorepo structures
- **TypeScript First**: Native TypeScript support

<a id="test-coverage-standards"></a>

### Test Coverage Standards

- **95%+ code coverage** for production components
- **100% test pass rate** with no flaky tests
- **Fast execution** (< 50ms per test file)
- **Comprehensive scenarios** including edge cases

<a id="test-structure"></a>

### Test Structure

```typescript
// Example test structure for all components
describe("ComponentName", () => {
  describe("Main Component", () => {
    it("renders with default props", () => {
      // Test implementation
    });
    
    it("forwards ref correctly", () => {
      // Test implementation
    });
  });

  describe("Props Handling", () => {
    it("applies custom className", () => {
      // Test implementation
    });
  });

  describe("Integration Tests", () => {
    it("works with other components", () => {
      // Test implementation
    });
  });
});
```

<a id="required-test-mocks"></a>

### Required Test Mocks

```typescript
// Mock external dependencies
vi.mock("@guyromellemagayano/components", () => ({
  Div: React.forwardRef<HTMLDivElement, any>(function MockDiv(props, ref) {
    return <div ref={ref} data-testid="div" {...props} />;
  }),
}));

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
  setDisplayName: vi.fn((component, displayName) => {
    component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));
```

<a id="security--type-safety"></a>

## 🔒 Security & Type Safety

<a id="1-information-hiding"></a>

### 1. Information Hiding

**Problem with exported types:**

```typescript
// ❌ Exposing internal structure
export interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  _internalState?: string  // ❌ Exposed to consumers
  _debugMode?: boolean     // ❌ Exposed to consumers
}

// Consumers can access internal details
import type { ButtonProps } from '@/components/ui/atoms/button'
const props: ButtonProps = {
  _internalState: 'hacked', // ❌ Can manipulate internal state
  _debugMode: true,         // ❌ Can enable debug mode
}
```

**Solution with internal types:**

```typescript
// ✅ Hiding internal structure
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  // Internal props hidden from consumers
  _internalState?: string
  _debugMode?: boolean
}

// Consumers can only use the component
import { Button } from '@/components/ui/atoms/button'
// No access to internal types = can't manipulate internal state
```

<a id="2-api-surface-reduction"></a>

### 2. API Surface Reduction

**Minimal API surface = fewer attack vectors**

```typescript
// ✅ Minimal API surface
interface ButtonProps { ... }
interface ButtonState { ... }
interface ButtonContext { ... }

// Only the component itself is exported
export const Button = function Button(props: ButtonProps) { ... }
// Consumers can only use the component, not internal types
```

<a id="3-implementation-flexibility"></a>

### 3. Implementation Flexibility

**Consumers can't depend on internal types**

```typescript
// ✅ Consumers can't depend on internal types
interface ButtonProps {
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg'
}

// Consumer can only use the component
import { Button } from '@/components/ui/atoms/button'
// No direct type dependency = implementation can change freely
```

<a id="compliance-checklist"></a>

## ✅ Compliance Checklist

<a id="type-safety-verification"></a>

### Type Safety Verification

- [ ] **Inline types only** - No separate `@types` or `models` folders
- [ ] **No exported types** - Only components are exported
- [ ] **Type imports correct** - Using `import type` for external types
- [ ] **Type inference working** - `typeof Component` works correctly
- [ ] **No type conflicts** - All TypeScript errors resolved

<a id="component-structure-verification"></a>

### Component Structure Verification

- [ ] **React.forwardRef used** - For components that need ref forwarding
- [ ] **Hooks at top level** - No conditional hook calls
- [ ] **Early returns implemented** - Performance optimization in place
- [ ] **Cross-environment safe** - Using `globalThis` for environment checks
- [ ] **displayName set** - For debugging purposes
- [ ] **JSX element assignment** - All JSX assigned to `const element` before return

<a id="file-organization-verification"></a>

### File Organization Verification

- [ ] **Feature-first structure** - Components organized by business features
- [ ] **Consistent naming** - Files use kebab-case, components use PascalCase
- [ ] **Index files present** - Clean exports through index files
- [ ] **CSS modules used** - All styling uses CSS modules
- [ ] **No redundant files** - No separate type files or unnecessary folders

<a id="security-verification"></a>

### Security Verification

- [ ] **Minimal API surface** - Only necessary exports
- [ ] **Internal types hidden** - No exposed implementation details
- [ ] **Type inference only** - No direct type imports by consumers
- [ ] **Controlled exports** - Only components exported, not types
- [ ] **No internal props exposed** - Internal props not in public interface

<a id="testing-verification"></a>

### Testing Verification

- [ ] **95%+ code coverage** - Comprehensive test coverage
- [ ] **All tests passing** - No failing or flaky tests
- [ ] **Fast execution** - Tests run quickly (< 50ms per file)
- [ ] **Edge cases covered** - Error handling and boundary conditions tested
- [ ] **Integration tests** - Component interactions tested

<a id="performance-verification"></a>

### Performance Verification

- [ ] **Bundle size optimized** - No unnecessary dependencies
- [ ] **Tree shaking working** - Only used code included
- [ ] **Lazy loading implemented** - Large components lazy loaded
- [ ] **CSS modules optimized** - Scoped styles working correctly
- [ ] **No memory leaks** - Proper cleanup in useEffect hooks

<a id="troubleshooting"></a>

## 🛠️ Troubleshooting

<a id="common-issues"></a>

### Common Issues

1. **Import Path Errors**
   - Verify path aliases in `tsconfig.json`
   - Check for typos in import statements
   - Ensure index files are properly exporting

2. **Bundle Size Issues**
   - Use bundle analyzer to identify large dependencies
   - Implement tree shaking for unused code
   - Consider code splitting for large components

3. **Performance Problems**
   - Monitor Core Web Vitals
   - Implement lazy loading for non-critical components
   - Optimize images and assets

4. **TypeScript Errors**
   - Ensure all components have proper type definitions
   - Use strict TypeScript configuration
   - Use `typeof` for component prop types when needed
   - **ALWAYS use inline types** - No separate type files, no exceptions

<a id="performance-monitoring"></a>

### Performance Monitoring

```typescript
// lib/utils/performance.ts
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start}ms`)
}

// Usage in components
measurePerformance('ArticleCard render', () => {
  // Component logic
})
```

<a id="expected-outcomes"></a>

## 📊 Expected Outcomes

<a id="performance-metrics"></a>

### Performance Metrics

- **Initial Bundle Size**: _40-60% reduction_
- **Page Load Time**: _50-70% faster_
- **Build Time**: _30-40% faster_
- **Developer Experience**: _80% less time finding files_
- **Code Reusability**: _90% of components reusable_
- **Testing Coverage**: _95%+ achievable_

<a id="developer-experience-improvements"></a>

### Developer Experience Improvements

- **Predictable file locations** - No more searching for components
- **Consistent patterns** - Same structure across all components
- **Better IDE support** - Autocomplete and refactoring work better
- **Easier onboarding** - New developers understand the codebase quickly
- **Reduced cognitive load** - Less time spent on organization decisions

<a id="industry-standards-alignment"></a>

## 🏆 Industry Standards Alignment

This guide aligns with industry-leading practices from:

- **Vercel**: Next.js App Router and deployment optimization
- **Netflix**: Micro-frontend architecture and performance optimization
- **Spotify**: Monorepo management and component organization
- **Airbnb**: TypeScript standards and code quality practices
- **Microsoft**: React patterns and developer experience optimization

<a id="conclusion"></a>

## 🎯 Conclusion

This universal standardization will transform your **entire monorepo** development experience by:

1. **Making ALL apps significantly faster** for users
2. **Reducing development time** spent on organization across the entire monorepo
3. **Improving code quality** through consistent patterns across all apps
4. **Enabling better team collaboration** with clear universal standards
5. **Future-proofing your entire codebase** for scalability
6. **Eliminating app-specific inconsistencies** and maintenance overhead

The key is to **start with one app, establish patterns, then apply to all apps**. Begin with `apps/web` to establish the universal patterns, then gradually expand to `apps/storefront`, `apps/admin`, and any future apps.

Remember: **Convention over configuration** - once the universal patterns are established, you won't need to think about organization anymore. The structure will guide you naturally to the right place for every piece of code across ALL apps.

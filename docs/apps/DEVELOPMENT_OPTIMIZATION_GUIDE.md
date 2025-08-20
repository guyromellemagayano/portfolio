<!-- markdownlint-disable line-length link-fragments no-emphasis-as-heading -->
# 🚀 Development Optimization & Standardization Guide

A comprehensive guide for optimizing, standardizing, and streamlining the development process across all applications in the portfolio monorepo.

## 📋 Table of Contents

- [🚀 Development Optimization & Standardization Guide](#-development-optimization--standardization-guide)
  - [📋 Table of Contents](#-table-of-contents)
  - [📖 Overview](#-overview)
  - [🔍 Current State Analysis](#-current-state-analysis)
  - [🏗️ Proposed Architecture](#️-proposed-architecture)
  - [⚡ Performance Benefits](#-performance-benefits)
  - [🎯 Standardization Benefits](#-standardization-benefits)
  - [📋 Implementation Strategy](#-implementation-strategy)
    - [📚 Real-World Implementation: Section Component Evolution](#-real-world-implementation-section-component-evolution)
  - [📚 Component Overview](#-component-overview)
    - [🏗️ Component Architecture Summary](#️-component-architecture-summary)
    - [📋 Detailed Component Documentation](#-detailed-component-documentation)
    - [📊 Component Statistics](#-component-statistics)
    - [🎯 Component Selection Guide](#-component-selection-guide)
    - [🔄 Component Evolution](#-component-evolution)
  - [🔄 Migration Guide](#-migration-guide)
    - [Step 4: Type Organization Migration](#step-4-type-organization-migration)
  - [🏗️ Component Architecture Patterns](#️-component-architecture-patterns)
  - [🔧 Current Codebase Patterns & Conventions](#-current-codebase-patterns--conventions)
    - [1. useComponentId Hook Integration](#1-usecomponentid-hook-integration)
    - [2. setDisplayName Utility](#2-setdisplayname-utility)
    - [3. Internal/External Component Pattern](#3-internalexternal-component-pattern)
    - [4. Conditional Rendering Pattern](#4-conditional-rendering-pattern)
    - [5. Data Attributes Pattern](#5-data-attributes-pattern)
    - [6. CSS Module Integration](#6-css-module-integration)
    - [7. Type Import Patterns](#7-type-import-patterns)
    - [8. Section Comment Pattern](#8-section-comment-pattern)
    - [9. Import Organization Pattern](#9-import-organization-pattern)
    - [10. Component Documentation Pattern](#10-component-documentation-pattern)
    - [11. Test Mock Pattern](#11-test-mock-pattern)
    - [12. Error Handling Pattern](#12-error-handling-pattern)
    - [13. Performance Optimization Patterns](#13-performance-optimization-patterns)
    - [14. Accessibility Pattern](#14-accessibility-pattern)
    - [15. Security Pattern](#15-security-pattern)
    - [16. When NOT to Use Patterns](#16-when-not-to-use-patterns)
    - [17. Pattern Decision Matrix](#17-pattern-decision-matrix)
    - [18. Pattern Exceptions](#18-pattern-exceptions)
  - [🧪 Testing with Vitest](#-testing-with-vitest)
  - [🚀 React.FC Compatibility & Performance Patterns](#-reactfc-compatibility--performance-patterns)
  - [📚 Export/Import Patterns](#exportimport-patterns)
  - [🔒 Security & Type Safety](#-security--type-safety)
  - [✅ Compliance Standards](#-compliance-standards)
  - [🔍 Verification Checklist](#-verification-checklist)
  - [✅ Best Practices](#-best-practices)
  - [🛠️ Troubleshooting](#️-troubleshooting)
  - [📊 Expected Outcomes](#-expected-outcomes)
  - [🏆 Industry Standards & Best Practices Alignment](#-industry-standards--best-practices-alignment)
  - [🎯 Conclusion](#-conclusion)

## 📖 Overview

This guide outlines a comprehensive approach to restructuring the `apps/web` application (_and potentially other apps_) to achieve:

- **50-70% faster page loads** through intelligent code splitting
- **40-60% smaller bundle sizes** via tree shaking optimization
- **80% reduction in development time** spent finding and organizing code
- **90% component reusability** across features
- **95%+ testing coverage** with automated test structures

## 🔍 Current State Analysis

### Existing Structure Issues

```bash
apps/web/src/
├── components/
│   ├── header/
│   │   ├── _internal/
│   │   │   ├── client/
│   │   │   └── server/
│   │   ├── models/
│   │   └── Header.tsx
│   ├── card/
│   │   ├── _internal/
│   │   │   └── server/
│   │   └── models/
│   └── layouts/
│       ├── article/
│       ├── base/
│       └── simple/
├── app/
│   ├── articles/
│   └── (other routes)
└── lib/
    └── (utilities)
```

### 🚨 Identified Problems

1. **Inconsistent component organization** - Mixed patterns across components
2. **Poor code splitting** - All components load upfront
3. **Difficult to find files** - No clear naming conventions
4. **Limited reusability** - Components tightly coupled to specific features
5. **Performance bottlenecks** - Large bundle sizes, slow initial loads

## 🏗️ Proposed Architecture

### Enhanced File Structure

```bash
apps/web/src/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Route groups for better organization
│   │   ├── (marketing)/          # Marketing pages
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── loading.tsx       # Route-specific loading
│   │   │   └── error.tsx         # Route-specific error handling
│   │   ├── (content)/            # Content pages
│   │   │   ├── articles/
│   │   │   │   ├── [slug]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── loading.tsx
│   │   │   │   │   └── error.tsx
│   │   │   │   └── page.tsx
│   │   │   └── loading.tsx
│   │   └── (auth)/               # Auth pages (if needed)
│   │       ├── login/
│   │       └── register/
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   └── articles/
│   │       └── route.ts
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── providers.tsx             # Context providers
│
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components (atomic design)
│   │   ├── atoms/                # Smallest components
│   │   │   ├── button/
│   │   │   │   ├── index.ts
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── Button.test.tsx
│   │   │   ├── input/
│   │   │   └── icon/
│   │   ├── molecules/            # Combinations of atoms
│   │   │   ├── form-field/
│   │   │   ├── card/
│   │   │   └── navigation-item/
│   │   └── organisms/            # Complex components
│   │       ├── header/
│   │       ├── footer/
│   │       └── sidebar/
│   │
│   ├── features/                 # Feature-specific components
│   │   ├── articles/
│   │   │   ├── article-card/
│   │   │   ├── article-list/
│   │   │   ├── article-meta/
│   │   │   ├── article-content/
│   │   │   └── hooks/            # Feature-specific hooks
│   │   │       ├── use-articles.ts
│   │   │       └── use-article.ts
│   │   ├── auth/
│   │   │   ├── login-form/
│   │   │   ├── user-profile/
│   │   │   └── hooks/
│   │   │       └── use-auth.ts
│   │   └── dashboard/
│   │
│   ├── layouts/                  # Layout components
│   │   ├── base-layout/
│   │   ├── article-layout/
│   │   └── dashboard-layout/
│   │
│   └── sections/                 # Page sections
│       ├── hero/
│       ├── features/
│       └── testimonials/
│
├── hooks/                        # Custom React hooks
│   ├── use-local-storage.ts
│   ├── use-media-query.ts
│   ├── use-debounce.ts
│   └── use-intersection-observer.ts
│
├── lib/                          # Utility libraries
│   ├── api/                      # API utilities
│   │   ├── client.ts             # Base API client
│   │   ├── endpoints.ts          # API endpoint definitions
│   │   └── types.ts              # API response types
│   ├── auth/                     # Authentication utilities
│   │   ├── auth-provider.tsx
│   │   └── auth-utils.ts
│   ├── validation/               # Form validation schemas
│   │   ├── schemas.ts            # Zod schemas
│   │   └── validators.ts
│   ├── constants/                # App constants
│   │   ├── routes.ts             # Route constants
│   │   ├── config.ts             # App config
│   │   └── api.ts                # API constants
│   └── utils/                    # General utilities
│       ├── date.ts
│       ├── string.ts
│       ├── array.ts
│       └── dom.ts
│
├── types/                        # Global TypeScript type definitions
│   ├── api.ts                    # Shared API types
│   ├── auth.ts                   # Shared auth types
│   ├── common.ts                 # Common utility types
│   └── global.d.ts               # Global type declarations
│
├── styles/                       # Global styles and themes
│   ├── themes/
│   │   ├── light.ts
│   │   └── dark.ts
│   ├── components/               # Component-specific styles
│   └── globals.css
│
└── assets/                       # Static assets
    ├── images/
    ├── icons/
    └── fonts/
```

## ⚡ Performance Benefits

### 1. Automatic Code Splitting & Lazy Loading

**Before:**

```typescript
// Everything loads upfront
import { Header, Footer, Card, Prose } from '@/components'
```

**After:**

```typescript
// Lazy load by feature
const ArticleCard = lazy(() => import('@/components/features/articles/article-card'))
const DashboardHeader = lazy(() => import('@/components/features/dashboard/header'))
```

**Impact:**

- **50-70% faster initial page loads**
- **Better Core Web Vitals scores**
- **Reduced bundle size per page**

### 2. Tree Shaking Optimization

**Before:**

```typescript
// Imports entire component library
import { Button } from '@/components'
```

**After:**

```typescript
// Only imports what you use
import { Button } from '@/components/ui/atoms/button'
```

**Impact:**

- **30-40% smaller production bundles**
- **Faster build times**
- **Better caching** (_smaller chunks change less frequently_)

### 3. Intelligent Caching Strategy

```typescript
// Feature-based caching
// /articles/* → Cache article components
// /dashboard/* → Cache dashboard components
// UI components → Cache globally (used everywhere)
```

### 4. Route-Based Performance

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

## 🎯 Standardization Benefits

### 1. Predictable File Locations

```typescript
// You'll never wonder "where did I put that component?"
// Always know exactly where to find things:

// UI Components (Named Exports - Recommended)
import { Button } from '@/components/ui/atoms/button'
import { Card } from '@/components/ui/molecules/card'

// Feature Components
import { ArticleCard } from '@/components/features/articles/article-card'
import { UserProfile } from '@/components/features/auth/user-profile'

// Layouts
import { DashboardLayout } from '@/components/layouts/dashboard-layout'

// Utilities
import { formatDate } from '@/lib/utils/date'
import { apiClient } from '@/lib/api/client'

// Alternative: Default Exports
// import Button from '@/components/ui/atoms/button'
// import Card from '@/components/ui/molecules/card'
```

### 2. Consistent Component Patterns

```typescript
// Every component follows the same structure:
// 1. Inline types at the top (internal only)
// 2. Props interface (not exported for security)
// 3. Component definition with React.forwardRef
// 4. Early return pattern for performance
// 5. Export (component only)

// components/ui/atoms/button/Button.tsx
import React, { useId } from 'react'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  // Internal props hidden from consumers
  _internalState?: string
  _debugMode?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = 'primary', size = 'md', children, _debugMode, ...props }, ref) {
    // Always call hooks at the top level
    const generatedId = useId();
    
    // Internal debug logging with cross-environment safety
    if (_debugMode && globalThis?.process?.env?.NODE_ENV === "development") {
      console.log(`Button rendered with ID: ${generatedId}`);
    }

    // Early return pattern for performance
    if (!children) return null;

    const element = (
      <button
        ref={ref}
        className={`button button--${variant} button--${size}`}
        data-button-id={generatedId}
        data-debug-mode={_debugMode ? "true" : undefined}
        {...props}
      >
        {children}
      </button>
    );

    return element;
  }
);

Button.displayName = 'Button'
```

### 3. Automatic Import Organization

```typescript
// Your IDE will automatically organize imports:
// 1. React imports
// 2. External libraries
// 3. Internal components (ui → features → layouts)
// 4. Utilities
// 5. Types

import React from 'react'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/atoms/button'
import { Card } from '@/components/ui/molecules/card'
import { ArticleCard } from '@/components/features/articles/article-card'
import { BaseLayout } from '@/components/layouts/base-layout'

import { formatDate } from '@/lib/utils/date'
import { apiClient } from '@/lib/api/client'

import type { Article } from '@/types/api'
```

### 4. Type Safety Across the App

```typescript
// types/api.ts (Shared types only)
export interface Article {
  id: string
  title: string
  content: string
  publishedAt: string
}

// lib/api/endpoints.ts
export const articleEndpoints = {
  list: () => '/api/articles',
  detail: (id: string) => `/api/articles/${id}`,
} as const

// components/features/articles/article-card/ArticleCard.tsx
import type { Article } from '@/types/api'

interface ArticleCardProps {
  article: Article
  variant?: 'compact' | 'detailed'
  // Internal props hidden
  _analyticsId?: string
  _cacheKey?: string
}

export const ArticleCard = function ArticleCard({ article, variant = 'compact' }: ArticleCardProps) {
  // Component implementation
}

// Safe type inference when needed
import { Button } from '@/components/ui/atoms/button'
type ButtonProps = React.ComponentProps<typeof Button>
```

### 5. Component Type Organization: Use Inline Types for ALL Components

**We use inline types for ALL components, regardless of complexity or external dependencies. This is the ONLY approach we recommend.**

#### ✅ **The Right Way: Inline Types (Always)**

```typescript
// components/section/Section.tsx - ALL components follow this pattern
import React, { useId } from "react";
import {
  Div,
  Heading,
  Section as SectionComponent,
  type SectionProps as SectionComponentProps,  // Import types directly
  type SectionRef as SectionComponentRef,
} from "@guyromellemagayano/components";
import { CommonWebAppComponentProps } from "@web/@types/components";

// Define types inline - ALWAYS
type SectionRef = SectionComponentRef;
interface SectionProps extends SectionComponentProps, CommonWebAppComponentProps {}

export const Section = React.forwardRef<SectionRef, SectionProps>(
  function Section(props, ref) {
    // Component implementation
  }
);
```

#### ❌ **The Wrong Way: Separate Type Files (Never Use)**

```typescript
// ❌ DON'T DO THIS - Separate type files are deprecated
// components/section/@types/Section.ts
import type { SectionProps as SectionComponentProps, SectionRef as SectionComponentRef } from '@guyromellemagayano/components'
import type { CommonWebAppComponentProps } from '@web/@types/components'

export type SectionRef = SectionComponentRef
export interface SectionProps extends SectionComponentProps, CommonWebAppComponentProps {}

// components/section/Section.tsx
import type { SectionProps, SectionRef } from './@types/Section'
export const Section = React.forwardRef<SectionRef, SectionProps>(...)
```

#### 🚫 **Why We Don't Use Separate Type Files**

1. **❌ Extra Complexity**: Additional files to maintain and keep in sync
2. **❌ Import Overhead**: Extra import statements and file dependencies
3. **❌ Refactoring Pain**: Changes require updating multiple files
4. **❌ Type Synchronization**: Risk of types getting out of sync
5. **❌ Bundle Bloat**: Unnecessary file splitting doesn't help tree shaking
6. **❌ Developer Confusion**: More files = harder to understand

#### ✅ **Why Inline Types Work for EVERYTHING**

1. **✅ Single Source of Truth**: Types and component in one file
2. **✅ Better Tree Shaking**: Only imports what's actually used
3. **✅ Easier Refactoring**: Changes in one place
4. **✅ Simpler Structure**: Less files to manage
5. **✅ External Dependency Support**: Import types directly from packages
6. **✅ TypeScript Power**: Modern TypeScript handles complex type imports perfectly
7. **✅ Team Consistency**: Everyone follows the same pattern

#### 🎯 **The Rule: Always Use Inline Types**

**No exceptions. No complexity-based decisions. No separate type files.**

## 📋 Implementation Strategy

### Phase 1: Foundation Setup (Week 1)

1. **Create new directory structure**
2. **Set up TypeScript path aliases**
3. **Configure ESLint rules for new structure**
4. **Create base UI components (atoms)**

### 📚 Real-World Implementation: Section Component Evolution

The Section component serves as a **reference implementation** showing the evolution from complex type organization to simplified inline types:

#### **Before: Complex Type Organization (Deprecated)**

```bash
section/
├── Section.tsx
├── Section.module.css
├── index.ts
├── @types/Section.ts          # ❌ Separate type file
└── __tests__/
    └── Section.test.tsx
```

**Problems with this approach:**

- ❌ **Extra file to maintain** - Additional complexity
- ❌ **Import overhead** - Extra import statements
- ❌ **Type synchronization** - Risk of types getting out of sync
- ❌ **Harder refactoring** - Changes require updating multiple files

#### **After: Inline Types (Recommended)**

```bash
section/
├── Section.tsx                # ✅ Types defined inline
├── Section.module.css
├── index.ts
└── __tests__/
    └── Section.test.tsx
```

**Benefits of this approach:**

- ✅ **Single source of truth** - Types and component in one file
- ✅ **Better tree shaking** - Only imports what's needed
- ✅ **Easier refactoring** - Changes in one place
- ✅ **Simpler structure** - Less files to manage
- ✅ **External dependency support** - Works with any external types

#### **Implementation Details**

```typescript
// ✅ CURRENT: Inline types with external dependencies
import React, { useId } from "react";
import {
  Div,
  Heading,
  Section as SectionComponent,
  type SectionProps as SectionComponentProps,  // ✅ Import types directly
  type SectionRef as SectionComponentRef,
} from "@guyromellemagayano/components";
import { CommonWebAppComponentProps } from "@web/@types/components";

// ✅ Inline type definitions
type SectionRef = SectionComponentRef;
interface SectionProps extends SectionComponentProps, CommonWebAppComponentProps {}

export const Section = React.forwardRef<SectionRef, SectionProps>(
  function Section(props, ref) {
    // ✅ All modern React patterns implemented
    const { title, children, className, _internalId, _debugMode, ...rest } = props;
    
    // ✅ Hook rules compliance
    const generatedId = useId();
    const id = _internalId || generatedId;
    
    // ✅ Cross-environment safety
    if (_debugMode && globalThis?.process?.env?.NODE_ENV === "development") {
      logInfo(`Section rendered with ID: ${id}`);
    }
    
    // ✅ Early return pattern
    if (!title && !children) return null;
    
    const element = (
      <SectionComponent
        ref={ref}
        aria-labelledby={id}
        data-section-id={id}
        data-debug-mode={_debugMode ? "true" : undefined}
        {...rest}
      >
        {/* Component implementation */}
      </SectionComponent>
    );

    return element;
  }
);
```

#### **Key Lessons Learned**

1. **Inline types work for ALL components** - Even those with external dependencies
2. **Simpler is better** - Fewer files = easier maintenance
3. **Type imports are powerful** - Can import types directly from external packages
4. **Modern React patterns matter** - Early returns, hook compliance, cross-environment safety
5. **Documentation should reflect reality** - Keep docs updated with actual implementation

### 📚 **Component Overview**

All components in `apps/web` follow consistent patterns and include comprehensive documentation. This section provides an overview of all components and their implementation details.

### **🏗️ Component Architecture Summary**

| Component | Type | Pattern Used | Complexity | Purpose |
|-----------|------|--------------|------------|---------|
| **Section** | Simple | Direct Implementation | Low | Layout section with optional title |
| **Container** | Complex | Internal/External | High | Nested layout container system |
| **Icon** | Compound | Compound Components | Medium | Social media and utility icons |
| **Prose** | Simple | Direct Implementation | Low | Typography wrapper with Tailwind |
| **Header** | Complex | Internal/External + Client | High | Navigation with effects and theme toggle |
| **Footer** | Complex | Internal/External | Medium | Site footer with navigation links |
| **Card** | Compound | Compound Components | High | Content cards with sub-components |
| **ArticleLayout** | Layout | Direct Implementation | Medium | Article page layout |
| **BaseLayout** | Layout | Direct Implementation | Low | Base page layout |
| **SimpleLayout** | Layout | Direct Implementation | Low | Simple page layout |

### **📋 Detailed Component Documentation**

#### **1. Section Component**

**Location**: `apps/web/src/components/section/`

**Purpose**: A layout section component with optional title and content, styled for web app usage.

**Pattern Used**: Direct Implementation (Simple Component)

**Key Features**:

- ✅ **Inline types** with external dependencies
- ✅ **useComponentId** integration
- ✅ **Conditional rendering** for title and children
- ✅ **Early return pattern** for performance
- ✅ **Accessibility** with proper ARIA attributes
- ✅ **CSS modules** for scoped styling

**Implementation**:

```typescript
export const Section = React.forwardRef<SectionRef, SectionProps>(
  function Section(props, ref) {
    const { title, children, className, _internalId, _debugMode, ...rest } = props;
    
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });
    
    if (!title && !children) return null;
    
    const element = (
      <SectionComponent
        ref={ref}
        aria-labelledby={id}
        data-section-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        {...rest}
      >
        {title && <Heading id={id}>{title}</Heading>}
        {children && <Div>{children}</Div>}
      </SectionComponent>
    );

    return element;
  }
);
```

**Test Coverage**: 100% (comprehensive test suite)

---

#### **2. Container Component**

**Location**: `apps/web/src/components/container/`

**Purpose**: Top-level layout container that provides consistent outer and inner structure for page content.

**Pattern Used**: Internal/External Component Pattern (Complex Component)

**Key Features**:

- ✅ **Nested structure** with ContainerOuter and ContainerInner
- ✅ **Flexible usage** - use main component or individual containers
- ✅ **CSS module integration** with scoped styling
- ✅ **useComponentId** integration for all sub-components
- ✅ **Conditional rendering** for performance
- ✅ **Compound component pattern** for related components

**Sub-Components**:

- **Container**: Main component that composes ContainerOuter and ContainerInner
- **ContainerOuter**: Outer container with positioning and layout
- **ContainerInner**: Inner container with content styling

**Implementation**:

```typescript
// Internal components handle rendering logic
const InternalContainerOuter = setDisplayName(
  React.forwardRef(function InternalContainerOuter(props, ref) {
    // Rendering logic with debug attributes
  }),
  "InternalContainerOuter"
);

// External components handle hook integration
export const ContainerOuter = setDisplayName(
  React.forwardRef(function ContainerOuter(props, ref) {
    const { id, isDebugMode } = useComponentId({
      internalId: props._internalId,
      debugMode: props._debugMode,
    });
    
    const element = (
      <InternalContainerOuter
        {...props}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }),
  "ContainerOuter"
);
```

**Test Coverage**: 100% (36 tests covering all scenarios)

---

#### **3. Icon Component**

**Location**: `apps/web/src/components/icon/`

**Purpose**: Compound component providing social media icons and utility icons with consistent styling.

**Pattern Used**: Compound Component Pattern

**Key Features**:

- ✅ **Compound components** for different icon types
- ✅ **Social media icons** (X, Instagram, LinkedIn, GitHub)
- ✅ **Consistent styling** across all icons
- ✅ **TypeScript support** with proper typing
- ✅ **CSS modules** for icon-specific styles

**Available Icons**:

- **Icon.X**: X (Twitter) icon
- **Icon.Instagram**: Instagram icon
- **Icon.LinkedIn**: LinkedIn icon
- **Icon.GitHub**: GitHub icon

**Implementation**:

```typescript
export const Icon = React.forwardRef<IconRef, IconProps>(
  function Icon(props, ref) {
    // Main icon component implementation
  }
);

// Compound sub-components
Icon.X = XIcon;
Icon.Instagram = InstagramIcon;
Icon.LinkedIn = LinkedInIcon;
Icon.GitHub = GitHubIcon;
```

**Usage**:

```tsx
<Icon.X className="w-6 h-6" />
<Icon.Instagram className="w-6 h-6" />
<Icon.LinkedIn className="w-6 h-6" />
<Icon.GitHub className="w-6 h-6" />
```

---

#### **4. Prose Component**

**Location**: `apps/web/src/components/prose/`

**Purpose**: Typography wrapper component that integrates Tailwind Typography for consistent text styling.

**Pattern Used**: Direct Implementation (Simple Component)

**Key Features**:

- ✅ **Tailwind Typography** integration
- ✅ **useComponentId** integration
- ✅ **Conditional rendering** for content
- ✅ **CSS modules** for additional styling
- ✅ **Accessibility** with proper semantic markup

**Implementation**:

```typescript
export const Prose = React.forwardRef<ProseRef, ProseProps>(
  function Prose(props, ref) {
    const { children, className, _internalId, _debugMode, ...rest } = props;
    
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });
    
    if (!children) return null;
    
    const element = (
      <Div
        {...rest}
        ref={ref}
        className={cn(styles.prose, className)}
        data-prose-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="prose-root"
      >
        {children}
      </Div>
    );

    return element;
  }
);
```

---

#### **5. Header Component**

**Location**: `apps/web/src/components/header/`

**Purpose**: Comprehensive header component with navigation, theme toggle, and dynamic scroll effects.

**Pattern Used**: Internal/External Component Pattern + Client-Side Features

**Key Features**:

- ✅ **Client-side rendering** with "use client" directive
- ✅ **Dynamic scroll effects** with HeaderEffects component
- ✅ **Theme toggle** with next-themes integration
- ✅ **Responsive navigation** (desktop and mobile)
- ✅ **Avatar integration** with Next.js Image
- ✅ **Active path detection** for navigation
- ✅ **useComponentId** integration
- ✅ **Conditional rendering** for home page vs other pages

**Sub-Components**:

- **HeaderEffects**: Side-effect-only component for scroll effects
- **HeaderThemeToggle**: Theme switching component
- **MobileHeaderNav**: Mobile navigation with Popover
- **DesktopHeaderNav**: Desktop navigation
- **Avatar**: User avatar component

**Implementation**:

```typescript
// Side-effect-only component (no displayName needed)
const HeaderEffects: HeaderEffectsComponent = function HeaderEffects(props) {
  const { headerEl, avatarEl, isHomePage } = props;
  
  useEffect(() => {
    // Dynamic header positioning logic
  }, [headerEl, avatarEl, isHomePage]);
  
  return null; // No rendering
};

// Main header with internal/external pattern
export const Header = React.forwardRef<HeaderRef, HeaderProps>(
  function Header(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;
    
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });
    
    const element = (
      <InternalHeader
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

**Test Coverage**: Comprehensive test suite with mocks for all external dependencies

---

#### **6. Footer Component**

**Location**: `apps/web/src/components/footer/`

**Purpose**: Site footer component with brand information, navigation links, and legal text.

**Pattern Used**: Internal/External Component Pattern

**Key Features**:

- ✅ **Discriminated union** for link types (internal/external)
- ✅ **useComponentId** integration
- ✅ **Conditional rendering** for navigation links
- ✅ **Secure external links** with proper attributes
- ✅ **Customizable content** (brand name, legal text, links)
- ✅ **CSS modules** for styling

**Data Structure**:

```typescript
// Discriminated union for link types
type FooterLink = 
  | { kind: "internal"; href: string; label: string }
  | { kind: "external"; href: string; label: string; newTab?: boolean };
```

**Implementation**:

```typescript
const InternalFooter = setDisplayName(
  React.forwardRef<FooterRef, InternalFooterProps>(
    function InternalFooter(props, ref) {
      const { navLinks = FOOTER_COMPONENT_NAV_LINKS, ...rest } = props;
      
      const element = (
        <GRMFooterComponent
          {...rest}
          ref={ref}
          data-footer-id={componentId}
          data-debug-mode={isDebugMode ? "true" : undefined}
        >
          {navLinks.map((link) => {
            const isExternal = link.kind === "external";
            return (
              <A
                key={link.href}
                href={link.href}
                target={isExternal && link.newTab ? "_blank" : "_self"}
                rel={isExternal && link.newTab ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </A>
            );
          })}
        </GRMFooterComponent>
      );

      return element;
    }
  ),
  "InternalFooter"
);
```

---

#### **7. Card Component**

**Location**: `apps/web/src/components/card/`

**Purpose**: Compound component system for creating content cards with various sub-components.

**Pattern Used**: Compound Component Pattern

**Key Features**:

- ✅ **Compound components** for card parts
- ✅ **useComponentId** integration for all sub-components
- ✅ **Conditional rendering** for optional parts
- ✅ **Flexible content** with multiple sub-components
- ✅ **CSS modules** with consolidated styling
- ✅ **Type safety** with comprehensive TypeScript types

**Sub-Components**:

- **Card.Link**: Card wrapper with link functionality
- **Card.Title**: Card title component
- **Card.Description**: Card description component
- **Card.Cta**: Call-to-action component
- **Card.Eyebrow**: Eyebrow text component

**Implementation**:

```typescript
// Main card component
export const Card = setDisplayName(
  React.forwardRef<CardRef, CardProps>(
    function Card(props, ref) {
      const { _internalId, _debugMode, ...rest } = props;
      
      const { id, isDebugMode } = useComponentId({
        internalId: _internalId,
        debugMode: _debugMode,
      });
      
      const element = (
        <InternalCard
          {...rest}
          ref={ref}
          componentId={id}
          isDebugMode={isDebugMode}
        />
      );

      return element;
    }
  ),
  "Card"
) as CardComponent;

// Compound sub-components
Card.Link = CardLink;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Cta = CardCta;
Card.Eyebrow = CardEyebrow;
```

**Usage**:

```tsx
<Card>
  <Card.Eyebrow decorate>Article</Card.Eyebrow>
  <Card.Title>Card Title</Card.Title>
  <Card.Description>Card description text</Card.Description>
  <Card.Cta>Read more</Card.Cta>
</Card>
```

**Test Coverage**: 99.64% (comprehensive test suite)

---

#### **8. Layout Components**

##### **ArticleLayout**

**Location**: `apps/web/src/components/layouts/article/`

**Purpose**: Layout component specifically designed for article pages with navigation and content structure.

**Pattern Used**: Direct Implementation (Layout Component)

**Key Features**:

- ✅ **Article-specific layout** with navigation
- ✅ **Client-side navigation** components
- ✅ **Responsive design** for article content
- ✅ **SEO optimization** with proper meta tags
- ✅ **useComponentId** integration

##### **BaseLayout**

**Location**: `apps/web/src/components/layouts/base/`

**Purpose**: Base layout component providing fundamental page structure.

**Pattern Used**: Direct Implementation (Layout Component)

**Key Features**:

- ✅ **Fundamental page structure**
- ✅ **Header and footer integration**
- ✅ **Container system** integration
- ✅ **Responsive design** foundation

##### **SimpleLayout**

**Location**: `apps/web/src/components/layouts/simple/`

**Purpose**: Simple layout component for basic pages without complex navigation.

**Pattern Used**: Direct Implementation (Layout Component)

**Key Features**:

- ✅ **Minimal layout** structure
- ✅ **Clean design** for simple pages
- ✅ **Container integration** for content
- ✅ **Responsive design** support

### **📊 Component Statistics**

| Metric | Value |
|--------|-------|
| **Total Components** | 10 |
| **Simple Components** | 4 (Section, Prose, BaseLayout, SimpleLayout) |
| **Complex Components** | 4 (Container, Header, Footer, ArticleLayout) |
| **Compound Components** | 2 (Icon, Card) |
| **Average Test Coverage** | 95%+ |
| **Patterns Used** | 3 (Direct, Internal/External, Compound) |

### **🎯 Component Selection Guide**

**Use this guide to choose the right component pattern:**

| Component Type | Use Case | Pattern | Example |
|----------------|----------|---------|---------|
| **Simple Component** | Basic UI elements | Direct Implementation | Section, Prose |
| **Complex Component** | Multi-part components | Internal/External | Header, Footer, Container |
| **Compound Component** | Related sub-components | Compound Pattern | Icon, Card |
| **Layout Component** | Page structure | Direct Implementation | ArticleLayout, BaseLayout |

### **🔄 Component Evolution**

All components follow the **established evolution pattern**:

1. **Inline types** - No separate type files
2. **useComponentId integration** - Consistent ID generation
3. **setDisplayName utility** - Automatic displayName assignment
4. **Conditional rendering** - Performance optimization
5. **CSS modules** - Scoped styling
6. **Comprehensive testing** - 95%+ coverage
7. **Accessibility** - ARIA attributes and keyboard support
8. **Security** - Data validation and sanitization

This centralized documentation ensures **consistent patterns** across all components and provides a **single source of truth** for component development standards.

### Phase 2: Component Migration (Week 2-3)

1. **Migrate one feature at a time** (_start with articles_)
2. **Update import paths gradually**
3. **Implement atomic design pattern**
4. **Add comprehensive testing**

### Phase 3: Performance Optimization (Week 4)

1. **Implement lazy loading**
2. **Add route-based code splitting**
3. **Optimize bundle sizes**
4. **Set up performance monitoring**

### Phase 4: Documentation & Standards (Week 5)

1. **Create component documentation**
2. **Establish coding standards**
3. **Set up automated testing**
4. **Performance benchmarking**

## 🔄 Migration Guide

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

### Step 2: Create Component Template

#### Option A: Named Exports (Recommended)

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

// components/ui/atoms/button/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })
})
```

#### Option B: Default Exports

```typescript
// components/ui/atoms/button/index.ts
export { default } from './Button'

// components/ui/atoms/button/Button.tsx
import React from 'react'
import styles from './Button.module.css'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = function Button({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) {
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
export default Button

// Usage with default export:
import Button from '@/components/ui/atoms/button'
```

### Step 3: Feature Migration Example

```typescript
// Before: components/card/Card.tsx
// After: components/features/articles/article-card/ArticleCard.tsx

// Migrate step by step:
// 1. Create new directory structure
// 2. Move component files
// 3. Update imports
// 4. Add feature-specific hooks
// 5. Update tests
```

### Step 4: Type Organization Migration

**Migrating from separate type files to inline types:**

```typescript
// ❌ BEFORE: Separate type file (deprecated)
// components/section/@types/Section.ts
import type { SectionProps as SectionComponentProps, SectionRef as SectionComponentRef } from '@guyromellemagayano/components'
import type { CommonWebAppComponentProps } from '@web/@types/components'

export type SectionRef = SectionComponentRef
export interface SectionProps extends SectionComponentProps, CommonWebAppComponentProps {}

// components/section/Section.tsx
import type { SectionProps, SectionRef } from './@types/Section'
export const Section = React.forwardRef<SectionRef, SectionProps>(...)
```

```typescript
// ✅ AFTER: Inline types (recommended)
// components/section/Section.tsx
import React, { useId } from "react";
import {
  Div,
  Heading,
  Section as SectionComponent,
  type SectionProps as SectionComponentProps,  // Import types directly
  type SectionRef as SectionComponentRef,
} from "@guyromellemagayano/components";
import { CommonWebAppComponentProps } from "@web/@types/components";

// Inline type definitions
type SectionRef = SectionComponentRef;
interface SectionProps extends SectionComponentProps, CommonWebAppComponentProps {}

export const Section = React.forwardRef<SectionRef, SectionProps>(
  function Section(props, ref) {
    // Component implementation
  }
);
```

**Why This Migration is Required:**

- ✅ **Fewer files** - No separate `@types` folder needed
- ✅ **Better tree shaking** - Only imports what's used
- ✅ **Easier refactoring** - Changes in one place
- ✅ **Simpler structure** - Less complexity to manage
- ✅ **Works with external dependencies** - Import types directly from packages
- ✅ **Team consistency** - Everyone follows the same pattern
- ✅ **Modern TypeScript** - Leverages the full power of type imports

## 🏗️ Component Architecture Patterns

This guide establishes common architectural patterns used across all components. These patterns ensure consistency, maintainability, and optimal performance.

### Why Inline Types?

**We use inline types for ALL components, regardless of complexity or external dependencies. This is the ONLY approach we recommend.**

- **Single Source of Truth**: Types and components in one file
- **Better Tree Shaking**: Only imports what's needed
- **Easier Refactoring**: Changes in one place
- **Simpler Structure**: Less files to manage
- **External Dependency Support**: Works with any external types
- **🔒 Enhanced Security**: Internal types hidden from consumers
- **🛡️ API Surface Reduction**: Minimal public interface exposed

#### ✅ **The Right Way: Inline Types (Always)**

```typescript
// components/section/Section.tsx - ALL components follow this pattern
import React, { useId } from "react";
import {
  Div,
  Heading,
  Section as SectionComponent,
  type SectionProps as SectionComponentProps,  // Import types directly
  type SectionRef as SectionComponentRef,
} from "@guyromellemagayano/components";
import { CommonWebAppComponentProps } from "@web/@types/components";

// Define types inline - ALWAYS
type SectionRef = SectionComponentRef;
interface SectionProps extends SectionComponentProps, CommonWebAppComponentProps {}

export const Section = React.forwardRef<SectionRef, SectionProps>(
  function Section(props, ref) {
    // Component implementation
  }
);
```

#### ❌ **The Wrong Way: Separate Type Files (Never Use)**

```typescript
// ❌ DON'T DO THIS - Separate type files are deprecated
// components/section/@types/Section.ts
import type { SectionProps as SectionComponentProps, SectionRef as SectionComponentRef } from '@guyromellemagayano/components'
import type { CommonWebAppComponentProps } from '@web/@types/components'

export type SectionRef = SectionComponentRef
export interface SectionProps extends SectionComponentProps, CommonWebAppComponentProps {}

// components/section/Section.tsx
import type { SectionProps, SectionRef } from './@types/Section'
export const Section = React.forwardRef<SectionRef, SectionProps>(...)
```

### Why Nested Component Structure?

**For complex components that need multiple sub-components, use nested component structures for better organization and reusability.**

- **Consistent Layout**: Standardized outer and inner container structure
- **Flexible Usage**: Use main component or individual containers
- **CSS Module Integration**: Scoped styling for each container level
- **Better Organization**: Clear separation of layout concerns
- **Compound Component Pattern**: Related components grouped together
- **Shared Logic**: Common functionality in main component
- **Clean API**: Intuitive component usage patterns

#### ✅ **Container Pattern Example**

```typescript
// components/container/Container.tsx
export const Container = React.forwardRef<ContainerRef, ContainerProps>(
  function Container(props, ref) {
    const element = (
      <ContainerOuter {...props} ref={ref}>
        <ContainerInner>{props.children}</ContainerInner>
      </ContainerOuter>
    );

    return element;
  }
);

// Usage options:
<Container>Content</Container>                    // Main component
<ContainerOuter>Content</ContainerOuter>          // Individual outer
<ContainerInner>Content</ContainerInner>          // Individual inner
```

#### ✅ **Compound Component Pattern Example**

```typescript
// components/icon/Icon.tsx
export const Icon = React.forwardRef<IconRef, IconProps>(
  function Icon(props, ref) {
    // Main component implementation
  }
);

// Compound sub-components
Icon.X = XIcon;
Icon.Instagram = InstagramIcon;
Icon.LinkedIn = LinkedInIcon;
Icon.GitHub = GitHubIcon;

// Usage options:
<Icon>Custom SVG</Icon>                          // Main component
<Icon.X className="w-6 h-6" />                   // Compound component
<Icon.Instagram className="w-6 h-6" />           // Compound component
```

## 🔧 **Current Codebase Patterns & Conventions**

This section documents the **established patterns and conventions** currently used across all components in the `apps/web` codebase. These patterns are **mandatory** and must be followed for all new components and updates.

### **1. useComponentId Hook Integration**

**Every component MUST integrate with the `useComponentId` hook for consistent ID generation and debug logging.**

#### ✅ **Required Pattern**

```typescript
import { setDisplayName, useComponentId } from "@guyromellemagayano/hooks";

// Public component with useComponentId integration
export const Component = setDisplayName(
  React.forwardRef(function Component(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
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

#### ✅ **Internal Component Pattern**

```typescript
interface InternalComponentProps extends ComponentProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

const InternalComponent = setDisplayName(
  React.forwardRef(function InternalComponent(props, ref) {
    const { children, className, componentId, isDebugMode, ...rest } = props;

    // Conditional rendering pattern
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
```

### **2. setDisplayName Utility**

**Every component MUST use `setDisplayName` for automatic displayName assignment.**

#### ✅ **Required Pattern**

```typescript
import { setDisplayName } from "@guyromellemagayano/hooks";

// Wrap all components with setDisplayName
const Component = setDisplayName(
  React.forwardRef(function Component(props, ref) {
    // Component implementation
  }),
  "Component"
) as ComponentType;

// For internal components
const InternalComponent = setDisplayName(
  React.forwardRef(function InternalComponent(props, ref) {
    // Internal implementation
  }),
  "InternalComponent"
) as InternalComponentType;
```

#### ❌ **Avoid Manual displayName Assignment**

```typescript
// ❌ DON'T DO THIS - Manual assignment
const Component = React.forwardRef(function Component(props, ref) {
  // Implementation
});
Component.displayName = "Component"; // Manual assignment

// ✅ DO THIS - Use setDisplayName utility
const Component = setDisplayName(
  React.forwardRef(function Component(props, ref) {
    // Implementation
  }),
  "Component"
) as ComponentType;
```

### **3. Internal/External Component Pattern**

**Complex components MUST use the internal/external pattern for separation of concerns.**

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

### **4. Conditional Rendering Pattern**

**Every component MUST implement conditional rendering for performance optimization.**

#### ✅ **Required Pattern**

```typescript
const Component = setDisplayName(
  React.forwardRef(function Component(props, ref) {
    const { children, ...rest } = props;

    // Early return pattern for performance
    if (!children) return null;

    const element = (
      <Div ref={ref} {...rest}>
        {children}
      </Div>
    );

    return element;
  }),
  "Component"
) as ComponentType;
```

#### ✅ **Multiple Condition Checks**

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

### **5. Data Attributes Pattern**

**Every component MUST include consistent data attributes for testing and debugging.**

#### ✅ **Required Data Attributes**

```typescript
const InternalComponent = setDisplayName(
  React.forwardRef(function InternalComponent(props, ref) {
    const { children, className, componentId, isDebugMode, ...rest } = props;

    if (!children) return null;

    const element = (
      <Div
        {...rest}
        ref={ref}
        className={cn(styles.component, className)}
        data-component-id={componentId}           // ✅ Required
        data-debug-mode={isDebugMode ? "true" : undefined}  // ✅ Required
        data-testid="component-root"              // ✅ Required
      >
        {children}
      </Div>
    );

    return element;
  }),
  "InternalComponent"
) as InternalComponentType;
```

### **6. CSS Module Integration**

**Every component MUST use CSS modules with consistent class naming.**

#### ✅ **Required CSS Module Pattern**

```typescript
import styles from "./Component.module.css";

const InternalComponent = setDisplayName(
  React.forwardRef(function InternalComponent(props, ref) {
    const { children, className, componentId, isDebugMode, ...rest } = props;

    if (!children) return null;

    const element = (
      <Div
        {...rest}
        ref={ref}
        className={cn(styles.component, className)}  // ✅ CSS module + custom className
        data-component-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="component-root"
      >
        <Div className={styles.componentContent}>   // ✅ Nested CSS module classes
          {children}
        </Div>
      </Div>
    );

    return element;
  }),
  "InternalComponent"
) as InternalComponentType;
```

### **7. Type Import Patterns**

**Every component MUST use consistent type import patterns from external packages.**

#### ✅ **Required Type Import Pattern**

```typescript
import {
  Div,
  Heading,
} from "@guyromellemagayano/components";

// Inline type definitions using React utility types
type ComponentRef = React.ComponentRef<typeof Div>;
interface ComponentProps extends React.ComponentProps<typeof Div>, CommonWebAppComponentProps {}

interface InternalComponentProps extends ComponentProps {
  componentId?: string;
  isDebugMode?: boolean;
}
```

#### 🎯 **Why Use React Utility Types**

**Benefits of `React.ComponentRef` and `React.ComponentProps`:**

- ✅ **Always Up-to-Date**: Automatically extracts current types from components
- ✅ **No Manual Type Imports**: Don't need to import separate type definitions
- ✅ **Type Safety**: Guaranteed to match the actual component interface
- ✅ **Future-Proof**: Types update automatically when component APIs change
- ✅ **Consistent Pattern**: Same approach works for all external components

#### ❌ **Avoid Manual Type Imports**

```typescript
// ❌ DON'T DO THIS - Manual type imports
import {
  Div,
  type DivProps,          // Manual type import
  type DivRef,            // Manual type import
  Heading,
  type HeadingProps,      // Manual type import
  type HeadingRef,        // Manual type import
} from "@guyromellemagayano/components";

// Problems with this approach:
// - Extra imports to maintain
// - Risk of type/component version mismatch
// - Manual synchronization required
```

#### ✅ **Recommended Pattern for All External Components**

```typescript
// ✅ DO THIS - React utility types
import { Button, Input, Modal } from "@guyromellemagayano/components";

// Extract types using React utilities
type ButtonRef = React.ComponentRef<typeof Button>;
type ButtonProps = React.ComponentProps<typeof Button>;

type InputRef = React.ComponentRef<typeof Input>;
type InputProps = React.ComponentProps<typeof Input>;

type ModalRef = React.ComponentRef<typeof Modal>;
type ModalProps = React.ComponentProps<typeof Modal>;

// Extend for your component
interface MyComponentProps extends ButtonProps, CommonWebAppComponentProps {
  variant?: 'custom' | 'special';
}
```

### **8. Section Comment Pattern**

**Every component file MUST use consistent section comments for organization.**

#### ✅ **Required Section Comments**

```typescript
// ============================================================================
// COMPONENT NAME
// ============================================================================

// Type definitions
type ComponentRef = DivRef;
interface ComponentProps extends DivProps, CommonWebAppComponentProps {}

// ============================================================================
// INTERNAL COMPONENT
// ============================================================================

const InternalComponent = setDisplayName(
  React.forwardRef(function InternalComponent(props, ref) {
    // Implementation
  }),
  "InternalComponent"
) as InternalComponentType;

// ============================================================================
// EXTERNAL COMPONENT
// ============================================================================

export const Component = setDisplayName(
  React.forwardRef(function Component(props, ref) {
    // Implementation
  }),
  "Component"
) as ComponentType;
```

### **9. Import Organization Pattern**

**Every component file MUST follow consistent import organization.**

#### ✅ **Required Import Order**

```typescript
// 1. React imports
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

// 2. External library imports
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

// 3. Internal package imports
import {
  Button,
  type ButtonProps,
  type ButtonRef,
  Div,
  type DivProps,
  type DivRef,
} from "@guyromellemagayano/components";
import { setDisplayName, useComponentId } from "@guyromellemagayano/hooks";

// 4. Local type imports
import type { CommonWebAppComponentProps } from "@web/@types/components";

// 5. Local component imports
import { Container } from "@web/components/container";

// 6. Local data imports
import { COMPONENT_DATA } from "@web/components/component/Component.data";

// 7. Local utility imports
import { cn } from "@web/lib";

// 8. Local asset imports
import styles from "./Component.module.css";
```

### **10. Self-Documenting Code Pattern**

**Components should be self-documenting through TypeScript types and clear naming. Use JSDoc sparingly only when necessary.**

#### ✅ **Preferred: Self-Documenting Code**

```typescript
// TypeScript interface provides all necessary documentation
interface ComponentProps extends React.ComponentProps<typeof Div>, CommonWebAppComponentProps {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Size of the component */
  size?: 'sm' | 'md' | 'lg';
  /** Content to render inside the component */
  children: React.ReactNode;
}

// Component name and implementation are self-explanatory
export const Component = setDisplayName(
  React.forwardRef(function Component(props, ref) {
    const { variant = 'primary', size = 'md', children, ...rest } = props;
    
    // Self-documenting code with clear variable names
    if (!children) return null;
    
    const element = (
      <Div
        {...rest}
        ref={ref}
        className={cn(styles.component, styles[variant], styles[size])}
        data-testid="component-root"
      >
        {children}
      </Div>
    );

    return element;
  }),
  "Component"
) as ComponentType;
```

#### ⚠️ **Use JSDoc Only When Necessary**

**JSDoc should be used sparingly in these specific cases:**

1. **Complex business logic that isn't obvious from code**
2. **Non-obvious behavior or side effects**
3. **Integration with external systems**
4. **Performance considerations**

```typescript
interface AdvancedComponentProps {
  /** 
   * Custom validation function that runs on form submission.
   * Should return error message string or null for valid input.
   */
  customValidator?: (value: string) => string | null;
  
  /**
   * Enables performance monitoring. Only use in development.
   * @internal
   */
  _enableProfiling?: boolean;
}

/**
 * Handles complex form validation with debounced input.
 * 
 * Note: This component automatically debounces validation by 300ms
 * to prevent excessive API calls during typing.
 */
export const AdvancedComponent = setDisplayName(
  React.forwardRef(function AdvancedComponent(props, ref) {
    // Implementation
  }),
  "AdvancedComponent"
) as AdvancedComponentType;
```

#### ❌ **Avoid Over-Documentation**

```typescript
// ❌ DON'T DO THIS - Over-documented obvious code
/**
 * A button component that renders a clickable button element
 * @param props - The props for the button
 * @param props.children - The children to render inside the button
 * @param props.onClick - The click handler for the button
 * @param props.disabled - Whether the button is disabled
 * @param props.className - Additional CSS classes
 * @returns A React button element
 */
interface ButtonProps {
  /** The children to render inside the button */
  children: React.ReactNode;
  /** The click handler for the button */
  onClick?: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// ✅ DO THIS - Let TypeScript and naming speak for themselves
interface ButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}
```

#### 🎯 **Self-Documentation Principles**

1. **Descriptive naming** - Component, prop, and variable names should be clear
2. **TypeScript types** - Interface definitions serve as documentation
3. **Logical code structure** - Code flow should be easy to follow
4. **Meaningful defaults** - Default values should be intuitive
5. **Clear prop types** - Union types and enums document valid values

```typescript
// Self-documenting through clear naming and types
interface TooltipProps {
  trigger: React.ReactElement;
  content: string | React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  showDelay?: number; // milliseconds
  hideDelay?: number; // milliseconds
  disabled?: boolean;
}

// Implementation is self-explanatory
export const Tooltip = setDisplayName(
  React.forwardRef(function Tooltip(props, ref) {
    const { 
      trigger, 
      content, 
      placement = 'top', 
      showDelay = 200, 
      hideDelay = 100,
      disabled = false,
      ...rest 
    } = props;
    
    // Clear, self-documenting logic
    if (disabled || !content) {
      return trigger;
    }
    
    const element = (
      <TooltipProvider 
        placement={placement}
        showDelay={showDelay}
        hideDelay={hideDelay}
        {...rest}
      >
        {trigger}
        <TooltipContent>{content}</TooltipContent>
      </TooltipProvider>
    );

    return element;
  }),
  "Tooltip"
) as TooltipType;
```

### **11. Test Mock Pattern**

**Every component test MUST include consistent mocks for external dependencies.**

#### ✅ **Required Test Mocks**

```typescript
// Mock external dependencies
vi.mock("@guyromellemagayano/components", () => ({
  Div: React.forwardRef<HTMLDivElement, any>(function MockDiv(props, ref) {
    return <div ref={ref} data-testid="div" {...props} />;
  }),
  DivProps: {},
  DivRef: {},
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

### **12. Error Handling Pattern**

**Every component MUST include proper error handling and edge cases.**

#### ✅ **Required Error Handling**

```typescript
const InternalComponent = setDisplayName(
  React.forwardRef(function InternalComponent(props, ref) {
    const { children, className, componentId, isDebugMode, ...rest } = props;

    // Conditional rendering
    if (!children) return null;

    // Error boundary for invalid props
    if (typeof children === "boolean") {
      console.warn("Component: Boolean children are not supported");
      return null;
    }

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
```

### **13. Performance Optimization Patterns**

**Every component MUST implement performance optimizations.**

#### ✅ **Required Performance Patterns**

```typescript
// 1. Early returns for performance
if (!children) return null;

// 2. Memoization for expensive computations
const memoizedValue = useMemo(() => {
  return expensiveComputation(props.data);
}, [props.data]);

// 3. Callback memoization for event handlers
const handleClick = useCallback(() => {
  // Event handler logic
}, [dependencies]);

// 4. Conditional rendering to avoid unnecessary JSX
{shouldRender && <ExpensiveComponent />}
```

### **14. Accessibility Pattern**

**Every component MUST include proper accessibility attributes.**

#### ✅ **Required Accessibility Pattern**

```typescript
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
        role="region"                    // ✅ Accessibility role
        aria-label="Component region"    // ✅ Accessibility label
        tabIndex={0}                     // ✅ Keyboard navigation
      >
        {children}
      </Div>
    );

    return element;
  }),
  "InternalComponent"
) as InternalComponentType;
```

### **15. Security Pattern**

**Every component MUST implement security best practices.**

#### ✅ **Required Security Pattern**

```typescript
// 1. Sanitize external data
const sanitizedContent = useMemo(() => {
  return sanitizeHtml(props.content);
}, [props.content]);

// 2. Validate props
const validateProps = (props: ComponentProps) => {
  if (props.href && !isValidUrl(props.href)) {
    throw new Error("Invalid URL provided to Component");
  }
};

// 3. Secure external links
const isExternal = link.href.startsWith("http");
const secureProps = isExternal ? {
  target: "_blank",
  rel: "noopener noreferrer"
} : {};

// 4. CSRF protection for forms
const formProps = {
  "data-csrf-token": csrfToken,
  "data-rate-limit-key": rateLimitKey
};
```

### **16. When NOT to Use Patterns**

**There are specific cases where certain patterns should NOT be applied.**

#### ❌ **When NOT to Use displayName**

```typescript
// ❌ DON'T add displayName to side-effect-only components
const HeaderEffects: HeaderEffectsComponent = function HeaderEffects(props) {
  // Side-effect-only component that returns null
  useEffect(() => {
    // Effect logic
  }, []);
  
  return null; // No rendering
};

// ❌ DON'T add displayName to utility components
const UtilityComponent = function UtilityComponent(props) {
  // Utility component that doesn't appear in component tree
  return null;
};

// ✅ DO add displayName to rendering components
const Component = setDisplayName(
  React.forwardRef(function Component(props, ref) {
    const element = <div ref={ref}>{props.children}</div>;
    return element;
  }),
  "Component"
) as ComponentType;
```

#### ❌ **When NOT to Use Internal/External Pattern**

```typescript
// ❌ DON'T use internal/external pattern for simple components
// Simple components should be direct implementations

// ✅ Simple component - direct implementation
export const SimpleComponent = setDisplayName(
  React.forwardRef(function SimpleComponent(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;
    
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });
    
    const element = (
      <Div
        {...rest}
        ref={ref}
        data-component-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="simple-component-root"
      >
        {rest.children}
      </Div>
    );

    return element;
  }),
  "SimpleComponent"
) as SimpleComponentType;

// ✅ Complex component - use internal/external pattern
export const ComplexComponent = setDisplayName(
  React.forwardRef(function ComplexComponent(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;
    
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });
    
    const element = (
      <InternalComplexComponent
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }),
  "ComplexComponent"
) as ComplexComponentType;
```

#### ❌ **When NOT to Use Conditional Rendering**

```typescript
// ❌ DON'T use conditional rendering for required content
const RequiredContentComponent = setDisplayName(
  React.forwardRef(function RequiredContentComponent(props, ref) {
    const { children, ...rest } = props;
    
    // Don't conditionally render required content
    // Instead, validate props or provide defaults
    if (!children) {
      console.warn("RequiredContentComponent: children is required");
      return <Div ref={ref} {...rest}>Default content</Div>;
    }
    
    const element = (
      <Div ref={ref} {...rest}>
        {children}
      </Div>
    );

    return element;
  }),
  "RequiredContentComponent"
) as RequiredContentComponentType;

// ✅ Use conditional rendering for optional content
const OptionalContentComponent = setDisplayName(
  React.forwardRef(function OptionalContentComponent(props, ref) {
    const { title, children, ...rest } = props;
    
    // Conditional rendering for optional content
    if (!title && !children) return null;
    
    const element = (
      <Div ref={ref} {...rest}>
        {title && <Heading>{title}</Heading>}
        {children && <Div>{children}</Div>}
      </Div>
    );

    return element;
  }),
  "OptionalContentComponent"
) as OptionalContentComponentType;
```

#### ❌ **When NOT to Use CSS Modules**

```typescript
// ❌ DON'T use CSS modules for global styles
// Global styles should use regular CSS files

// ✅ Use CSS modules for component-specific styles
import styles from "./Component.module.css";

const Component = setDisplayName(
  React.forwardRef(function Component(props, ref) {
    const element = (
      <Div ref={ref} className={styles.component}>
        {props.children}
      </Div>
    );

    return element;
  }),
  "Component"
) as ComponentType;

// ✅ Use global CSS for global styles
// globals.css
.global-utility-class {
  /* Global utility styles */
}
```

### **17. Pattern Decision Matrix**

**Use this matrix to determine which patterns to apply:**

| Component Type | Internal/External | displayName | Conditional Rendering | CSS Modules |
|----------------|-------------------|-------------|----------------------|-------------|
| **Simple Component** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **Complex Component** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Side-Effect Component** | ❌ No | ❌ No | ❌ No | ❌ No |
| **Utility Component** | ❌ No | ❌ No | ❌ No | ❌ No |
| **Layout Component** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Compound Component** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |

### **18. Pattern Exceptions**

**Specific exceptions to the established patterns:**

#### **Exception 1: Side-Effect-Only Components**

```typescript
// ✅ Exception: Side-effect-only components don't need displayName
const EffectsComponent = function EffectsComponent(props) {
  useEffect(() => {
    // Side effects only
  }, []);
  
  return null; // No rendering
};

// ✅ Exception: Utility components don't need displayName
const UtilityComponent = function UtilityComponent(props) {
  // Utility logic only
  return null;
};
```

#### **Exception 2: Simple Wrapper Components**

```typescript
// ✅ Exception: Simple wrappers can be direct implementations
export const SimpleWrapper = setDisplayName(
  React.forwardRef(function SimpleWrapper(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;
    
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });
    
    const element = (
      <Div
        {...rest}
        ref={ref}
        data-component-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="simple-wrapper-root"
      >
        {rest.children}
      </Div>
    );

    return element;
  }),
  "SimpleWrapper"
) as SimpleWrapperType;
```

#### **Exception 3: Data-Only Components**

```typescript
// ✅ Exception: Data-only components don't need rendering patterns
const DataComponent = function DataComponent(props) {
  // Data processing only
  const processedData = useMemo(() => {
    return processData(props.data);
  }, [props.data]);
  
  return processedData; // Return data, not JSX
};
```

## 🧪 Testing with Vitest

This guide uses **Vitest** instead of Jest for testing across all components. Here's why Vitest is superior for this monorepo setup:

### Why Vitest > Jest

#### 🚀 **Performance Benefits**

- **Native ESM Support**: Built for modern ES modules, no transpilation needed
- **Parallel Execution**: Tests run in parallel by default, significantly faster
- **Smart Caching**: Intelligent caching of test results and dependencies
- **Watch Mode**: Extremely fast watch mode with selective re-runs

#### 🏗️ **Monorepo Advantages**

- **Workspace Awareness**: Native understanding of monorepo structures
- **Shared Configurations**: Easy to share test configs across packages
- **Cross-Package Testing**: Test components that depend on other packages
- **Turborepo Integration**: Seamless integration with Turborepo for build optimization

#### 🔧 **Developer Experience**

- **TypeScript First**: Native TypeScript support without additional setup
- **Better Error Messages**: More informative error reporting
- **Hot Module Replacement**: Fast refresh during development
- **Composable Configurations**: Easy to extend and customize

#### 📦 **Modern Tooling**

- **Vite Integration**: Leverages Vite's fast bundling and dev server
- **ESM by Default**: No CommonJS compatibility layers needed
- **Plugin Ecosystem**: Rich ecosystem of testing plugins
- **Future-Proof**: Built for modern JavaScript standards

### Test Coverage Standards

All components should achieve:

- **95%+ code coverage** for production components
- **100% test pass rate** with no flaky tests
- **Fast execution** (< 50ms per test file)
- **Comprehensive scenarios** including edge cases and error handling

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

## 🚀 React.FC Compatibility & Performance Patterns

### React.forwardRef with Security

**Best Practice: Use React.forwardRef for components that need ref forwarding**

```typescript
// ✅ Recommended: React.forwardRef with security
import React, { useId } from "react";
import { Button as ButtonComponent, type ButtonProps as ButtonComponentProps, type ButtonRef as ButtonComponentRef } from "@guyromellemagayano/components";
import { logInfo } from "@guyromellemagayano/logger";
import type { CommonWebAppComponentProps } from "@web/@types/components";

type ButtonRef = ButtonComponentRef;
interface ButtonProps extends ButtonComponentProps, CommonWebAppComponentProps {}

export const Button = React.forwardRef<ButtonRef, ButtonProps>(
  function Button({ variant = 'primary', children, _debugMode, ...props }, ref) {
    // Always call hooks at the top level
    const generatedId = useId();
    
    // Internal debug logging with cross-environment safety
    if (_debugMode && globalThis?.process?.env?.NODE_ENV === "development") {
      logInfo(`Button rendered with ID: ${generatedId}`);
    }

    // Early return pattern for performance
    if (!children) return null;

    const element = (
      <ButtonComponent
        ref={ref}
        variant={variant}
        data-button-id={generatedId}
        data-debug-mode={_debugMode ? "true" : undefined}
        {...props}
      >
        {children}
      </ButtonComponent>
    );

    return element;
  }
);

Button.displayName = 'Button'
```

### JSX Element Assignment Pattern

**Best Practice: Always assign JSX to a const element before returning**

All components MUST assign JSX to a `const element` variable before returning it. This pattern provides multiple benefits for debugging, performance, and code maintainability.

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

#### ❌ **Wrong Pattern - Direct Return**

```typescript
export const Component = React.forwardRef<ComponentRef, ComponentProps>(
  function Component(props, ref) {
    const { children, className, _internalId, _debugMode, ...rest } = props;
    
    // Early return for performance
    if (!children) return null;
    
    // ❌ DON'T DO THIS - Direct JSX return
    return (
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
  }
);
```

#### 🎯 **Why This Pattern is Required**

##### **1. Enhanced Debugging Capabilities**

```typescript
const element = (
  <Div className={styles.component}>
    {children}
  </Div>
);

// ✅ Can inspect element before returning
if (isDebugMode) {
  console.log('Component element:', element);
  console.log('Component props:', element.props);
}

return element;
```

##### **2. Conditional Element Modification**

```typescript
const element = (
  <Div className={styles.component}>
    {children}
  </Div>
);

// ✅ Can modify element based on conditions
if (isDebugMode) {
  // Add debug attributes or wrap with debug providers
  return React.cloneElement(element, {
    'data-debug-render-time': Date.now(),
    'data-debug-component-stack': getComponentStack()
  });
}

return element;
```

##### **3. Performance Profiling Integration**

```typescript
const element = (
  <Div className={styles.component}>
    {children}
  </Div>
);

// ✅ Can wrap with performance monitoring
if (shouldProfile) {
  return (
    <PerformanceProfiler name="Component">
      {element}
    </PerformanceProfiler>
  );
}

return element;
```

##### **4. Error Boundary Integration**

```typescript
const element = (
  <Div className={styles.component}>
    {children}
  </Div>
);

// ✅ Can wrap with error boundaries conditionally
if (isDevelopment) {
  return (
    <ErrorBoundary componentName="Component">
      {element}
    </ErrorBoundary>
  );
}

return element;
```

##### **5. Testing and Development Tools**

```typescript
const element = (
  <Div className={styles.component}>
    {children}
  </Div>
);

// ✅ Can add development-only features
if (isDevelopment) {
  // Add data attributes for testing tools
  return React.cloneElement(element, {
    'data-component-name': 'Component',
    'data-render-count': renderCount.current++,
    'data-props-hash': hashProps(props)
  });
}

return element;
```

##### **6. Consistent Code Patterns**

```typescript
// ✅ Consistent pattern across all components
const element = (/* JSX */);
return element;

// ✅ Easy to spot and understand
// ✅ Enables code transformations and tooling
// ✅ Supports advanced debugging scenarios
// ✅ Allows conditional rendering enhancements
```

##### **7. Future-Proofing for React Features**

```typescript
const element = (
  <Div className={styles.component}>
    {children}
  </Div>
);

// ✅ Ready for React Compiler optimizations
// ✅ Compatible with future React features
// ✅ Supports advanced profiling tools
// ✅ Enables better development experiences

return element;
```

#### 🔧 **Implementation in Internal/External Pattern**

```typescript
// ============================================================================
// INTERNAL COMPONENT
// ============================================================================

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

#### 📋 **Compliance Checklist**

All components MUST implement this pattern:

- [ ] ✅ **JSX assigned to `const element`** - Never return JSX directly
- [ ] ✅ **Return element variable** - Always `return element;`
- [ ] ✅ **Consistent naming** - Always use `element` as variable name
- [ ] ✅ **Applied to all components** - Both internal and external components
- [ ] ✅ **Future-ready** - Pattern supports debugging and development tools

### Early Return Pattern for Performance

**Best Practice: Use early returns to avoid unnecessary JSX processing**

```typescript
// ✅ Recommended: Early return pattern
import React, { useId } from "react";
import { Section as SectionComponent, Heading, Div, type SectionProps as SectionComponentProps, type SectionRef as SectionComponentRef } from "@guyromellemagayano/components";
import { logInfo } from "@guyromellemagayano/logger";
import type { CommonWebAppComponentProps } from "@web/@types/components";

type SectionRef = SectionComponentRef;
interface SectionProps extends SectionComponentProps, CommonWebAppComponentProps {}

export const Section = React.forwardRef<SectionRef, SectionProps>(
  function Section({ title, children, _debugMode, ...props }, ref) {
    // Always call hooks at the top level
    const generatedId = useId();
    
    // Internal debug logging
    if (_debugMode && globalThis?.process?.env?.NODE_ENV === "development") {
      logInfo(`Section rendered with ID: ${generatedId}`);
    }

    // Early return for performance - no unnecessary JSX processing
    if (!title && !children) return null;

    const element = (
      <SectionComponent
        ref={ref}
        aria-labelledby={generatedId}
        data-section-id={generatedId}
        data-debug-mode={_debugMode ? "true" : undefined}
        {...props}
      >
        {title && <Heading id={generatedId}>{title}</Heading>}
        {children && <Div>{children}</Div>}
      </SectionComponent>
    );

    return element;
  }
);
```

### Cross-Environment Safety

**Best Practice: Use globalThis for environment detection**

```typescript
// ✅ Recommended: Cross-environment safe
if (_debugMode && globalThis?.process?.env?.NODE_ENV === "development") {
  console.log('Debug mode enabled');
}

// ❌ Avoid: Environment-specific
if (_debugMode && process.env.NODE_ENV === "development") {
  // May fail in browser environments
}
```

### Performance Benefits of Early Returns

1. **Immediate Exit** - Function returns early, no further processing
2. **Memory Efficiency** - No unnecessary variable creation
3. **Cleaner Logic** - Separates guard clauses from main logic
4. **Better Debugging** - Easy to add logging to early returns
5. **Security** - No unnecessary JSX processing when no content

### Hook Rules Compliance

**Best Practice: Always call hooks at the top level**

```typescript
// ✅ Recommended: Hooks at top level
import React, { useId, useState } from "react";
import { Div, type DivProps, type DivRef } from "@guyromellemagayano/components";
import type { CommonWebAppComponentProps } from "@web/@types/components";

type ComponentRef = DivRef;
interface ComponentProps extends DivProps, CommonWebAppComponentProps {}

export const Component = React.forwardRef<ComponentRef, ComponentProps>(
  function Component(props, ref) {
    const generatedId = useId(); // Always called
    const [state, setState] = useState(); // Always called
    
    // Early return after hooks
    if (!props.children) return null;
    
    return <Div ref={ref}>{props.children}</Div>;
  }
);

// ❌ Avoid: Conditional hook calls
export const Component = React.forwardRef<Ref, Props>(
  function Component(props, ref) {
    // This violates Rules of Hooks
    const id = props.id || useId(); // useId called conditionally
    
    return <div>{props.children}</div>;
  }
);
```

## 📚 Export/Import Patterns

### Recommended: Named Exports

**Benefits:**

- **Better tree shaking** - Only imports what you use
- **Consistent with modern React patterns**
- **Easier refactoring** - IDE can track usage better
- **Multiple exports per file** - Can export related components together
- **Inline types** - Types defined directly in component files
- **Type inference** - Use `typeof` for component prop types
- **🔒 Enhanced security** - Internal types hidden from consumers
- **🛡️ API surface reduction** - Minimal public interface exposed

```typescript
// Export with inline types (internal only)
import React from "react";
import { Button as ButtonComponent } from "@guyromellemagayano/components";
import type { CommonWebAppComponentProps } from "@web/@types/components";

type ButtonRef = React.ComponentRef<typeof ButtonComponent>;
interface ButtonProps extends React.ComponentProps<typeof ButtonComponent>, CommonWebAppComponentProps {
  // Internal props hidden from consumers
  _internalState?: string
  _debugMode?: boolean
}

export const Button = React.forwardRef<ButtonRef, ButtonProps>(
  function Button(props, ref) {
    // Component implementation
    return <ButtonComponent ref={ref} {...props} />;
  }
);

// Import (only component, no type access)
import { Button } from '@/components/ui/atoms/button'

// Type inference when needed (safe way to get props)
import { Button } from '@/components/ui/atoms/button'
type ButtonProps = React.ComponentProps<typeof Button>
```

### Alternative: Default Exports

**Use when:**

- **Single component per file**
- **Legacy codebase compatibility**
- **Team preference for default exports**

```typescript
// Export with inline types (internal only)
import React from "react";
import { Button as ButtonComponent, type ButtonProps as ButtonComponentProps, type ButtonRef as ButtonComponentRef } from "@guyromellemagayano/components";
import type { CommonWebAppComponentProps } from "@web/@types/components";

type ButtonRef = ButtonComponentRef;
interface ButtonProps extends ButtonComponentProps, CommonWebAppComponentProps {
  // Internal implementation details hidden
  _internalState?: string
}

const Button = React.forwardRef<ButtonRef, ButtonProps>(
  function Button(props, ref) {
    // Component implementation
    return <ButtonComponent ref={ref} {...props} />;
  }
);
export default Button

// Import (only component, no type access)
import Button from '@/components/ui/atoms/button'

// Type inference when needed
type ButtonProps = React.ComponentProps<typeof Button>
```

### ⚠️ Important: Be Consistent

**Don't mix patterns in the same codebase:**

```typescript
// ❌ Inconsistent - Don't do this
export const Button = function Button() { /* ... */ }
export default Card

// ✅ Consistent - Pick one pattern and stick with it
export const Button = function Button() { /* ... */ }
export const Card = function Card() { /* ... */ }
```

## 🔒 Security & Type Safety

### 1. **Information Hiding**

**Problem with exported types:**

```typescript
// ❌ Exposing internal structure
import { type ButtonProps as ButtonComponentProps, type ButtonRef as ButtonComponentRef } from "@guyromellemagayano/components";
import type { CommonWebAppComponentProps } from "@web/@types/components";

export interface ButtonProps extends ButtonComponentProps, CommonWebAppComponentProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  // Internal props exposed to consumers
  _internalState?: string
  _debugMode?: boolean
  _analyticsId?: string
}

// Consumers can access internal details
import type { ButtonProps } from '@/components/ui/atoms/button'
const props: ButtonProps = {
  _internalState: 'hacked', // ❌ Can manipulate internal state
  _debugMode: true,         // ❌ Can enable debug mode
  _analyticsId: 'malicious' // ❌ Can inject malicious analytics
}
```

**Solution with internal types:**

```typescript
// ✅ Hiding internal structure (Inline approach)
import { type ButtonProps as ButtonComponentProps, type ButtonRef as ButtonComponentRef } from "@guyromellemagayano/components";
import type { CommonWebAppComponentProps } from "@web/@types/components";

interface ButtonProps extends ButtonComponentProps, CommonWebAppComponentProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  // Internal props hidden from consumers
  _internalState?: string
  _debugMode?: boolean
  _analyticsId?: string
}

// Consumers can only use the component
import { Button } from '@/components/ui/atoms/button'
// No access to internal types = can't manipulate internal state
```

**The Only Way: Inline Types (Always Use This)**

```typescript
// ✅ Inline types with external dependencies (The ONLY approach we use)
// components/section/Section.tsx
import React, { useId } from "react";
import {
  Div,
  Heading,
  Section as SectionComponent,
} from "@guyromellemagayano/components";
import { CommonWebAppComponentProps } from "@web/@types/components";

// Inline type definitions - ALWAYS using React utility types
type SectionRef = React.ComponentRef<typeof SectionComponent>;
interface SectionProps extends React.ComponentProps<typeof SectionComponent>, CommonWebAppComponentProps {}

export const Section = React.forwardRef<SectionRef, SectionProps>(
  function Section(props, ref) {
    // Component implementation with all modern patterns
    const { title, children, className, _internalId, _debugMode, ...rest } = props;
    
    // Hook rules compliance
    const generatedId = useId();
    const id = _internalId || generatedId;
    
    // Cross-environment safety
    if (_debugMode && globalThis?.process?.env?.NODE_ENV === "development") {
      logInfo(`Section rendered with ID: ${id}`);
    }
    
    // Early return pattern
    if (!title && !children) return null;
    
    const element = (
      <SectionComponent
        ref={ref}
        aria-labelledby={id}
        data-section-id={id}
        data-debug-mode={_debugMode ? "true" : undefined}
        {...rest}
      >
        {/* Component implementation */}
      </SectionComponent>
    );

    return element;
  }
);

// Internal types remain private (not exported)
interface SectionInternalState {
  isExpanded: boolean
  isLoading: boolean
  formData: Record<string, any>
}
```

### 2. **API Surface Reduction**

**Problem with large API surface:**

```typescript
// ❌ Large API surface = more attack vectors
export interface ButtonProps { ... }
export interface ButtonState { ... }
export interface ButtonContext { ... }
export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonTheme = 'light' | 'dark'
export interface ButtonAnalytics { ... }
export type ButtonEvent = 'click' | 'hover' | 'focus'

// Consumers can import and potentially misuse any of these
import type { ButtonState, ButtonAnalytics } from '@/components/ui/atoms/button'
```

**Solution with minimal API surface:**

```typescript
// ✅ Minimal API surface = fewer attack vectors
interface ButtonProps { ... }
interface ButtonState { ... }
interface ButtonContext { ... }
type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonTheme = 'light' | 'dark'
interface ButtonAnalytics { ... }
type ButtonEvent = 'click' | 'hover' | 'focus'

// Only the component itself is exported
export const Button = function Button(props: ButtonProps) { ... }
// Consumers can only use the component, not internal types
```

### 3. **Implementation Flexibility**

**Problem with exposed types:**

```typescript
// ❌ Consumers depend on internal types
import { type ButtonProps as ButtonComponentProps } from "@guyromellemagayano/components";
import type { CommonWebAppComponentProps } from "@web/@types/components";

export interface ButtonProps extends ButtonComponentProps, CommonWebAppComponentProps {
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg'
}

// Consumer code breaks when you change implementation
import type { ButtonProps } from '@/components/ui/atoms/button'
import { Button } from '@/components/ui/atoms/button'
const props: ButtonProps = {
  variant: 'primary',
  size: 'md'
}
// If you change ButtonProps, this breaks
```

**Solution with hidden types:**

```typescript
// ✅ Consumers can't depend on internal types
import { type ButtonProps as ButtonComponentProps } from "@guyromellemagayano/components";
import type { CommonWebAppComponentProps } from "@web/@types/components";

interface ButtonProps extends ButtonComponentProps, CommonWebAppComponentProps {
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg'
}

// Consumer can only use the component
import { Button } from '@/components/ui/atoms/button'
// No direct type dependency = implementation can change freely
```

### 4. **Security Through Obscurity**

**Benefits:**

- **Reduced attack surface** - Fewer exposed interfaces to exploit
- **Internal state protection** - Consumers can't manipulate internal state
- **Implementation freedom** - Can change internal structure without breaking consumers
- **Debug mode protection** - Internal debug flags can't be enabled by consumers
- **Analytics protection** - Internal tracking can't be manipulated

**Real-world example:**

```typescript
// Secure component with hidden internals
import React from "react";
import { Button as ButtonComponent, type ButtonProps as ButtonComponentProps, type ButtonRef as ButtonComponentRef } from "@guyromellemagayano/components";
import { logInfo } from "@guyromellemagayano/logger";
import type { CommonWebAppComponentProps } from "@web/@types/components";

type SecureButtonRef = ButtonComponentRef;
interface SecureButtonProps extends ButtonComponentProps, CommonWebAppComponentProps {
  children: React.ReactNode
  onClick?: () => void
  // Internal security features hidden
  _csrfToken?: string
  _rateLimitKey?: string
  _auditLogId?: string
}

export const SecureButton = React.forwardRef<SecureButtonRef, SecureButtonProps>(
  function SecureButton(props, ref) {
    // Internal security validation
    const { _csrfToken, _rateLimitKey, _auditLogId, ...publicProps } = props
    
    // Security checks
    if (!_csrfToken) throw new Error('CSRF token required')
    if (!_rateLimitKey) throw new Error('Rate limit key required')
    
    // Log security validation
    logInfo(`SecureButton validated with CSRF token: ${_csrfToken?.substring(0, 8)}...`);
    
    const element = (
      <ButtonComponent 
        ref={ref}
        {...publicProps}
        data-csrf={_csrfToken}
        data-rate-limit={_rateLimitKey}
      />
    );

    return element;
  }
);

// Consumers can't access security internals
import { SecureButton } from '@/components/ui/atoms/secure-button'
// No way to bypass security checks or manipulate internal state
```

## ✅ Compliance Standards

All components in this codebase must comply with the following standards:

### **Type Organization Compliance**

- ✅ **Inline types only** - No separate type files, no exceptions
- ✅ **Import types directly** from external packages when needed
- ✅ **Keep types internal** - Only export components, never types
- ✅ **Use TypeScript imports** - `import type { ... }` for type-only imports

### **Component Structure Compliance**

- ✅ **Use React.forwardRef** for all components that need ref forwarding
- ✅ **Always call hooks at the top level** - No conditional hook calls
- ✅ **Use early return patterns** for performance optimization
- ✅ **Use cross-environment safety** - `globalThis?.process?.env?.NODE_ENV`
- ✅ **Set displayName** for all components

### **File Organization Compliance**

- ✅ **Feature-first organization** - Group by business features
- ✅ **Consistent naming** - kebab-case for files, PascalCase for components
- ✅ **Index files** - Export through index files for clean imports
- ✅ **CSS modules** - Use CSS modules for all styling

### **Security Compliance**

- ✅ **Minimal API surface** - Only export what's necessary
- ✅ **Hide internal implementation** - Don't expose internal types or props
- ✅ **Type inference** - Use `typeof` and `React.ComponentProps` when needed
- ✅ **Controlled exports** - Only export components, not implementation details

## 🔍 Verification Checklist

All components must pass the following verification checklist:

### **Type Safety Verification**

- [ ] **Inline types only** - No separate `@types` or `models` folders
- [ ] **No exported types** - Only components are exported
- [ ] **Type imports correct** - Using `import type` for external types
- [ ] **Type inference working** - `typeof Component` works correctly
- [ ] **No type conflicts** - All TypeScript errors resolved

### **Component Structure Verification**

- [ ] **React.forwardRef used** - For components that need ref forwarding
- [ ] **Hooks at top level** - No conditional hook calls
- [ ] **Early returns implemented** - Performance optimization in place
- [ ] **Cross-environment safe** - Using `globalThis` for environment checks
- [ ] **displayName set** - For debugging purposes
- [ ] **JSX element assignment** - All JSX assigned to `const element` before return
- [ ] **Self-documenting code** - Clear naming and TypeScript types, minimal JSDoc

### **File Organization Verification**

- [ ] **Feature-first structure** - Components organized by business features
- [ ] **Consistent naming** - Files use kebab-case, components use PascalCase
- [ ] **Index files present** - Clean exports through index files
- [ ] **CSS modules used** - All styling uses CSS modules
- [ ] **No redundant files** - No separate type files or unnecessary folders

### **Security Verification**

- [ ] **Minimal API surface** - Only necessary exports
- [ ] **Internal types hidden** - No exposed implementation details
- [ ] **Type inference only** - No direct type imports by consumers
- [ ] **Controlled exports** - Only components exported, not types
- [ ] **No internal props exposed** - Internal props not in public interface

### **Testing Verification**

- [ ] **95%+ code coverage** - Comprehensive test coverage
- [ ] **All tests passing** - No failing or flaky tests
- [ ] **Fast execution** - Tests run quickly (< 50ms per file)
- [ ] **Edge cases covered** - Error handling and boundary conditions tested
- [ ] **Integration tests** - Component interactions tested

### **Performance Verification**

- [ ] **Bundle size optimized** - No unnecessary dependencies
- [ ] **Tree shaking working** - Only used code included
- [ ] **Lazy loading implemented** - Large components lazy loaded
- [ ] **CSS modules optimized** - Scoped styles working correctly
- [ ] **No memory leaks** - Proper cleanup in useEffect hooks

## ✅ Best Practices

### 1. Component Design Principles

- **Single Responsibility**: Each component has one clear purpose
- **Composition over Inheritance**: Build complex components from simple ones
- **Props Interface**: Always define explicit prop types
- **Display Name**: Always set displayName for debugging
- **CSS Modules**: Use CSS modules for scoped styling
- **JSX Element Assignment**: Always assign JSX to `const element` before returning
- **Self-Documenting Code**: Use TypeScript types and clear naming over extensive JSDoc

### 2. Performance Guidelines

- **Lazy Loading**: Use dynamic imports for large components
- **Memoization**: Use React.memo for expensive components
- **Bundle Analysis**: Regularly analyze bundle sizes
- **Code Splitting**: Split by routes and features

### 3. Testing Strategy

- **Unit Tests**: Test individual components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test user workflows
- **Performance Tests**: Monitor bundle sizes and load times

### 4. Code Organization

- **Feature-First**: Organize by business features
- **Consistent Naming**: Use _kebab-case_ for files, _PascalCase_ for components
- **Index Files**: Export components through index files
- **Type Safety**: Use TypeScript for all components
- **Type Organization**: **ALWAYS use inline types** - No exceptions, no separate type files
- **Type Imports**: Import types directly from external packages when needed
- **Type Inference**: Use `typeof` and `React.ComponentProps` for prop types
- **🔒 Security**: Keep types internal, only export components
- **🛡️ Minimal API**: Reduce attack surface by hiding internal implementation details

## 🛠️ Troubleshooting

### Common Issues

1. **Import Path Errors**
   - Verify path aliases in _tsconfig.JSON_
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
   - **ALWAYS use inline types** - No separate type files, no exceptions:
     - Import types directly from external packages
     - Define interfaces inline with components
     - Keep everything in one file for better maintainability
   - **Security**: Keep types internal, only export components

### 📈 Performance Monitoring

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

## 📊 Expected Outcomes

### Performance Metrics

- **Initial Bundle Size**: _40-60% reduction_
- **Page Load Time**: _50-70% faster_
- **Build Time**: _30-40% faster_
- **Developer Experience**: _80% less time finding files_
- **Code Reusability**: _90% of components reusable_
- **Testing Coverage**: _95%+ achievable_

### Developer Experience Improvements

- **Predictable file locations** - No more searching for components
- **Consistent patterns** - Same structure across all components
- **Better IDE support** - Autocomplete and refactoring work better
- **Easier onboarding** - New developers understand the codebase quickly
- **Reduced cognitive load** - Less time spent on organization decisions

## 🏆 Industry Standards & Best Practices Alignment

This guide aligns with industry-leading practices from:

### **React Ecosystem Standards**

- **React 18+ Patterns**: Concurrent features, Suspense, and modern hooks
- **Next.js 15+ App Router**: Server components, streaming, and route groups
- **TypeScript 5+**: Strict mode, type inference, and modern type patterns
- **CSS Modules**: Scoped styling with PostCSS integration

### **Performance Standards**

- **Core Web Vitals**: LCP, FID, CLS optimization
- **Bundle Analysis**: Tree shaking, code splitting, and lazy loading
- **Caching Strategies**: Route-based and component-level caching
- **Build Optimization**: Turborepo, pnpm, and monorepo best practices

### **Security Standards**

- **OWASP Guidelines**: Input validation, output encoding, and access control
- **Type Safety**: Compile-time error prevention and runtime safety
- **API Surface Reduction**: Minimal exposed interfaces and controlled exports
- **Information Hiding**: Internal implementation details protection

### **Developer Experience Standards**

- **IDE Integration**: TypeScript, ESLint, and Prettier configuration
- **Testing Coverage**: Vitest, React Testing Library, and comprehensive test suites
- **Documentation**: JSDoc, README files, and living documentation
- **Code Organization**: Atomic design, feature-first architecture, and consistent patterns

### **Monorepo Standards**

- **Workspace Management**: pnpm workspaces and Turborepo
- **Package Organization**: Shared packages, internal dependencies, and version management
- **Build Optimization**: Parallel builds, caching, and incremental compilation
- **Deployment**: Vercel integration, environment management, and CI/CD pipelines

## 🎯 Conclusion

This restructuring will transform your development experience by:

1. **Making your app significantly faster** for users
2. **Reducing development time** spent on organization
3. **Improving code quality** through consistent patterns
4. **Enabling better team collaboration** with clear standards
5. **Future-proofing your codebase** for scalability

The key is to **start small, see results, then scale**. Begin with one feature (_like articles_) to experience the immediate benefits, then gradually expand to the rest of your application.

Remember: **Convention over configuration** - once the patterns are established, you won't need to think about organization anymore. The structure will guide you naturally to the right place for every piece of code.

## 🎯 **The Rules: What You MUST Follow**

### **Type Organization Rules**

1. **ALWAYS use inline types** - No separate type files, no exceptions
2. **Import types directly** from external packages when needed
3. **Keep types internal** - Only export components, never types
4. **Use TypeScript imports** - `import type { ... }` for type-only imports

### **Component Structure Rules**

1. **Use React.forwardRef** for all components that need ref forwarding
2. **Always call hooks at the top level** - No conditional hook calls
3. **Use early return patterns** for performance optimization
4. **Use cross-environment safety** - `globalThis?.process?.env?.NODE_ENV`
5. **Set displayName** for all components
6. **Assign JSX to const element** - Never return JSX directly, always assign to `const element` first

### **File Organization Rules**

1. **Feature-first organization** - Group by business features
2. **Consistent naming** - kebab-case for files, PascalCase for components
3. **Index files** - Export through index files for clean imports
4. **CSS modules** - Use CSS modules for all styling

### **Security Rules**

1. **Minimal API surface** - Only export what's necessary
2. **Hide internal implementation** - Don't expose internal types or props
3. **Type inference** - Use `typeof` and `React.ComponentProps` when needed
4. **Controlled exports** - Only export components, not implementation details

### **Industry Recognition**

This approach follows patterns used by:

- **Vercel**: Next.js App Router and deployment optimization
- **Netflix**: Micro-frontend architecture and performance optimization
- **Spotify**: Monorepo management and component organization
- **Airbnb**: TypeScript standards and code quality practices
- **Microsoft**: React patterns and developer experience optimization

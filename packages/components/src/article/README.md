<!-- markdownlint-disable line-length -->
# Article Component

A sophisticated semantic article component with enhanced features including content structure validation, reading time calculation, analytics tracking, and comprehensive accessibility support.

## 📋 Table of Contents

- [Article Component](#article-component)
  - [📋 Table of Contents](#-table-of-contents)
  - [📖 Overview](#-overview)
    - [Purpose](#purpose)
    - [Key Features](#key-features)
  - [🚀 Quick Start](#-quick-start)
    - [Installation](#installation)
    - [Basic Usage](#basic-usage)
  - [⚙️ Props](#️-props)
    - [Standard Props](#standard-props)
    - [Component-Specific Props](#component-specific-props)
  - [🛠️ Utility Functions](#️-utility-functions)
    - [ArticleUtils Export](#articleutils-export)
    - [Available Functions](#available-functions)
  - [💡 Examples](#-examples)
    - [Basic Example](#basic-example)
    - [Featured Article Example](#featured-article-example)
    - [Summary Article Example](#summary-article-example)
    - [With Reading Time Calculation](#with-reading-time-calculation)
    - [With Content Validation](#with-content-validation)
    - [With Analytics](#with-analytics)
    - [Using Utility Functions](#using-utility-functions)
    - [Polymorphic Rendering](#polymorphic-rendering)
    - [Client-Side Rendering](#client-side-rendering)
  - [♿ Accessibility](#-accessibility)
    - [Best Practices Followed](#best-practices-followed)
    - [ARIA Attributes](#aria-attributes)
  - [🎨 Styling](#-styling)
    - [BEM Methodology](#bem-methodology)
    - [Base Classes](#base-classes)
    - [Modifiers](#modifiers)
    - [Visual Features](#visual-features)
    - [Customization Options](#customization-options)
    - [CSS Variables](#css-variables)
  - [🧪 Testing](#-testing)
    - [Test Files](#test-files)
    - [Test Coverage](#test-coverage)
    - [Running Tests](#running-tests)
  - [⚡ Performance](#-performance)
    - [Optimization Techniques](#optimization-techniques)
  - [🌐 Browser Support](#-browser-support)
  - [📘 TypeScript](#-typescript)
  - [📚 Migration Guide](#-migration-guide)
    - [From Legacy Component](#from-legacy-component)
    - [Breaking Changes](#breaking-changes)
  - [🤝 Contributing](#-contributing)
    - [Contribution Guidelines](#contribution-guidelines)
  - [🔗 Related Components](#-related-components)

## 📖 Overview

### Purpose

The `Article` component provides a sophisticated, accessible HTML `<article>` element designed to represent self-contained content that is independently distributable or reusable. Beyond basic semantic markup, it includes advanced features like content structure validation, automatic reading time calculation, analytics tracking, and rich visual enhancements.

### Key Features

- **Content Structure Validation**: Automatic validation of article content with visual indicators for invalid structures
- **Reading Time Calculation**: Automatic calculation and display of estimated reading time based on content length
- **Enhanced Visual Design**: Featured and summary variants with gradient backgrounds, hover effects, and visual indicators
- **ArticleUtils Export**: Comprehensive utility functions for content analysis and validation
- **Analytics Integration**: Built-in analytics tracking with content analysis and reading time data
- **Accessibility Excellence**: Full WCAG 2.1 AA compliance with semantic structure validation
- **Performance Optimized**: Client-side code splitting, memoization, and efficient content analysis

## 🚀 Quick Start

### Installation

To use the `Article` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `Article` component and use it to encapsulate self-contained content:

```typescript
import { Article } from "@guyromellemagayano/components";

// Basic article with automatic reading time
<Article>
  <h1>Understanding React Hooks</h1>
  <p>React Hooks revolutionized how we write components...</p>
</Article>

// Featured article with analytics
<Article featured analyticsId="featured-article-1">
  <h1>Breaking News</h1>
  <p>Important announcement content...</p>
</Article>
```

## ⚙️ Props

### Standard Props

These props are common across many components in the library.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The content to render inside the component. |
| `className` | `string` | - | Additional CSS classes to apply to the component. |
| `style` | `React.CSSProperties` | - | Inline styles to apply to the component. |
| `as` | `React.ElementType` \| `string` | `"article"` | The HTML element or custom component to render as. Defaults to `"article"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `isMemoized` | `boolean` | `false` | If `true` and `isClient` is also `true`, the client component will be memoized for performance optimization. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `onAnalytics` | `(data: { event: string; category: string; label: string; content: string; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `Article` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `featured` | `boolean` | `false` | If `true`, applies featured styling with gradient background, border accent, and enhanced hover effects. Also sets `aria-label="Featured article"`. |
| `summary` | `boolean` | `false` | If `true`, applies summary/excerpt styling with muted background and reduced font size. |

## 🛠️ Utility Functions

### ArticleUtils Export

The component exports comprehensive utility functions for content analysis and validation:

```typescript
import { ArticleUtils } from '@guyromellemagayano/components';

// Validate article structure
const isValid = ArticleUtils.validateStructure(content);

// Extract text content for analysis
const textContent = ArticleUtils.extractContent(children);

// Calculate reading time
const readingTime = ArticleUtils.calculateReadingTime(content, 200);
```

### Available Functions

| Function | Description | Example |
|----------|-------------|---------|
| `validateStructure(element)` | Validates if article has proper semantic structure | `ArticleUtils.validateStructure(children)` |
| `extractContent(children)` | Extracts text content from React elements for analysis | `ArticleUtils.extractContent(<div>text</div>)` |
| `calculateReadingTime(content, wpm?)` | Calculates estimated reading time (default: 200 wpm) | `ArticleUtils.calculateReadingTime(text, 250)` |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage with automatic content analysis.

```typescript
import { Article } from "@guyromellemagayano/components";

function BasicArticleExample() {
  return (
    <Article>
      <h2>Understanding React Hooks</h2>
      <p>React Hooks revolutionized how we write components by allowing function components to use state and other React features without writing a class.</p>
      <p>The most commonly used hooks are useState for state management and useEffect for side effects.</p>
    </Article>
  );
}
```

### Featured Article Example

Shows featured styling with enhanced visual design.

```typescript
import { Article } from "@guyromellemagayano/components";

function FeaturedArticleExample() {
  return (
    <Article featured>
      <h3>🎉 Major Product Launch</h3>
      <p>We're excited to announce our latest innovation that will transform how developers build applications.</p>
      <p>This breakthrough technology combines AI with traditional development workflows.</p>
    </Article>
  );
}
```

### Summary Article Example

Demonstrates summary styling for excerpts and previews.

```typescript
import { Article } from "@guyromellemagayano/components";

function SummaryArticleExample() {
  return (
    <Article summary>
      <h4>Quick Overview</h4>
      <p>This is a brief summary or excerpt of a longer article, styled with muted colors and compact spacing.</p>
    </Article>
  );
}
```

### With Reading Time Calculation

Shows automatic reading time calculation and display.

```typescript
import { Article } from "@guyromellemagayano/components";

function ReadingTimeExample() {
  const longContent = `
    This is a longer article with substantial content that will demonstrate 
    the automatic reading time calculation feature. The component analyzes 
    the word count and calculates an estimated reading time based on 
    average reading speed of 200 words per minute.
    
    ${Array(50).fill("Additional content to extend the article length. ").join("")}
  `;

  return (
    <Article featured>
      <h2>Comprehensive Guide</h2>
      <div dangerouslySetInnerHTML={{ __html: longContent }} />
      {/* Reading time automatically calculated and displayed on hover */}
    </Article>
  );
}
```

### With Content Validation

Demonstrates content structure validation with visual feedback.

```typescript
import { Article } from "@guyromellemagayano/components";

function ContentValidationExample() {
  return (
    <div>
      {/* Valid article structure */}
      <Article>
        <h2>Valid Article</h2>
        <p>This article has proper content structure.</p>
      </Article>

      {/* Invalid structure - will show warning styling */}
      <Article>
        {/* Empty content triggers invalid structure warning */}
      </Article>

      {/* Another invalid example */}
      <Article>
        {null} {/* Null content triggers validation warning */}
      </Article>
    </div>
  );
}
```

### With Analytics

Integrates comprehensive analytics tracking with content analysis.

```typescript
import { Article } from "@guyromellemagayano/components";

function AnalyticsArticleExample() {
  const handleAnalytics = (data) => {
    console.log('Article Analytics:', {
      event: data.event,
      category: data.category,
      label: data.label,
      contentPreview: data.content.substring(0, 100),
    });

    // Send to analytics platform with reading time data
    gtag('event', 'article_interaction', {
      article_id: data.label,
      content_length: data.content.length,
      // Reading time automatically included in gtag analytics
    });
  };

  return (
    <Article 
      analyticsId="blog-post-123"
      onAnalytics={handleAnalytics}
      featured
    >
      <h3>Analytics-Tracked Article</h3>
      <p>This article tracks user interactions and includes reading time data in analytics events.</p>
      <p>Click anywhere on the article to trigger analytics tracking.</p>
    </Article>
  );
}
```

### Using Utility Functions

Demonstrates programmatic use of ArticleUtils for content analysis.

```typescript
import { Article, ArticleUtils } from "@guyromellemagayano/components";
import { useState, useEffect } from "react";

function UtilityFunctionsExample() {
  const [content, setContent] = useState("");
  const [readingTime, setReadingTime] = useState(0);
  const [isValidStructure, setIsValidStructure] = useState(true);

  const articleContent = (
    <div>
      <h2>Dynamic Content Analysis</h2>
      <p>This example demonstrates real-time content analysis using ArticleUtils.</p>
      <p>{content}</p>
    </div>
  );

  useEffect(() => {
    // Extract and analyze content
    const extractedText = ArticleUtils.extractContent(articleContent);
    const calculatedTime = ArticleUtils.calculateReadingTime(extractedText);
    const structureValid = ArticleUtils.validateStructure(articleContent);

    setReadingTime(calculatedTime);
    setIsValidStructure(structureValid);
  }, [content, articleContent]);

  return (
    <div>
      <Article featured={content.length > 100}>
        {articleContent}
      </Article>
      
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5' }}>
        <h4>Content Analysis:</h4>
        <p>📖 Reading Time: {readingTime} minute(s)</p>
        <p>✅ Valid Structure: {isValidStructure ? 'Yes' : 'No'}</p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add more content to see analysis update..."
          style={{ width: '100%', height: '100px' }}
        />
      </div>
    </div>
  );
}
```

### Polymorphic Rendering

Shows rendering as different elements while maintaining semantic intent.

```typescript
import { Article } from "@guyromellemagayano/components";
import React from 'react';

function PolymorphicArticleExample() {
  const CustomSection = React.forwardRef((props, ref) => (
    <section {...props} ref={ref} className="custom-article-section" />
  ));

  return (
    <Article as={CustomSection} summary>
      <h3>Rendered as Section</h3>
      <p>This content maintains article semantics but uses section element.</p>
    </Article>
  );
}
```

### Client-Side Rendering

Demonstrates client-side rendering with dynamic content updates.

```typescript
import { Article } from "@guyromellemagayano/components";
import React, { useState, useEffect } from 'react';

function ClientArticleExample() {
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateCount(count => count + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Article 
      isClient 
      isMemoized
      featured={updateCount > 5}
    >
      <h3>Live Article Updates</h3>
      <p>This article content updates dynamically client-side.</p>
      <p>Updates: {updateCount} (becomes featured after 5 updates)</p>
      <p>Reading time and structure validation update automatically.</p>
    </Article>
  );
}
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices:

- **Semantic HTML**: Utilizes the native `<article>` element, which intrinsically conveys its purpose as self-contained content to assistive technologies.
- **Content Structure Validation**: Automatically validates and warns about invalid content structures that could impact screen reader navigation.
- **Enhanced Focus Management**: Provides visible focus indicators and logical focus order for interactive elements.
- **Reading Time Information**: Automatically calculates and provides reading time data via `data-reading-time` attribute for assistive technologies.
- **ARIA Enhancements**: Automatic `aria-label` for featured articles and support for custom ARIA attributes.
- **High Contrast**: Enhanced styling support for high contrast mode with thicker borders and distinct colors.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences by disabling animations and transforms.

### ARIA Attributes

Relevant ARIA attributes are automatically applied:

- `role="article"`: Explicitly set to ensure semantic meaning is preserved across different element types.
- `aria-label`: Automatically set to "Featured article" when `featured` prop is true, or can be customized.
- `aria-labelledby`: Can be used to associate the article with its main heading.
- `aria-describedby`: Links to descriptive text for additional context.

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.article` : The base class with typography, spacing, and transition styles.

### Modifiers

- `.article--featured`: Rich gradient background with accent border and enhanced hover effects.
- `.article--summary`: Muted background styling for excerpts and previews.
- `.article--invalid-structure`: Warning styling with dashed red border for content validation issues.

### Visual Features

The component includes sophisticated visual features:

- **Reading Time Indicator**: Displays estimated reading time on hover with book emoji and pill styling
- **Hover Effects**: Subtle transform and shadow effects for interactive articles
- **Gradient Backgrounds**: Beautiful gradient backgrounds for featured articles
- **Border Accents**: Colored left border accent for featured content
- **Structure Validation**: Visual warnings for invalid content structure
- **Analytics Indicators**: Development-only visual indicators for tracked articles

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties.
4. **CSS Modules**: Integrate with CSS Modules for scoped styling.

### CSS Variables

The component provides extensive styling customization through CSS:

```css
/* Featured article styling */
.article--featured {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
}

.article--featured::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

/* Reading time indicator */
.article[data-reading-time]::after {
  content: "📖 " attr(data-reading-time) " min read";
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.article:hover[data-reading-time]::after {
  opacity: 1;
}
```

## 🧪 Testing

### Test Files

Comprehensive test coverage is provided across these files:

- `index.test.tsx`: Contains main component tests and ArticleUtils function tests.

### Test Coverage

Tests cover a wide range of scenarios to ensure reliability:

- **Rendering**: Verifies basic rendering, prop application, and correct DOM output.
- **Variants**: Tests featured and summary styling with proper class application.
- **Content Validation**: Tests structure validation for valid and invalid content.
- **Reading Time**: Tests reading time calculation for various content lengths and types.
- **Analytics**: Validates comprehensive analytics tracking including content analysis and reading time data.
- **Utility Functions**: Comprehensive tests for all ArticleUtils functions including content extraction and validation.
- **Accessibility**: Ensures proper ARIA attributes, semantic structure, and focus management.
- **Error Handling**: Tests graceful handling of analytics failures and edge cases.

### Running Tests

To execute tests for the `Article` component:

```bash
# Run all tests for the Article component
pnpm test src/article/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Efficient Content Analysis**: Content extraction and reading time calculations are memoized to prevent unnecessary recalculation.
- **Conditional Features**: Visual indicators and validation only active when content is present.
- **Lazy Loading**: Client-side components are dynamically imported and lazy-loaded on demand.
- **Memory Management**: Event handlers are optimized with useCallback to prevent unnecessary re-renders.
- **Bundle Splitting**: ArticleUtils can be imported separately if only utility functions are needed.
- **CSS Optimizations**: Uses CSS transforms and transitions efficiently with reduced motion support.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile with responsive reading time indicators.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies.
- **CSS Features**: Graceful degradation for advanced CSS features like gradients and transforms.

## 📘 TypeScript

Full TypeScript support is provided with comprehensive type safety:

```typescript
import { 
  Article, 
  ArticleUtils,
  type ArticleProps, 
  type ArticleRef 
} from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyArticleComponent: React.FC = () => {
  const articleRef = useRef<ArticleRef>(null);
  
  const handleAnalytics = (data: Parameters<NonNullable<ArticleProps['onAnalytics']>>[0]) => {
    console.log(`Article "${data.label}" clicked with ${data.content.length} characters`);
  };

  // Type-safe utility usage
  const sampleContent = "This is sample content for reading time calculation.";
  const readingTime = ArticleUtils.calculateReadingTime(sampleContent, 200);
  const isValid = ArticleUtils.validateStructure(sampleContent);

  return (
    <Article 
      ref={articleRef}
      featured
      analyticsId="typescript-example"
      onAnalytics={handleAnalytics}
    >
      <h2>TypeScript Integration</h2>
      <p>Reading time: {readingTime} minute(s)</p>
      <p>Structure valid: {isValid ? 'Yes' : 'No'}</p>
    </Article>
  );
};

// Access utility functions with full type safety
const extractedText = ArticleUtils.extractContent(<div>Hello world</div>);
const calculatedTime = ArticleUtils.calculateReadingTime(extractedText);
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version to this `Article` component:

1. **Import Changes**: Update to `import { Article, ArticleUtils } from '@guyromellemagayano/components';`.
2. **Reading Time**: Reading time is now automatically calculated and displayed.
3. **Content Validation**: Structure validation is now automatic with visual feedback.
4. **Analytics Enhancement**: Analytics now includes reading time and content analysis data.
5. **Utility Functions**: Migrate to use `ArticleUtils` for content analysis.

### Breaking Changes

- Content structure validation is now enabled by default
- Reading time calculation is automatic and cannot be disabled
- Featured articles now have automatic `aria-label="Featured article"`

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Article` component:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md).
2. **Test Content Analysis**: Include tests for ArticleUtils functions and edge cases.
3. **Update Documentation**: Keep content structure and reading time documentation current.
4. **Accessibility Focus**: Prioritize semantic structure and screen reader compatibility.
5. **Performance**: Ensure content analysis functions remain efficient.

## 🔗 Related Components

- [Section](../section/README.md)
- [Header](../header/README.md)
- [Footer](../footer/README.md)

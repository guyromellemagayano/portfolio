<!-- markdownlint-disable line-length proper-names -->
# Aside Component

A sophisticated aside component with advanced positioning, content type classification, collapsible functionality, and comprehensive analytics tracking for supplementary content.

## 📋 Table of Contents

- [Aside Component](#aside-component)
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
    - [AsideUtils Export](#asideutils-export)
    - [Available Functions](#available-functions)
  - [💡 Examples](#-examples)
    - [Basic Example](#basic-example)
    - [Position Variants](#position-variants)
    - [Content Type Classification](#content-type-classification)
    - [Collapsible Functionality](#collapsible-functionality)
    - [Highlighted Aside](#highlighted-aside)
    - [With Analytics Tracking](#with-analytics-tracking)
    - [Using Utility Functions](#using-utility-functions)
    - [Polymorphic Rendering](#polymorphic-rendering)
    - [Client-Side Rendering](#client-side-rendering)
  - [♿ Accessibility](#-accessibility)
    - [Best Practices Followed](#best-practices-followed)
    - [ARIA Attributes](#aria-attributes)
  - [🎨 Styling](#-styling)
    - [BEM Methodology](#bem-methodology)
    - [Base Classes](#base-classes)
    - [Position Modifiers](#position-modifiers)
    - [Content Type Modifiers](#content-type-modifiers)
    - [State Modifiers](#state-modifiers)
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

The `Aside` component provides a sophisticated, accessible HTML `<aside>` element designed for supplementary content that is tangentially related to the main content. Beyond basic semantic markup, it includes advanced positioning systems, content type classification, collapsible functionality, and rich analytics tracking for comprehensive sidebar management.

### Key Features

- **Advanced Positioning**: Four distinct positioning modes (left, right, floating, sticky) with specialized styling
- **Content Type Classification**: Semantic content types (navigation, complementary, banner, search, form) with visual indicators
- **Collapsible Functionality**: Complete collapse/expand system with toggle buttons and state management
- **Highlighted State**: Visual emphasis for important supplementary content
- **AsideUtils Export**: Comprehensive utility functions for content validation and accessibility
- **Analytics Excellence**: Detailed interaction tracking including click and toggle analytics
- **Responsive Design**: Mobile-optimized with position adaptations and accessibility enhancements

## 🚀 Quick Start

### Installation

To use the `Aside` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `Aside` component and use it with advanced positioning and content classification:

```typescript
import { Aside } from '@guyromellemagayano/components';

// Basic complementary sidebar
<Aside position="right" contentType="complementary">
  <h3>Related Articles</h3>
  <ul>
    <li><a href="#">Article 1</a></li>
    <li><a href="#">Article 2</a></li>
  </ul>
</Aside>

// Collapsible navigation sidebar
<Aside 
  position="left" 
  contentType="navigation" 
  collapsible 
  showToggle
  analyticsId="nav-sidebar"
>
  <nav>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</Aside>
```

## ⚙️ Props

### Standard Props

These props are common across many components in the library.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The content to render inside the component. |
| `className` | `string` | - | Additional CSS classes to apply to the component. |
| `style` | `React.CSSProperties` | - | Inline styles to apply to the component. |
| `as` | `React.ElementType` \| `string` | `"aside"` | The HTML element or custom component to render as. Defaults to `"aside"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `isMemoized` | `boolean` | `false` | If `true` and `isClient` is also `true`, the client component will be memoized for performance optimization. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `onAnalytics` | `(data: { event: string; category: string; label: string; action: string; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `Aside` component and provide its advanced functionality.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"left" \| "right" \| "floating" \| "sticky"` | `"left"` | Position of the aside relative to main content with specialized styling for each mode. |
| `contentType` | `"navigation" \| "complementary" \| "banner" \| "search" \| "form"` | `"complementary"` | Type of aside content for semantic understanding and visual styling with emoji indicators. |
| `collapsible` | `boolean` | `false` | Whether the aside can be collapsed/expanded with animation and state management. |
| `defaultCollapsed` | `boolean` | `false` | Whether the aside is initially collapsed (only applies if `collapsible=true`). |
| `collapsed` | `boolean` | - | Controlled collapsed state for external state management. |
| `onCollapseChange` | `(collapsed: boolean) => void` | - | Callback function when collapse state changes, providing the new state. |
| `showToggle` | `boolean` | `false` | Whether to show a collapse/expand toggle button with accessibility support. |
| `toggleContent` | `{ collapsed: React.ReactNode; expanded: React.ReactNode; }` | - | Custom toggle button content for collapsed and expanded states. |
| `highlighted` | `boolean` | `false` | Whether the aside should be visually highlighted with special styling and star indicator. |

## 🛠️ Utility Functions

### AsideUtils Export

The component exports comprehensive utility functions for content analysis and accessibility:

```typescript
import { AsideUtils } from '@guyromellemagayano/components';

// Validate aside content structure
const isValid = AsideUtils.validateStructure(content, 'navigation');

// Extract text content for analysis
const textContent = AsideUtils.extractContent(children);

// Get appropriate ARIA label
const ariaLabel = AsideUtils.getAriaLabel('navigation', 'left');
```

### Available Functions

| Function | Description | Example |
|----------|-------------|---------|
| `validateStructure(element, contentType?)` | Validates if aside has proper content structure for its type | `AsideUtils.validateStructure(children, 'navigation')` |
| `extractContent(children)` | Extracts text content from React elements for analytics | `AsideUtils.extractContent(<div>text</div>)` |
| `getAriaLabel(contentType?, position?, customLabel?)` | Generates appropriate ARIA label based on type and position | `AsideUtils.getAriaLabel('search', 'right')` |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage with position and content type.

```typescript
import { Aside } from '@guyromellemagayano/components';

function BasicAsideExample() {
  return (
    <main>
      <article>
        <h1>Main Article Content</h1>
        <p>Primary content goes here...</p>
      </article>
      
      <Aside position="right" contentType="complementary">
        <h3>💡 Related Information</h3>
        <p>Supplementary content that enhances the main article.</p>
        <ul>
          <li><a href="#">Related Link 1</a></li>
          <li><a href="#">Related Link 2</a></li>
        </ul>
      </Aside>
    </main>
  );
}
```

### Position Variants

Shows all four positioning modes with their unique characteristics.

```typescript
import { Aside } from '@guyromellemagayano/components';

function PositionVariantsExample() {
  return (
    <div>
      {/* Left sidebar with border accent */}
      <Aside position="left" contentType="navigation">
        <nav>
          <h3>🧭 Navigation</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </Aside>

      {/* Right sidebar with border accent */}
      <Aside position="right" contentType="complementary">
        <h3>💡 Quick Tips</h3>
        <p>Helpful information for users.</p>
      </Aside>

      {/* Floating overlay sidebar */}
      <Aside position="floating" contentType="banner">
        <h3>📢 Important Notice</h3>
        <p>Floating announcement or call-to-action.</p>
      </Aside>

      {/* Sticky sidebar that follows scroll */}
      <Aside position="sticky" contentType="search">
        <h3>🔍 Quick Search</h3>
        <input type="search" placeholder="Search..." />
      </Aside>
    </div>
  );
}
```

### Content Type Classification

Demonstrates content type variants with visual indicators.

```typescript
import { Aside } from '@guyromellemagayano/components';

function ContentTypeExample() {
  return (
    <div>
      {/* Navigation sidebar with compass emoji */}
      <Aside contentType="navigation" position="left">
        <nav>
          <h3>Site Navigation</h3>
          <ul>
            <li><a href="/products">Products</a></li>
            <li><a href="/services">Services</a></li>
          </ul>
        </nav>
      </Aside>

      {/* Search sidebar with magnifying glass emoji */}
      <Aside contentType="search" position="right">
        <h3>Advanced Search</h3>
        <form>
          <input type="search" placeholder="Keywords..." />
          <select>
            <option>All Categories</option>
            <option>Articles</option>
          </select>
        </form>
      </Aside>

      {/* Banner sidebar with megaphone emoji */}
      <Aside contentType="banner" position="floating">
        <h3>Special Offer!</h3>
        <p>Limited time discount available.</p>
        <button>Learn More</button>
      </Aside>

      {/* Form sidebar with document emoji */}
      <Aside contentType="form" position="sticky">
        <h3>Quick Contact</h3>
        <form>
          <input type="email" placeholder="Your email..." />
          <textarea placeholder="Message..."></textarea>
          <button type="submit">Send</button>
        </form>
      </Aside>
    </div>
  );
}
```

### Collapsible Functionality

Shows complete collapse/expand system with state management.

```typescript
import { Aside } from '@guyromellemagayano/components';
import { useState } from 'react';

function CollapsibleAsideExample() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapseChange = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    console.log(`Sidebar ${collapsed ? 'collapsed' : 'expanded'}`);
  };

  return (
    <div>
      {/* Uncontrolled collapsible aside */}
      <Aside 
        collapsible 
        showToggle 
        defaultCollapsed={false}
        contentType="navigation"
        analyticsId="nav-sidebar"
      >
        <nav>
          <h3>Collapsible Navigation</h3>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/settings">Settings</a></li>
          </ul>
        </nav>
      </Aside>

      {/* Controlled collapsible aside */}
      <Aside 
        collapsible 
        showToggle
        collapsed={isCollapsed}
        onCollapseChange={handleCollapseChange}
        contentType="complementary"
        position="right"
      >
        <h3>Controlled Sidebar</h3>
        <p>This sidebar's state is controlled externally.</p>
        <p>Current state: {isCollapsed ? 'Collapsed' : 'Expanded'}</p>
      </Aside>

      {/* Custom toggle content */}
      <Aside 
        collapsible 
        showToggle
        toggleContent={{
          collapsed: <span>Open Menu</span>,
          expanded: <span>Close Menu</span>
        }}
        contentType="navigation"
      >
        <nav>
          <h3>Custom Toggle</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </Aside>
    </div>
  );
}
```

### Highlighted Aside

Demonstrates the highlighted state for important content.

```typescript
import { Aside } from '@guyromellemagayano/components';

function HighlightedAsideExample() {
  return (
    <div>
      {/* Highlighted promotional content */}
      <Aside 
        highlighted 
        contentType="banner" 
        position="floating"
        analyticsId="promo-sidebar"
      >
        <h3>⭐ Premium Feature</h3>
        <p>Upgrade to unlock advanced analytics and reporting.</p>
        <button>Upgrade Now</button>
      </Aside>

      {/* Highlighted important notice */}
      <Aside 
        highlighted 
        contentType="complementary" 
        position="right"
      >
        <h3>Important Update</h3>
        <p>New privacy policy effective next month.</p>
        <a href="/privacy">Read Details</a>
      </Aside>
    </div>
  );
}
```

### With Analytics Tracking

Integrates comprehensive analytics tracking for interactions and state changes.

```typescript
import { Aside } from '@guyromellemagayano/components';

function AnalyticsAsideExample() {
  const handleAnalytics = (data: {
    event: string;
    category: string;
    label: string;
    action: string;
  }) => {
    console.log('Aside Analytics:', {
      event: data.event,
      category: data.category,
      label: data.label,
      action: data.action,
      timestamp: new Date().toISOString(),
    });

    // Send to analytics platform
    gtag('event', data.event, {
      event_category: data.category,
      event_label: data.label,
      action: data.action,
    });
  };

  return (
    <div>
      {/* Click tracking aside */}
      <Aside 
        analyticsId="related-articles"
        onAnalytics={handleAnalytics}
        contentType="complementary"
        position="right"
      >
        <h3>Related Articles</h3>
        <p>Click anywhere on this sidebar to track interaction.</p>
        <ul>
          <li><a href="/article1">How to Optimize Performance</a></li>
          <li><a href="/article2">Advanced React Patterns</a></li>
        </ul>
      </Aside>

      {/* Toggle tracking aside */}
      <Aside 
        collapsible 
        showToggle
        analyticsId="collapsible-nav"
        onAnalytics={handleAnalytics}
        contentType="navigation"
        position="left"
      >
        <nav>
          <h3>Navigation Menu</h3>
          <p>Toggle actions are tracked with collapse/expand events.</p>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/reports">Reports</a></li>
          </ul>
        </nav>
      </Aside>
    </div>
  );
}
```

### Using Utility Functions

Demonstrates programmatic use of AsideUtils for content analysis.

```typescript
import { Aside, AsideUtils } from '@guyromellemagayano/components';
import { useState, useEffect } from 'react';

function UtilityFunctionsExample() {
  const [contentValid, setContentValid] = useState(true);
  const [ariaLabel, setAriaLabel] = useState('');

  const navigationContent = (
    <nav>
      <h3>Navigation Links</h3>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );

  useEffect(() => {
    // Validate navigation content
    const isValid = AsideUtils.validateStructure(navigationContent, 'navigation');
    setContentValid(isValid);

    // Generate appropriate ARIA label
    const label = AsideUtils.getAriaLabel('navigation', 'left');
    setAriaLabel(label);

    // Extract content for analysis
    const extractedText = AsideUtils.extractContent(navigationContent);
    console.log('Extracted content:', extractedText);
  }, [navigationContent]);

  return (
    <div>
      <Aside 
        contentType="navigation" 
        position="left"
        aria-label={ariaLabel}
      >
        {navigationContent}
      </Aside>
      
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5' }}>
        <h4>Content Analysis:</h4>
        <p>✅ Structure Valid: {contentValid ? 'Yes' : 'No'}</p>
        <p>🏷️ Generated ARIA Label: "{ariaLabel}"</p>
        <p>📝 Content Type: Navigation with proper nav elements</p>
      </div>
    </div>
  );
}
```

### Polymorphic Rendering

Shows rendering as different elements while maintaining semantic intent.

```typescript
import { Aside } from '@guyromellemagayano/components';
import React from 'react';

function PolymorphicAsideExample() {
  const CustomSection = React.forwardRef((props, ref) => (
    <section {...props} ref={ref} className="custom-aside-section" />
  ));

  return (
    <Aside 
      as={CustomSection} 
      contentType="complementary"
      position="right"
      highlighted
    >
      <h3>Custom Section Element</h3>
      <p>Rendered as section but maintains aside semantics and styling.</p>
    </Aside>
  );
}
```

### Client-Side Rendering

Demonstrates client-side rendering with dynamic content and interactions.

```typescript
import { Aside } from '@guyromellemagayano/components';
import React, { useState, useEffect } from 'react';

function ClientAsideExample() {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => [
        ...prev,
        `Notification ${prev.length + 1}: ${new Date().toLocaleTimeString()}`
      ].slice(-5)); // Keep only last 5
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Aside 
      isClient 
      isMemoized
      position="floating"
      contentType="banner"
      collapsible
      showToggle
      collapsed={isCollapsed}
      onCollapseChange={setIsCollapsed}
      highlighted={notifications.length > 3}
    >
      <h3>Live Notifications</h3>
      <p>Client-side updates with dynamic highlighting.</p>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
      {notifications.length === 0 && <p>No notifications yet...</p>}
    </Aside>
  );
}
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices:

- **Semantic HTML**: Utilizes the native `<aside>` element with proper complementary role.
- **Intelligent ARIA Labels**: Automatic generation of appropriate `aria-label` based on content type and position.
- **Collapse State Management**: Proper `aria-expanded` attributes for collapsible asides with toggle button accessibility.
- **Focus Management**: Enhanced focus indicators and logical focus order within collapsed/expanded states.
- **Content Structure Validation**: Automatic validation of content appropriateness for declared content types.
- **Keyboard Navigation**: Full keyboard support for toggle buttons and interactive elements.
- **Screen Reader Support**: Comprehensive support with semantic roles and descriptive labels.
- **High Contrast**: Enhanced styling support for high contrast mode with thicker borders.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences for animations and transforms.

### ARIA Attributes

Comprehensive ARIA attributes are automatically applied:

- `role="complementary"`: Default role for aside elements.
- `aria-label`: Automatically generated based on content type and position, or customizable.
- `aria-expanded`: Applied to collapsible asides indicating current state.
- `aria-controls`: Toggle buttons are properly associated with the aside they control.
- `aria-labelledby`: Can be used to associate with heading elements.
- `aria-describedby`: Links to descriptive text for additional context.

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.aside` : The base class with typography, spacing, and transition styles.
- `.aside__content` : Container for the main aside content with margin for toggle button.
- `.aside__toggle` : Toggle button with accessibility and interaction styles.

### Position Modifiers

- `.aside--left`: Left-positioned with right border accent and margin.
- `.aside--right`: Right-positioned with left border accent and margin.
- `.aside--floating`: Fixed positioning with shadow and z-index for overlay effect.
- `.aside--sticky`: Sticky positioning that follows scroll with enhanced shadow.

### Content Type Modifiers

Each content type has distinct styling with gradient backgrounds and emoji indicators:

- `.aside--navigation`: Navigation content with compass emoji (🧭) and blue gradient.
- `.aside--complementary`: Complementary content with lightbulb emoji (💡) and green gradient.
- `.aside--banner`: Banner content with megaphone emoji (📢) and yellow gradient.
- `.aside--search`: Search content with magnifying glass emoji (🔍) and purple gradient.
- `.aside--form`: Form content with document emoji (📝) and red gradient.

### State Modifiers

- `.aside--collapsible`: Base styles for collapsible functionality with overflow management.
- `.aside--collapsed`: Collapsed state with hidden content and reduced padding.
- `.aside--highlighted`: Special highlighting with star indicator and golden styling.
- `.aside--invalid-structure`: Warning styling for content validation issues.

### Visual Features

The component includes sophisticated visual features:

- **Gradient Backgrounds**: Beautiful gradient backgrounds specific to each content type
- **Emoji Indicators**: Content type indicators positioned in top-right corner
- **Border Accents**: Colored borders that vary by position and content type
- **Hover Effects**: Subtle transforms and shadow changes for interactive asides
- **Toggle Animations**: Smooth collapse/expand animations with content hiding
- **Highlight Effects**: Special star indicator and golden styling for highlighted asides
- **Responsive Adaptations**: Mobile-optimized positioning and sizing

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **Position Variants**: Use different position props for automatic styling variations.
4. **Content Type Styling**: Leverage content type classifications for semantic styling.
5. **CSS Variables**: Override default values in your stylesheets.

### CSS Variables

The component provides extensive styling through CSS classes:

```css
/* Position-specific styling */
.aside--left {
  border-right: 3px solid #3b82f6;
  border-radius: 0 6px 6px 0;
  margin-right: 1rem;
}

.aside--right {
  border-left: 3px solid #3b82f6;
  border-radius: 6px 0 0 6px;
  margin-left: 1rem;
}

/* Content type specific gradients */
.aside--navigation {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-color: #3b82f6;
}

.aside--complementary {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-color: #22c55e;
}

/* Collapsible functionality */
.aside--collapsed .aside__content {
  display: none;
}

/* Toggle button styling */
.aside__toggle {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  width: 28px;
  height: 28px;
}
```

## 🧪 Testing

### Test Files

Comprehensive test coverage is provided across these files:

- `index.test.tsx`: Contains main component tests and AsideUtils function tests.

### Test Coverage

Tests cover a wide range of scenarios to ensure reliability:

- **Position Variants**: Tests all four positioning modes with proper class application and data attributes.
- **Content Types**: Validates all content type classifications with appropriate styling and ARIA labels.
- **Collapsible Functionality**: Comprehensive testing of collapse/expand behavior, state management, and toggle interactions.
- **Analytics Integration**: Tests both click and toggle analytics with custom functions and default gtag integration.
- **Content Validation**: Tests structure validation for different content types and edge cases.
- **Accessibility**: Ensures proper ARIA attributes, semantic roles, and keyboard navigation.
- **Utility Functions**: Comprehensive tests for all AsideUtils functions including edge cases.
- **Error Handling**: Tests graceful handling of analytics failures and invalid states.

### Running Tests

To execute tests for the `Aside` component:

```bash
# Run all tests for the Aside component
pnpm test src/aside/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **State Management Optimization**: Efficient useState and useCallback usage for collapse state management.
- **Conditional Rendering**: Toggle buttons and content only rendered when needed.
- **Memoized Calculations**: Props and event handlers are memoized to prevent unnecessary re-renders.
- **CSS Transitions**: Hardware-accelerated CSS transitions for smooth animations.
- **Client-Side Code Splitting**: AsideClient components lazy-loaded on demand.
- **Analytics Debouncing**: Efficient analytics tracking with error handling that doesn't impact performance.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Responsive positioning adaptations for mobile with touch-optimized toggle buttons.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies.
- **CSS Features**: Graceful degradation for advanced CSS features like gradients and transforms.

## 📘 TypeScript

Full TypeScript support is provided with comprehensive type safety:

```typescript
import { 
  Aside, 
  AsideUtils,
  type AsideProps, 
  type AsideRef 
} from '@guyromellemagayano/components';
import React, { useRef, useState } from 'react';

const MyAsideComponent: React.FC = () => {
  const asideRef = useRef<AsideRef>(null);
  const [collapsed, setCollapsed] = useState(false);
  
  const handleAnalytics = (data: Parameters<NonNullable<AsideProps['onAnalytics']>>[0]) => {
    console.log(`Aside "${data.label}" performed ${data.action}`);
  };

  const handleCollapseChange = (newCollapsed: boolean) => {
    setCollapsed(newCollapsed);
    console.log(`Sidebar ${newCollapsed ? 'collapsed' : 'expanded'}`);
  };

  // Type-safe utility usage
  const isValidNavigation = AsideUtils.validateStructure(<nav><ul><li>Home</li></ul></nav>, 'navigation');
  const ariaLabel = AsideUtils.getAriaLabel('navigation', 'left');

  return (
    <Aside 
      ref={asideRef}
      position="left"
      contentType="navigation"
      collapsible
      showToggle
      collapsed={collapsed}
      onCollapseChange={handleCollapseChange}
      analyticsId="main-navigation"
      onAnalytics={handleAnalytics}
      highlighted={!collapsed}
    >
      <nav>
        <h3>Site Navigation</h3>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </Aside>
  );
};

// Access utility functions with full type safety
const label = AsideUtils.getAriaLabel('search', 'floating');
const isValid = AsideUtils.validateStructure('Invalid content', 'navigation');
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version to this `Aside` component:

1. **Import Changes**: Update to `import { Aside, AsideUtils } from '@guyromellemagayano/components';`.
2. **Position Props**: Migrate to the new position system (left, right, floating, sticky).
3. **Content Types**: Utilize content type classification for semantic styling.
4. **Collapsible System**: Migrate to the new collapsible functionality with state management.
5. **Analytics Enhancement**: Update to the new analytics system with action tracking.
6. **Utility Functions**: Migrate to use `AsideUtils` for content validation and ARIA label generation.

### Breaking Changes

- Collapsible functionality now requires explicit `collapsible` prop
- Analytics function signature changed to include `action` parameter
- Position-based styling is now automatic based on `position` prop
- Content validation is now automatic with visual feedback

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Aside` component:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md).
2. **Test All Features**: Include tests for positioning, content types, collapsible functionality, and analytics.
3. **Update Documentation**: Keep positioning and content type documentation current.
4. **Accessibility Focus**: Prioritize semantic structure and ARIA label generation.
5. **Performance**: Ensure state management and animations remain efficient.

## 🔗 Related Components

- [Section](../section/README.md)
- [Main](../main/README.md)
- [Nav](../nav/README.md)

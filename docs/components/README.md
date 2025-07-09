<!-- markdownlint-disable line-length descriptive-link-text link-fragments -->

# Component Library Documentation

A comprehensive library of React components built with TypeScript, featuring polymorphic rendering, accessibility-first design, and comprehensive analytics integration.

## 📋 Table of Contents

- [📖 Overview](#-overview)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#-configuration)
- [💡 Usage](#-usage)
- [🔍 Components](#-components)
- [🧪 Testing](#-testing)
- [📘 Development](#-development)
- [🤝 Contributing](#-contributing)

## 📖 Overview

This component library provides a comprehensive collection of HTML element components with enhanced functionality, type safety, and accessibility features. Built with modern React patterns and TypeScript, it offers:

- **Polymorphic Rendering**: Components can render as any HTML element while maintaining type safety
- **Accessibility First**: WCAG 2.1 AA compliance with comprehensive ARIA support
- **Analytics Integration**: Built-in Google Analytics tracking for all interactions
- **Server-Side Rendering**: Optimized for SSR with optional client-side hydration
- **TypeScript Support**: Full type safety with intelligent autocompletion
- **Comprehensive Testing**: 100% test coverage with memory-optimized test execution

## 🚀 Installation

```bash
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
# or
pnpm add @guyromellemagayano/components
```

## ⚙️ Configuration

### Basic Setup

```tsx
import { A, Button, Canvas } from '@guyromellemagayano/components';

function App() {
  return (
    <div>
      <A href="/about">About</A>
      <Button variant="primary">Click me</Button>
      <Canvas width={300} height={200} />
    </div>
  );
}
```

### Analytics Configuration

```tsx
import { A } from '@guyromellemagayano/components';

function AnalyticsExample() {
  return (
    <A
      href="/signup"
      analyticsId="header-signup-link"
      onAnalytics={(data) => {
        console.log('Link clicked:', data);
        // Custom analytics tracking
      }}
    >
      Sign Up
    </A>
  );
}
```

## 💡 Usage

### Polymorphic Rendering

```tsx
import { A } from '@guyromellemagayano/components';

function PolymorphicExample() {
  return (
    <div>
      {/* Renders as <a> element */}
      <A href="/home">Home</A>
      
      {/* Renders as <button> element */}
      <A as="button" onClick={() => router.push('/home')}>
        Home
      </A>
      
      {/* Renders as custom component */}
      <A as={NextLink} href="/home">
        Home
      </A>
    </div>
  );
}
```

### Server-Side Rendering

```tsx
import { Button } from '@guyromellemagayano/components';

function ServerExample() {
  return (
    <div>
      {/* Server-side rendered by default */}
      <Button variant="primary">Server Button</Button>
      
      {/* Client-side rendered with hydration */}
      <Button variant="primary" isClient>
        Client Button
      </Button>
      
      {/* Client-side with memoization */}
      <Button variant="primary" isClient isMemoized>
        Memoized Client Button
      </Button>
    </div>
  );
}
```

## 🔍 Components

### Component Migration Status

- **Total Components**: 115 (estimated HTML elements)
- **Migrated Components**: 17 (17/115 - 15% complete)
- **Test Coverage**: 84.15% across all components (exceeds 80% target)

### Available Components

| Component | Status | Description |
|-----------|---------|-------------|
| **A** | ✅ Complete | Advanced link component with variants, security, analytics |
| **Abbr** | ✅ Complete | Abbreviation component with tooltip support |
| **Address** | ✅ Complete | Contact information component |
| **Area** | ✅ Complete | Image map area component with validation |
| **Article** | ✅ Complete | Article content component with reading time |
| **Aside** | ✅ Complete | Sidebar content component |
| **Audio** | ✅ Complete | Audio player with custom controls |
| **B** | ✅ Complete | Bold text component |
| **Base** | ✅ Complete | Document base URL component |
| **Bdi** | ✅ Complete | Bidirectional isolation component |
| **Bdo** | ✅ Complete | Bidirectional override component |
| **Blockquote** | ✅ Complete | Quote component with citation |
| **Body** | ✅ Complete | Document body component |
| **Br** | ✅ Complete | Line break component |
| **Button** | ✅ Complete | Interactive button component |
| **Canvas** | ✅ Complete | Canvas drawing component with context management |

### Element Categories

The component library organizes HTML elements into logical categories:

- **Interactive**: `button`, `a`, `input`, `select`, `textarea`
- **Media**: `audio`, `video`, `img`, `canvas`, `svg`
- **Form**: `form`, `fieldset`, `legend`, `label`, `input`, `select`, `textarea`
- **Content**: `p`, `h1-h6`, `article`, `section`, `aside`, `header`, `footer`, `main`, `nav`
- **Text**: `span`, `strong`, `em`, `mark`, `del`, `ins`, `sub`, `sup`, `small`
- **List**: `ul`, `ol`, `li`, `dl`, `dt`, `dd`
- **Table**: `table`, `caption`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`
- **Structure**: `html`, `body`, `div`, `span` (generic containers)
- **Formatting**: `br`, `hr`, `pre`, `blockquote`, `address`, `figure`

### Component Development Lifecycle

1. **Scaffolding**: Generate component structure with element-specific props
2. **Implementation**: Develop core functionality with TypeScript
3. **Testing**: Achieve comprehensive test coverage
4. **Documentation**: Create detailed README with examples
5. **Integration**: Export from main library

## 🧪 Testing

### Test Coverage

- **Current Coverage**: 84.15% (exceeds 80% target)
- **Memory Optimized**: Custom test runner for CI/CD efficiency
- **Comprehensive**: Unit, integration, and accessibility tests

### Running Tests

```bash
# Run all tests
pnpm test

# Run component-specific tests
pnpm test src/a
pnpm test src/button
pnpm test src/canvas

# Run with coverage
pnpm test:coverage

# Run in watch mode
pnpm test:watch
```

### Test Structure

Each component includes:

- **Unit Tests**: Basic rendering and prop validation
- **Integration Tests**: Component interactions and state management
- **Accessibility Tests**: ARIA attributes and keyboard navigation
- **Analytics Tests**: Event tracking and custom analytics
- **Polymorphic Tests**: Rendering as different elements
- **Edge Cases**: Error handling and boundary conditions

## 📘 Development

### Component Standards

All components follow strict development standards:

- **TypeScript**: Full type safety with comprehensive interfaces
- **Accessibility**: WCAG 2.1 AA compliance
- **Analytics**: Built-in Google Analytics integration
- **Testing**: 100% test coverage requirement
- **Documentation**: Comprehensive README with examples
- **Polymorphic**: Support for rendering as different elements

### Development Tools

- **Scaffolding**: `pnpm scaffold <ComponentName>` - Generate component structure
- **Testing**: `pnpm test` - Run test suite
- **Coverage**: `pnpm test:coverage` - Generate coverage reports
- **Linting**: `pnpm lint` - Code quality checks
- **Documentation**: `pnpm docs` - Generate documentation

### Adding Components

1. **Generate Structure**: `pnpm scaffold MyComponent`
2. **Implement Logic**: Add functionality to `index.tsx`
3. **Style Component**: Update `styles.css` with BEM methodology
4. **Write Tests**: Achieve comprehensive test coverage
5. **Document**: Update README with examples and API docs
6. **Export**: Add to main library exports

## 🤝 Contributing

### Contribution Guidelines

1. **Follow Standards**: Adhere to component development standards
2. **Test Coverage**: Maintain 100% test coverage
3. **Documentation**: Update README files and JSDoc comments
4. **Accessibility**: Ensure WCAG 2.1 AA compliance
5. **Performance**: Consider performance impact of changes
6. **TypeScript**: Use proper typing for all props and functions

### Development Process

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Write comprehensive tests
5. Update documentation
6. Submit a pull request

### Code Review

All contributions undergo thorough code review focusing on:

- Code quality and maintainability
- Test coverage and reliability
- Documentation accuracy and completeness
- Accessibility compliance
- Performance optimization
- TypeScript safety

---

For detailed information about specific components, see their individual README files in the `src/` directory.

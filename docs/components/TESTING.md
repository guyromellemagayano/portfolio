<!-- markdownlint-disable line-length -->
# 🧪 Memory-Efficient Testing Guide

This document outlines comprehensive testing strategies for components, focusing on memory efficiency, performance optimization, and best practices for maintaining high-quality test coverage.

## 📋 Table of Contents

- [🧪 Memory-Efficient Testing Guide](#-memory-efficient-testing-guide)
  - [📋 Table of Contents](#-table-of-contents)
  - [📖 Overview](#-overview)
    - [Testing Philosophy](#testing-philosophy)
    - [Memory Management](#memory-management)
  - [🚨 Problem Analysis](#-problem-analysis)
    - [Common Memory Issues](#common-memory-issues)
    - [Performance Impact](#performance-impact)
    - [Root Causes](#root-causes)
  - [✅ Solution Strategies](#-solution-strategies)
    - [Lightweight Testing](#lightweight-testing)
    - [Component-Level Testing](#component-level-testing)
    - [Isolated Testing](#isolated-testing)
    - [Memory Monitoring](#memory-monitoring)
  - [🔧 Configuration Options](#-configuration-options)
    - [Standard Configuration](#standard-configuration)
    - [Light Configuration](#light-configuration)
    - [Custom Memory Limits](#custom-memory-limits)
    - [Environment Variables](#environment-variables)
  - [🎯 Usage Patterns](#-usage-patterns)
    - [Development Workflow](#development-workflow)
    - [CI/CD Integration](#cicd-integration)
    - [Debugging Strategies](#debugging-strategies)
    - [Performance Optimization](#performance-optimization)
  - [📊 Test Coverage Standards](#-test-coverage-standards)
    - [Required Test Categories](#required-test-categories)
    - [Coverage Requirements](#coverage-requirements)
    - [Quality Metrics](#quality-metrics)
  - [🛠️ Testing Tools](#️-testing-tools)
    - [Vitest Framework](#vitest-framework)
    - [Testing Library](#testing-library)
    - [Memory Monitoring Tools](#memory-monitoring-tools)
    - [Coverage Analysis](#coverage-analysis)
  - [📚 Best Practices](#-best-practices)
    - [Test Structure](#test-structure)
    - [Memory Optimization](#memory-optimization)
    - [Performance Guidelines](#performance-guidelines)
    - [Debugging Techniques](#debugging-techniques)
  - [🚀 Quick Start Guide](#-quick-start-guide)
    - [For New Developers](#for-new-developers)
    - [For Component Authors](#for-component-authors)
    - [For Debugging Issues](#for-debugging-issues)
  - [🔍 Troubleshooting](#-troubleshooting)
    - [Common Issues](#common-issues)
    - [Memory Leaks](#memory-leaks)
    - [Performance Problems](#performance-problems)
    - [Configuration Issues](#configuration-issues)

## 📖 Overview

### Testing Philosophy

Our testing approach prioritizes:

- **Memory Efficiency**: Optimized for constrained environments
- **Comprehensive Coverage**: 100% test coverage across all components
- **Performance**: Fast execution without compromising quality
- **Maintainability**: Clear, readable tests that are easy to update
- **Reliability**: Consistent results across different environments

### Memory Management

Effective memory management is crucial for:

- **CI/CD Pipelines**: Limited memory environments
- **Development Workflow**: Fast feedback loops
- **Large Component Libraries**: Scalable testing strategies
- **Debugging**: Identifying memory leaks and performance issues

## 🚨 Problem Analysis

### Common Memory Issues

When running comprehensive component tests, you may encounter:

- **JavaScript heap out of memory** errors
- **Test timeouts** due to memory pressure
- **Slow test execution** affecting development velocity
- **Browser crashes** in test environments
- **Inconsistent results** across different machines

### Performance Impact

Memory issues can significantly impact:

- **Development Speed**: Slow tests reduce productivity
- **CI/CD Reliability**: Failed builds due to memory constraints
- **Debugging Efficiency**: Difficult to isolate issues
- **Team Collaboration**: Inconsistent test results

### Root Causes

Common causes of memory issues in component testing:

- **Large Component Trees**: Complex nested component structures
- **Heavy Dependencies**: Analytics, styling, or external libraries
- **Concurrent Execution**: Multiple tests running simultaneously
- **Resource Cleanup**: Inadequate cleanup in test teardown
- **CSS Processing**: Heavy styling calculations during tests

## ✅ Solution Strategies

### Lightweight Testing

**Best for**: Memory-constrained environments, CI/CD pipelines

```bash
# Run all tests with minimal memory usage
pnpm test:light:run

# Watch mode with light configuration
pnpm test:watch:light

# Test specific component with light config
pnpm test:light src/area
```

**Features**:

- Single worker process for memory efficiency
- No concurrent test execution
- Disabled CSS processing to reduce memory usage
- 2GB heap limit for constrained environments
- Fast timeouts to prevent hanging tests
- No coverage analysis by default

### Component-Level Testing

**Best for**: Testing individual components with memory efficiency

```bash
# Test individual components
pnpm test:a
pnpm test:abbr
pnpm test:address
pnpm test:area

# Test all components sequentially
pnpm test:all-components

# Test specific component with full isolation
pnpm test:component src/area
```

**Features**:

- One component at a time for maximum memory efficiency
- Automatic light configuration usage
- Sequential execution to prevent memory buildup
- No complex configuration required
- Fast feedback for development

### Isolated Testing

**Best for**: Testing one component at a time with full isolation

```bash
# Run all components individually
pnpm test:isolated

# Test specific components with isolation
pnpm test:component src/area

# Test with increased memory allocation
pnpm test:memory

# Test with memory monitoring
node --expose-gc --max-old-space-size=4096 ./node_modules/.bin/vitest run
```

**Features**:

- Each component runs in separate process
- Automatic garbage collection between tests
- Memory monitoring and reporting
- Timeout protection for hanging tests
- Detailed failure reporting with memory analysis

### Memory Monitoring

**Best for**: Debugging memory issues and performance optimization

```bash
# Enable memory monitoring
node --expose-gc --max-old-space-size=4096 ./node_modules/.bin/vitest run

# Monitor specific component
pnpm test:memory src/area

# Detailed memory analysis
pnpm test:isolated
```

**Features**:

- Real-time memory usage tracking
- Garbage collection monitoring
- Memory leak detection
- Performance profiling
- Detailed reporting and analysis

## 🔧 Configuration Options

### Standard Configuration

**File**: `vitest.config.ts`

**Best for**: Development with adequate memory

```tsx
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    // Memory: 4GB+ recommended
    // Workers: 1 (optimized)
    // Concurrency: 3 tests max
  },
});
```

**Features**:

- Full test environment with coverage
- Multiple workers for parallel execution
- Comprehensive reporting
- Memory: 4GB+ recommended
- Workers: 1 (optimized)
- Concurrency: 3 tests maximum

### Light Configuration

**File**: `vitest.light.config.ts`

**Best for**: CI, memory-constrained environments, component-level testing

```tsx
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    // Memory: 2GB heap limit
    // Workers: 1 single fork
    // Concurrency: Sequential only
    // No coverage by default
  },
});
```

**Features**:

- Minimal memory footprint
- Single worker process
- Sequential test execution
- Disabled CSS processing
- 2GB heap limit
- Fast timeouts

### Custom Memory Limits

```bash
# 8GB heap limit for intensive testing
node --max-old-space-size=8192 ./node_modules/.bin/vitest run

# Enable garbage collection exposure
node --expose-gc --max-old-space-size=4096 ./node_modules/.bin/vitest run

# Custom memory with monitoring
node --expose-gc --max-old-space-size=6144 ./node_modules/.bin/vitest run --reporter=verbose
```

### Environment Variables

```bash
# Disable concurrent tests
export VITEST_MAX_CONCURRENCY=1

# Reduce workers
export VITEST_MAX_WORKERS=1

# Enable memory monitoring
export NODE_OPTIONS="--max-old-space-size=4096 --expose-gc"

# Custom timeout
export VITEST_TIMEOUT=10000
```

## 🎯 Usage Patterns

### Development Workflow

**For everyday development**:

```bash
# Quick component test during development
pnpm test:light src/area

# Watch specific component
vitest --config vitest.light.config.ts --watch src/area

# Test with memory monitoring
pnpm test:memory src/area
```

**For component development**:

```bash
# Test new component
pnpm test:component src/new-component

# Watch mode for rapid development
pnpm test:watch:light src/new-component

# Full test suite for component
pnpm test:isolated src/new-component
```

### CI/CD Integration

**For automated testing**:

```bash
# Memory-efficient component-by-component testing
pnpm test:all-components

# Isolated testing with monitoring
pnpm test:isolated

# Light configuration for CI
pnpm test:light:run
```

**For performance optimization**:

```bash
# Test with memory monitoring
node --expose-gc --max-old-space-size=4096 ./node_modules/.bin/vitest run

# Use isolated runner for detailed analysis
pnpm test:isolated

# Component-specific testing
pnpm test:components
```

### Debugging Strategies

**For memory issues**:

```bash
# Identify problematic components
pnpm test:isolated

# Detailed memory analysis
node --expose-gc --max-old-space-size=4096 ./node_modules/.bin/vitest run

# Component-by-component debugging
pnpm test:all-components
```

**For performance problems**:

```bash
# Profile memory usage
node --inspect --max-old-space-size=4096 ./node_modules/.bin/vitest run

# Monitor specific component
pnpm test:memory src/problematic-component

# Light configuration for fast feedback
pnpm test:light src/problematic-component
```

### Performance Optimization

**For large test suites**:

```bash
# Sequential execution
pnpm test:all-components

# Memory-efficient testing
pnpm test:light:run

# Isolated component testing
pnpm test:isolated
```

## 📊 Test Coverage Standards

### Required Test Categories

Every component must include tests for:

- **Basic Rendering**: Default props, custom content, semantic meaning
- **Variants**: All component variants and their classes/attributes
- **Custom Styling**: className merging, custom styles
- **Analytics Integration**: analyticsId, onAnalytics, data attributes
- **Event Handling**: onClick, onMouseEnter, onFocus
- **Polymorphic Rendering**: `as` prop functionality
- **Data Attributes**: All data attributes in different scenarios
- **Client-side Rendering**: isClient, isMemoized
- **Edge Cases**: Empty content, complex children, ref forwarding
- **Accessibility**: ARIA attributes, keyboard navigation
- **Error Boundaries**: Error handling and recovery

### Coverage Requirements

- **Minimum 90% code coverage** across all components
- **100% line coverage** for critical paths
- **100% branch coverage** for conditional logic
- **All user interactions tested** thoroughly
- **Error scenarios covered** comprehensively
- **Edge cases handled** properly

### Quality Metrics

**Performance Standards**:

- Test execution time under 30 seconds per component
- Memory usage under 2GB for light configuration
- No memory leaks in test teardown
- Consistent results across environments

**Reliability Standards**:

- No flaky tests or intermittent failures
- Deterministic test results
- Proper cleanup in test teardown
- Isolated test environments

## 🛠️ Testing Tools

### Vitest Framework

**Primary testing framework** with excellent performance:

```tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from './index';

describe('Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<Component>Content</Component>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
```

**Features**:

- Fast execution with minimal overhead
- Excellent TypeScript support
- Built-in coverage analysis
- Parallel test execution
- Memory-efficient configuration options

### Testing Library

**Component testing utilities** for realistic testing:

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Render component
const { container, rerender } = render(<Component />);

// Query elements
const element = screen.getByRole('button');
const input = screen.getByLabelText('Email');

// Simulate user interactions
await userEvent.click(element);
await userEvent.type(input, 'test@example.com');

// Wait for async operations
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

**Features**:

- User-centric testing approach
- Accessible query methods
- Realistic user interaction simulation
- Async operation handling
- Accessibility-focused testing

### Memory Monitoring Tools

**Built-in memory monitoring** for debugging:

```bash
# Enable memory monitoring
node --expose-gc --max-old-space-size=4096 ./node_modules/.bin/vitest run

# Monitor specific component
pnpm test:memory src/area

# Detailed memory analysis
pnpm test:isolated
```

**Features**:

- Real-time memory usage tracking
- Garbage collection monitoring
- Memory leak detection
- Performance profiling
- Detailed reporting

### Coverage Analysis

**Comprehensive coverage reporting**:

```bash
# Generate coverage report
pnpm test:coverage

# Coverage with specific components
pnpm test:coverage src/area

# HTML coverage report
pnpm test:coverage --reporter=html
```

**Features**:

- Line, branch, and function coverage
- HTML and JSON reports
- Coverage thresholds
- Missing coverage identification
- Historical coverage tracking

## 📚 Best Practices

### Test Structure

**Organize tests logically**:

```tsx
describe('Component', () => {
  // Setup and teardown
  beforeEach(() => {
    // Setup code
  });

  afterEach(() => {
    // Cleanup code
  });

  // Test categories
  describe('Basic Rendering', () => {
    // Basic rendering tests
  });

  describe('Variants', () => {
    // Variant tests
  });

  describe('Event Handling', () => {
    // Event tests
  });

  describe('Accessibility', () => {
    // Accessibility tests
  });
});
```

**Best practices**:

- Group related tests in describe blocks
- Use descriptive test names
- Keep tests focused and isolated
- Clean up resources in teardown
- Mock external dependencies appropriately

### Memory Optimization

**Optimize test memory usage**:

```tsx
// Use cleanup in teardown
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock heavy dependencies
vi.mock('heavy-library', () => ({
  default: vi.fn(),
}));

// Avoid large test data
const minimalProps = { /* minimal props */ };
```

**Memory optimization techniques**:

- Clean up resources in test teardown
- Mock heavy dependencies
- Avoid creating large test data
- Use light configuration for development
- Run tests sequentially when needed

### Performance Guidelines

**Optimize test performance**:

```tsx
// Use efficient queries
screen.getByRole('button'); // ✅ Good
screen.getByTestId('button'); // ❌ Avoid

// Mock expensive operations
vi.mock('analytics', () => ({
  track: vi.fn(),
}));

// Use setup/teardown efficiently
beforeAll(() => {
  // One-time setup
});
```

**Performance best practices**:

- Use efficient query methods
- Mock expensive operations
- Minimize DOM manipulation
- Use setup/teardown efficiently
- Avoid unnecessary re-renders

### Debugging Techniques

**Effective debugging strategies**:

```bash
# Debug specific test
vitest --run src/component/index.test.tsx

# Debug with verbose output
vitest --run --reporter=verbose src/component/

# Debug with memory monitoring
node --inspect --max-old-space-size=4096 ./node_modules/.bin/vitest run
```

**Debugging best practices**:

- Use isolated testing for problematic components
- Monitor memory usage during debugging
- Use verbose output for detailed analysis
- Debug specific tests rather than entire suites
- Use memory profiling tools

## 🚀 Quick Start Guide

### For New Developers

1. **Start with light configuration**:

   ```bash
   pnpm test:light:run
   ```

2. **Test individual components**:

   ```bash
   pnpm test:component src/component-name
   ```

3. **Use watch mode for development**:

   ```bash
   pnpm test:watch:light src/component-name
   ```

4. **Read the standards**: Review [COMPONENT_STANDARDS.md](./COMPONENT_STANDARDS.md)

### For Component Authors

1. **Create comprehensive tests**:

   ```bash
   pnpm test:component src/new-component
   ```

2. **Ensure full coverage**:

   ```bash
   pnpm test:coverage src/new-component
   ```

3. **Test all scenarios**:
   - Basic rendering
   - All variants
   - Event handling
   - Accessibility
   - Polymorphic rendering

4. **Optimize for memory**:
   - Use light configuration
   - Mock heavy dependencies
   - Clean up resources

### For Debugging Issues

1. **Identify problematic components**:

   ```bash
   pnpm test:isolated
   ```

2. **Monitor memory usage**:

   ```bash
   pnpm test:memory src/problematic-component
   ```

3. **Use detailed analysis**:

   ```bash
   node --expose-gc --max-old-space-size=4096 ./node_modules/.bin/vitest run
   ```

4. **Debug specific tests**:

   ```bash
   vitest --run src/component/index.test.tsx
   ```

## 🔍 Troubleshooting

### Common Issues

**"Heap out of memory" errors**:

```bash
# Use light configuration
pnpm test:light:run

# Increase heap size
node --max-old-space-size=8192 ./node_modules/.bin/vitest run

# Run component-by-component
pnpm test:all-components
```

**Tests hanging or timing out**:

```bash
# Check for memory leaks
pnpm test:isolated

# Use shorter timeouts
pnpm test:light:run

# Debug specific component
pnpm test:memory src/problematic-component
```

**Slow test execution**:

```bash
# Use light configuration
pnpm test:light:run

# Run tests sequentially
pnpm test:all-components

# Mock heavy dependencies
# Update test configuration
```

### Memory Leaks

**Identify memory leaks**:

```bash
# Use isolated testing
pnpm test:isolated

# Monitor memory usage
node --expose-gc --max-old-space-size=4096 ./node_modules/.bin/vitest run

# Profile specific components
pnpm test:memory src/component-name
```

**Fix memory leaks**:

- Clean up resources in test teardown
- Mock heavy dependencies
- Avoid creating large objects in tests
- Use proper cleanup functions

### Performance Problems

**Optimize test performance**:

```bash
# Use light configuration
pnpm test:light:run

# Run tests sequentially
pnpm test:all-components

# Monitor performance
pnpm test:memory
```

**Performance optimization**:

- Mock expensive operations
- Use efficient query methods
- Minimize DOM manipulation
- Use setup/teardown efficiently

### Configuration Issues

**Debug configuration problems**:

```bash
# Check configuration
vitest --config vitest.light.config.ts --run

# Test specific configuration
vitest --config vitest.config.ts --run

# Verify environment setup
node --version
npm --version
```

**Configuration best practices**:

- Use appropriate configuration for environment
- Test configuration changes incrementally
- Monitor memory usage with different configs
- Document configuration requirements

---

This comprehensive testing guide ensures reliable, efficient, and maintainable test suites for our component library while addressing memory constraints and performance requirements.

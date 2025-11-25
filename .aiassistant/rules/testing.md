---
apply: by file patterns
patterns: apps/**/*.tsx, packages/**/*.tsx
---

# Testing Standards

## Test Classification Requirements

All test files must include classification comments:

```typescript
// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit/Integration/E2E
// - Coverage: Tier 1 (90%+), Tier 2 (80%+), Tier 3 (60%+)
// - Risk Tier: Critical/Core/Presentational
// - Component Type: Compound/Orchestrator/Presentational/Utility
// ============================================================================
```

## Test Structure Standards

### Required Test Categories

- **Basic Rendering Tests**: Component renders correctly
- **Content Validation Tests**: Handles null/undefined content
- **Debug Mode Tests**: Applies debug attributes when enabled
- **Component Structure Tests**: Correct element types and CSS classes
- **Ref Forwarding Tests**: Forwards ref correctly
- **Accessibility Tests**: Proper semantic structure and ARIA attributes
- **ARIA Attributes Testing**: Comprehensive accessibility validation

### Test Cleanup Requirements

All test files must include cleanup:

```typescript
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("ComponentName", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  // Test cases...
});
```

## Integration Test Criteria

Write integration tests ONLY for:

- ✅ Compound components with 3+ sub-components
- ✅ Components with complex state management across sub-components
- ✅ Components with prop drilling to multiple internal components

Skip integration tests for:

- ❌ Simple presentational components
- ❌ Components that just wrap other components
- ❌ Pure data display components

## Test Coverage Requirements

- **Tier 1 (Critical)**: 90%+ coverage, comprehensive edge cases
- **Tier 2 (Core)**: 80%+ coverage, key paths + edges
- **Tier 3 (Presentational)**: 60%+ coverage, happy path + basic validation

## Mocking Standards

### Required Mocks for All Components

```typescript
// Mock useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock utility functions
vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));
```

## Test Query Standards

### Preferred Query Methods (in order)

1. **`getByRole`** - Most accessible, user-focused, **REQUIRED for ARIA testing**
2. **`getByLabelText`** - For form elements
3. **`getByPlaceholderText`** - For inputs
4. **`getByText`** - For text content
5. **`getByDisplayValue`** - For form values
6. **`getByTestId`** - Last resort, use with `data-testid`

### ARIA-Specific Query Patterns

```typescript
// Test ARIA roles
const mainElement = screen.getByRole("main");
const articleElement = screen.getByRole("article");
const buttonElement = screen.getByRole("button", { name: /go back/i });

// Test ARIA relationships
const articleElement = screen.getByRole("article");
expect(articleElement).toHaveAttribute("aria-labelledby", "article-title");
```

## Test Data Attributes

### Standard Test IDs

```typescript
// Component root elements
data-testid="${id}-${componentType}-root"

// Examples:
data-testid="test-id-card-root"
data-testid="test-id-header-root"
data-testid="test-id-footer-root"
```

### Debug Attributes

```typescript
// Debug mode
data-debug-mode="true" // when enabled
// No attribute when disabled

// Component IDs
data-${componentType}-id="${id}-${componentType}"
// Examples:
data-card-id="test-id-card"
data-header-id="test-id-header"
```

# Testing Standards

## Test Classification Requirements

All test files must include classification comments:

```typescript
// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit/Integration/E2E
// - Coverage: Tier 1 (90%+), Tier 2 (80%+), Tier 3 (60%+)
// - Risk Tier: Critical/Core/Presentational
// - Component Type: Compound/Orchestrator/Presentational/Utility
// ============================================================================
```

## Test Structure Standards

### Required Test Categories

- **Basic Rendering Tests**: Component renders correctly
- **Content Validation Tests**: Handles null/undefined content
- **Debug Mode Tests**: Applies debug attributes when enabled
- **Component Structure Tests**: Correct element types and CSS classes
- **Ref Forwarding Tests**: Forwards ref correctly
- **Accessibility Tests**: Proper semantic structure and ARIA attributes
- **ARIA Attributes Testing**: Comprehensive accessibility validation

### Test Cleanup Requirements

All test files must include cleanup:

```typescript
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("ComponentName", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  // Test cases...
});
```

## Integration Test Criteria

Write integration tests ONLY for:

- ✅ Compound components with 3+ sub-components
- ✅ Components with complex state management across sub-components
- ✅ Components with prop drilling to multiple internal components

Skip integration tests for:

- ❌ Simple presentational components
- ❌ Components that just wrap other components
- ❌ Pure data display components

## Test Coverage Requirements

- **Tier 1 (Critical)**: 90%+ coverage, comprehensive edge cases
- **Tier 2 (Core)**: 80%+ coverage, key paths + edges
- **Tier 3 (Presentational)**: 60%+ coverage, happy path + basic validation

## Mocking Standards

### Required Mocks for All Components

```typescript
// Mock useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock utility functions
vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));
```

## Test Query Standards

### Preferred Query Methods (in order)

1. **`getByRole`** - Most accessible, user-focused, **REQUIRED for ARIA testing**
2. **`getByLabelText`** - For form elements
3. **`getByPlaceholderText`** - For inputs
4. **`getByText`** - For text content
5. **`getByDisplayValue`** - For form values
6. **`getByTestId`** - Last resort, use with `data-testid`

### ARIA-Specific Query Patterns

```typescript
// Test ARIA roles
const mainElement = screen.getByRole("main");
const articleElement = screen.getByRole("article");
const buttonElement = screen.getByRole("button", { name: /go back/i });

// Test ARIA relationships
const articleElement = screen.getByRole("article");
expect(articleElement).toHaveAttribute("aria-labelledby", "article-title");
```

## Test Data Attributes

### Standard Test IDs

```typescript
// Component root elements
data-testid="${id}-${componentType}-root"

// Examples:
data-testid="test-id-card-root"
data-testid="test-id-header-root"
data-testid="test-id-footer-root"
```

### Debug Attributes

```typescript
// Debug mode
data-debug-mode="true" // when enabled
// No attribute when disabled

// Component IDs
data-${componentType}-id="${id}-${componentType}"
// Examples:
data-card-id="test-id-card"
data-header-id="test-id-header"
```

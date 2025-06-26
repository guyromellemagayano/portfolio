# @packages/ui

High-quality React UI components following industry best practices with optimized tree-shakeable imports.

## 🚀 **Quick Start**

### **Individual Component Imports (Only Available Pattern)**

```tsx
// ✅ Tree-shakeable individual imports
import { CounterButton } from "@packages/ui/counter-button";
import { Link } from "@packages/ui/link";

// ✅ Memoized versions when needed
import { MemoizedCounterButton } from "@packages/ui/counter-button";

// ✅ Types from same module
import type { CounterButtonProps } from "@packages/ui/counter-button";
```

## 📦 **Import Patterns**

| Import Method | Bundle Size | Tree Shaking | Status |
|---------------|-------------|--------------|---------|
| **Individual** | ~3.1KB (single component) | ✅ Perfect | ✅ Available |
| **Convenience** | N/A | N/A | ❌ Not Available |

### **Only Individual Imports Available**

```tsx
// ✅ Only way to import - optimal bundle size
import { CounterButton } from "@packages/ui/counter-button";
import { Link } from "@packages/ui/link";
```

## 🎯 **Available Exports**

### **Individual Component Exports**

```tsx
// @packages/ui/counter-button
export { CounterButton, MemoizedCounterButton };
export type { CounterButtonProps, CounterButtonRef };

// @packages/ui/link  
export { Link, MemoizedLink };
export type { LinkProps, LinkRef };
```

## Features

- 🎯 **Accessibility First**: WCAG 2.1 AA compliant with comprehensive ARIA support
- 🔒 **Security Built-in**: XSS protection, safe href validation, and secure external links
- ⚡ **Performance Optimized**: React.memo, useCallback, and efficient rendering
- 📦 **Tree-shakeable**: Individual component imports for optimal bundle size
- 🎨 **Customizable**: Multiple variants, sizes, and CSS custom properties
- 🚀 **TypeScript Native**: Comprehensive type definitions with JSDoc
- 🧪 **Thoroughly Tested**: 52 tests covering functionality, accessibility, and edge cases
- 📱 **Responsive**: Mobile-first design with touch-friendly interactions
- 🌗 **Dark Mode**: Automatic theme detection and CSS custom properties

## Components

### CounterButton

Enhanced counter button with min/max constraints, step increments, and accessibility.

```tsx
import { CounterButton } from "@packages/ui/counter-button";

<CounterButton
  label="Vote Count"
  initialValue={0}
  min={0}
  max={100}
  step={1}
  variant="primary"
  size="medium"
  onCountChange={(count) => console.log(count)}
/>
```

### Link

Secure link component with automatic external link detection and analytics.

```tsx
import { Link } from "@packages/ui/link";

<Link
  href="https://example.com"
  variant="primary"
  size="medium"
  trackingId="external-link"
  onLinkClick={(href, event) => console.log(href)}
>
  Visit Example
</Link>
```

## 🏗️ **Advanced Import Patterns**

### **Dynamic Imports for Code Splitting**

```tsx
// ✅ Lazy loading individual components
const CounterButton = lazy(() => 
  import("@packages/ui/counter-button").then(m => ({ default: m.CounterButton }))
);

const Link = lazy(() => 
  import("@packages/ui/link").then(m => ({ default: m.Link }))
);
```

### **Re-exports in Your App**

```tsx
// src/components/ui.ts - Create your own barrel export if needed
export { CounterButton, MemoizedCounterButton } from "@packages/ui/counter-button";
export { Link, MemoizedLink } from "@packages/ui/link";

// Then import from your barrel
import { CounterButton, Link } from "@/components/ui";
```

## 🎯 **Import Guidelines**

### **✅ Production Apps (Only Available Pattern)**

```tsx
import { CounterButton } from "@packages/ui/counter-button";
import { Link } from "@packages/ui/link";
import type { CounterButtonProps } from "@packages/ui/counter-button";
```

### **❌ Not Available**

```tsx
// ❌ This will NOT work - no main export
import { CounterButton, Link } from "@packages/ui";
```

## Security Features

### Automatic XSS Protection

- Validates all href attributes
- Prevents `javascript:` URLs  
- Warns about potentially unsafe links

### External Link Security

- Automatic `rel="noopener noreferrer"` for external links
- Target `_blank` for external domains
- Visual indicators for external links

## Testing

Comprehensive test suite with 52 tests covering:

- **Functionality**: Basic behavior, props, state management
- **Accessibility**: ARIA attributes, keyboard navigation
- **Security**: XSS prevention, safe href validation  
- **Performance**: Memoization, event handling

Run tests:

```bash
pnpm test
pnpm test:coverage
```

## Migration Guide

### From Libraries with Barrel Exports

**If migrating from libraries that use convenience imports:**

```tsx
// ❌ Old pattern (not available here)
import { Button, Link } from "other-ui-library";

// ✅ New pattern (optimal for performance)
import { CounterButton } from "@packages/ui/counter-button";
import { Link } from "@packages/ui/link";
```

### Bundle Size Benefits

- **Individual imports**: 3.1KB (single component)
- **Typical barrel export**: 7.1KB+ (all components)
- **Savings**: **56%+ smaller bundles!**

## Contributing

When adding new components:

1. Create individual component exports only
2. No main index.ts barrel exports
3. Include comprehensive tests
4. Document import patterns
5. Verify tree-shaking works

---

**💡 Design Philosophy**: This library prioritizes performance over convenience by using individual imports exclusively, ensuring optimal bundle sizes and perfect tree-shaking for production applications.

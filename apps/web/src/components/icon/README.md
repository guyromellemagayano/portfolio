<!-- markdownlint-disable line-length -->
# Icon Component

A comprehensive icon component system featuring a main `Icon` component with compound sub-components for social media icons, following our established development standards.

## 📁 File Structure

```bash
icon/
├── Icon.tsx          # Main icon component with compound sub-components
├── Icon.test.tsx     # Comprehensive test suite using Vitest
├── index.ts          # Component exports
└── README.md         # This documentation
```

## 🏗️ Architecture

This component follows the **"Inline types for all components"** pattern and uses a **compound component pattern** for better organization and reusability. For detailed information about these architectural patterns, see the [Component Architecture Patterns](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#️-component-architecture-patterns) section in the Development Optimization Guide.

## 🚀 Features

- **Main Icon Component**: Generic SVG wrapper with shared functionality
- **Compound Sub-Components**: Individual social media icons (`Icon.X`, `Icon.Instagram`, etc.)
- **Ref Forwarding**: Supports `React.forwardRef` for proper ref handling
- **Shared Hook Integration**: Uses `useComponentId` for ID generation and debug logging
- **Accessibility**: Proper `aria-hidden` attributes handled by base components
- **Type Safe**: Full **TypeScript** support with proper type inference
- **Flexible Styling**: Accepts all standard SVG props and className

## 📖 Usage

### Main Icon Component

```typescript
import { Icon } from '@/components/icon'

function MyComponent() {
  return (
    <Icon className="w-6 h-6 text-gray-600">
      <path d="M0 0h24v24H0z" />
    </Icon>
  )
}
```

### Compound Component Usage

```typescript
import { Icon } from '@/components/icon'
import { Div } from '@guyromellemagayano/components'

function MyComponent() {
  return (
    <Div className="flex space-x-4">
      <Icon.X className="w-6 h-6 text-gray-600 hover:text-blue-500" />
      <Icon.Instagram className="w-6 h-6 text-gray-600 hover:text-pink-500" />
      <Icon.LinkedIn className="w-6 h-6 text-gray-600 hover:text-blue-600" />
      <Icon.GitHub className="w-6 h-6 text-gray-600 hover:text-gray-900" />
    </Div>
  )
}
```

### With Links for Social Media

```typescript
import { Icon } from '@/components/icon'
import { Div, Anchor } from '@guyromellemagayano/components'

function MyComponent() {
  return (
    <Div className="flex space-x-4">
      <Anchor href="https://twitter.com/username" aria-label="Follow on X">
        <Icon.X className="w-6 h-6 hover:text-blue-500 transition-colors" />
      </Anchor>
      <Anchor href="https://github.com/username" aria-label="View on GitHub">
        <Icon.GitHub className="w-6 h-6 hover:text-gray-900 transition-colors" />
      </Anchor>
    </Div>
  )
}
```

### Custom Icon with Main Component

```typescript
import { Icon } from '@/components/icon'

function MyComponent() {
  return (
    <Icon 
      className="w-8 h-8 text-green-500" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </Icon>
  )
}
```

## 🔧 Props

### Main Icon Component Props

- `children?: ReactNode` - SVG content (paths, circles, etc.)
- `as?: Component` - Custom component to render (defaults to `Svg`)
- `className?: string` - CSS classes for styling
- `_internalId?: string` - Custom ID override for debugging
- `_debugMode?: boolean` - Enable debug logging
- `...rest` - All standard SVG attributes

### Individual Icon Props

All icon sub-components accept the same props as the main component:

- `className?: string` - CSS classes for styling
- `width?: number | string` - Icon width
- `height?: number | string` - Icon height
- `fill?: string` - Fill color
- `stroke?: string` - Stroke color
- `_internalId?: string` - Custom ID override
- `_debugMode?: boolean` - Enable debug logging
- `...rest` - All standard SVG attributes

## 🎨 Styling

The components use standard SVG elements and can be styled with:

- **Tailwind CSS classes**: `w-6 h-6 text-gray-600 hover:text-blue-500`
- **CSS modules**: Import and apply custom styles
- **Inline styles**: Direct style props
- **CSS custom properties**: Use CSS variables for theming

### Example Styling

```typescript
// Tailwind CSS
<Icon.X className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors" />

// Custom CSS
<Icon.GitHub className="social-icon social-icon--github" />

// Inline styles
<Icon.LinkedIn style={{ width: '24px', height: '24px', fill: '#0077b5' }} />
```

## 🔒 Security & Type Safety

This component follows security best practices by using inline types and hiding internal implementation details. For detailed information about security patterns and type safety, see the [Security & Type Safety](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-security--type-safety) section in the Development Optimization Guide.

## 🧪 Testing with Vitest

This component uses **Vitest** for testing. For detailed information about why Vitest is superior to Jest for this monorepo setup, see the [Development Optimization Guide](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-testing-with-vitest).

### Test Coverage

The test suite provides comprehensive coverage including:

- **Main Icon Component**: Rendering, ref forwarding, props handling
- **Compound Components**: All sub-components (X, Instagram, LinkedIn, GitHub)
- **Accessibility**: Proper ARIA attributes and semantic structure
- **Integration**: Real-world usage patterns with links and containers
- **Error Handling**: Graceful handling of edge cases
- **Styling**: CSS classes and inline styles application

### Test Structure

```typescript
// Example test structure
describe("Icon", () => {
  describe("Main Icon Component", () => {
    it("renders with default props", () => {
      // Test implementation
    });
    
    it("forwards ref correctly", () => {
      // Test implementation
    });
  });

  describe("X Icon Component", () => {
    it("renders X icon correctly", () => {
      // Test implementation
    });
  });
});
```

## 📚 Related Documentation

- [Development Optimization Guide](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md)
- [Component Architecture Patterns](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#️-component-architecture-patterns)
- [Security & Type Safety](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-security--type-safety)
- [Testing with Vitest](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-testing-with-vitest)

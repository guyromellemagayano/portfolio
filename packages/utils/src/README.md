<!-- markdownlint-disable MD013 -->
# @portfolio/utils

A collection of utility functions for React components and general development. This package provides pure utility functions that are RSC-compatible and don't force components to be client-side.

## 📁 File Structure

```bash
packages/utils/
├── package.json              # Package configuration and dependencies
├── src/
│   ├── index.ts              # Main export file
│   ├── react.ts              # React-specific utility functions
│   ├── README.md             # This documentation
│   └── __tests__/
│       └── react.test.ts     # Test suite for React utilities
└── dist/                     # Built distribution files (generated)
```

## 🏗️ Architecture

This package follows a **modular structure** with utility functions organized by domain. All functions are pure and don't use React hooks, making them compatible with React Server Components (RSC).

## 🚀 Features

- **RSC-Compatible**: Pure functions that don't force client-side rendering
- **TypeScript Support**: Full type safety with proper interfaces
- **React Integration**: Utilities designed for React component development
- **Comprehensive Testing**: Full test coverage for all utilities
- **Performance Optimized**: Lightweight, tree-shakeable utilities

## 📖 Usage

### isRenderableContent

Determines if React children are renderable (avoiding boolean/empty-string quirks):

```typescript
import { isRenderableContent } from "@portfolio/utils";

function MyComponent({ children }) {
  const shouldRender = isRenderableContent(children);
  
  if (!shouldRender) return null;
  
  return <div>{children}</div>;
}
```

### hasMeaningfulText

Checks if string content has meaningful text (not just whitespace):

```typescript
import { hasMeaningfulText } from "@portfolio/utils";

function MyComponent({ title, intro }) {
  const hasTitle = hasMeaningfulText(title);
  const hasIntro = hasMeaningfulText(intro);
  
  return (
    <div>
      {hasTitle && <h1>{title}</h1>}
      {hasIntro && <p>{intro}</p>}
    </div>
  );
}
```

### trimStringContent

Safely trims whitespace from string content:

```typescript
import { trimStringContent } from "@portfolio/utils";

function MyComponent({ content }) {
  const trimmed = trimStringContent(content);
  
  if (!trimmed) return null;
  
  return <div>{trimmed}</div>;
}
```

### Combined Usage

```typescript
import { 
  isRenderableContent, 
  hasMeaningfulText, 
  trimStringContent 
} from "@portfolio/utils";

function Layout({ title, intro, children }) {
  const hasContent = Boolean(
    hasMeaningfulText(title) || 
    hasMeaningfulText(intro) || 
    isRenderableContent(children)
  );
  
  if (!hasContent) return null;
  
  return (
    <div>
      {hasMeaningfulText(title) && (
        <h1>{trimStringContent(title)}</h1>
      )}
      {hasMeaningfulText(intro) && (
        <p>{trimStringContent(intro)}</p>
      )}
      {isRenderableContent(children) && (
        <main>{children}</main>
      )}
    </div>
  );
}
```

## 🔧 API Reference

### isRenderableContent(children: React.ReactNode): boolean

Determines if children are renderable by checking for:

- `null`, `undefined`, `false` → returns `false`
- Empty string `""` → returns `false`
- Everything else → returns `true`

### hasMeaningfulText(content: unknown): boolean

Checks if string content has meaningful text:

- Non-string values → returns `false`
- Empty strings → returns `false`
- Whitespace-only strings → returns `false`
- Strings with actual content → returns `true`

### trimStringContent(content: unknown): string

Safely trims whitespace from content:

- String values → trims and returns
- Non-string values → converts to string, trims, and returns
- Handles `null`, `undefined`, and other falsy values

## 🧪 Testing

All utilities have comprehensive test coverage:

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:ui
```

## 🎯 RSC Compatibility

All utilities in this package are **React Server Component compatible**:

- ✅ **Pure functions** - no React hooks
- ✅ **No "use client" required**
- ✅ **Can be used in Server Components**
- ✅ **Tree-shakeable** - only import what you need

## 📦 Installation

This package is part of the monorepo and is automatically available to all apps and packages:

```bash
# In any app or package
import { isRenderableContent } from "@portfolio/utils";
```

## 🔄 Migration from Hooks Package

If you were previously using these utilities from the hooks package, update your imports:

```typescript
// Before
import { isRenderableContent } from "@portfolio/hooks";

// After
import { isRenderableContent } from "@portfolio/utils";
```

This separation ensures proper package boundaries and RSC compatibility.

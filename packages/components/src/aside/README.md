# Aside Component

Semantic aside component for complementary content with analytics support.

## Features

- Performance optimized with React.memo
- Semantic HTML5 with proper `<aside>` element
- Analytics tracking with Google Analytics
- Flexible positioning with left/right variants
- TypeScript support with comprehensive types
- Universal rendering for SSR and client-side

## Installation

```bash
pnpm add @packages/components
```

## Usage

```tsx
import { Aside } from "@packages/components";

// Basic usage
<Aside>
  <h3>Related Articles</h3>
  <ul>
    <li><a href="/article1">Article 1</a></li>
    <li><a href="/article2">Article 2</a></li>
  </ul>
</Aside>

// Positioned aside
<Aside position="right">
  <h3>Advertisement</h3>
  <p>Promotional content here...</p>
</Aside>

// With analytics
<Aside analyticsId="sidebar-widget">
  <h3>Newsletter Signup</h3>
  <form>...</form>
</Aside>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"left" \| "right"` | - | Positioning of the aside content |
| `analyticsId` | `string` | - | Analytics tracking identifier |
| `onAnalytics` | `function` | - | Custom analytics function |
| `as` | `React.ElementType` | `"aside"` | Component to render as |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized component |

## Examples

### Sidebar Navigation

```tsx
<Aside position="left" analyticsId="sidebar-nav">
  <nav>
    <h3>Categories</h3>
    <ul>
      <li><a href="/tech">Technology</a></li>
      <li><a href="/design">Design</a></li>
    </ul>
  </nav>
</Aside>
```

### Advertisement Block

```tsx
<Aside position="right">
  <div className="ad-block">
    <h4>Advertisement</h4>
    <img src="ad.jpg" alt="Product advertisement" />
  </div>
</Aside>
```

### Related Content

```tsx
<Aside analyticsId="related-content">
  <h3>You Might Also Like</h3>
  <div className="related-posts">
    <a href="/post1">Related Post 1</a>
    <a href="/post2">Related Post 2</a>
  </div>
</Aside>
```

## Styling

```css
.aside                /* Base aside styles */
.aside--left         /* Left positioned */
.aside--right        /* Right positioned */
```

## Accessibility

- Semantic `<aside>` element for proper document structure
- ARIA support for complementary content
- Keyboard navigation support
- Screen reader friendly markup

## Testing

```bash
pnpm test
```

## LICENSE

MIT

# Article Component

Semantic article component with analytics tracking and content variants.

## Features

- Semantic HTML5 with proper `<article>` element
- Analytics integration with Google Analytics
- Accessibility with WCAG compliance
- Featured and summary variant styles
- Reading time calculation and display
- Content structure validation
- Performance optimized with code splitting
- TypeScript support with full type safety

## Installation

```bash
pnpm add @packages/components
```

## Usage

```tsx
import { Article } from "@packages/components";

// Basic usage
<Article>
  <h1>Article Title</h1>
  <p>Article content goes here...</p>
</Article>

// Featured article
<Article featured>
  <h1>Featured Article</h1>
  <p>This article will be highlighted with special styling.</p>
</Article>

// Summary article
<Article summary>
  <h2>Article Summary</h2>
  <p>Brief overview of the main article.</p>
</Article>

// With analytics
<Article analyticsId="main-article-123">
  <h1>Tracked Article</h1>
  <p>Article content with analytics tracking.</p>
</Article>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `featured` | `boolean` | `false` | Apply featured article styling |
| `summary` | `boolean` | `false` | Apply summary article styling |
| `analyticsId` | `string` | - | Analytics tracking identifier |
| `onAnalytics` | `function` | - | Custom analytics function |
| `as` | `ElementType` | `"article"` | HTML element to render as |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized component |

## Examples

### Blog Post

```tsx
<Article featured analyticsId="blog-post-123">
  <header>
    <h1>How to Build Better Web Components</h1>
    <p>Published on March 15, 2024</p>
  </header>
  <section>
    <p>Content goes here...</p>
  </section>
</Article>
```

### News Summary

```tsx
<Article summary>
  <h2>Breaking News Summary</h2>
  <p>Quick overview of today's top stories...</p>
  <a href="/full-story">Read full article →</a>
</Article>
```

### Interactive Article

```tsx
<Article isClient analyticsId="interactive-article">
  <h1>Interactive Content</h1>
  <div>Client-side interactive components</div>
</Article>
```

## Styling

```css
.article                      /* Base article styles */
.article--featured           /* Featured article variant */
.article--summary            /* Summary article variant */
.article--invalid-structure  /* Invalid content warning */
```

## Accessibility

- Semantic `<article>` element with role
- ARIA labeling for featured content
- Keyboard navigation support
- Screen reader support with proper structure
- Reading time announcements

## Testing

```bash
pnpm test
```

## LICENSE

MIT

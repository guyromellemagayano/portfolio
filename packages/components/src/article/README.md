# Article Component

A universal, semantic article component with enhanced features for content structure, analytics tracking, and accessibility.

## Features

- 🎯 **Semantic HTML5** - Proper `article` element with ARIA roles
- 📊 **Analytics Integration** - Built-in Google Analytics and custom tracking
- ♿ **Accessibility First** - WCAG compliant with keyboard navigation
- 🎨 **Variant Support** - Featured and summary article styles
- 📖 **Reading Time** - Automatic reading time calculation and display
- 🔍 **Content Validation** - Semantic structure validation
- 📱 **Responsive Design** - Mobile-first with adaptive layouts
- 🌙 **Dark Mode** - Automatic dark mode support
- ⚡ **Performance** - Code splitting with client-side rendering options
- 🎭 **Type Safe** - Full TypeScript support

## Basic Usage

```tsx
import { Article } from "@portal/components";

// Basic article
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
```

## Advanced Usage

### Analytics Tracking

```tsx
// Google Analytics tracking
<Article analyticsId="main-article-123">
  Article content with automatic GA tracking
</Article>

// Custom analytics function
<Article
  onAnalytics={(data) => {
    console.log('Article clicked:', data);
    // Send to your analytics service
    myAnalytics.track('article_click', data);
  }}
>
  Article with custom analytics
</Article>
```

### Client-Side Rendering

```tsx
// Enable client-side rendering for interactivity
<Article isClient>
  Interactive article content
</Article>

// Memoized client rendering for performance
<Article isClient isMemoized>
  Optimized interactive content
</Article>
```

### Custom Elements

```tsx
// Use as different semantic element
<Article as="section">
  Content rendered as section element
</Article>

// With custom styling
<Article 
  className="my-custom-article"
  style={{ maxWidth: '800px' }}
>
  Custom styled article
</Article>
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `featured` | `boolean` | `false` | Highlights the article with special styling |
| `summary` | `boolean` | `false` | Styles the article as a summary/excerpt |
| `analyticsId` | `string` | - | Unique identifier for Google Analytics tracking |
| `onAnalytics` | `function` | - | Custom analytics callback function |
| `as` | `ElementType` | `"article"` | HTML element to render as |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized client component |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Article content |
| `...rest` | `HTMLAttributes` | - | All standard HTML article attributes |

### Analytics Data Structure

When `onAnalytics` is triggered, it receives:

```typescript
{
  event: "click",           // Event type
  category: "article",      // Event category
  label: string,           // Analytics ID or default label
  content: string          // Extracted article content (first 100 chars)
}
```

## Content Features

### Reading Time Calculation

The component automatically calculates and displays reading time:

```tsx
<Article>
  {/* Long article content */}
  {"word ".repeat(500)} {/* ~2-3 minute read */}
</Article>
// Displays: "📖 3 min read" on hover
```

### Structure Validation

Articles are validated for proper semantic structure:

```tsx
// Valid structure
<Article>
  <h1>Title</h1>
  <p>Content</p>
</Article>

// Invalid structure (empty)
<Article>
  {/* No content */}
</Article>
// Shows warning styles and validation message
```

## Styling & Customization

### CSS Classes

- `.article` - Base article styles
- `.article--featured` - Featured article variant
- `.article--summary` - Summary article variant  
- `.article--invalid-structure` - Warning styles for invalid content

### CSS Custom Properties

The component respects system preferences:

- Dark mode (`prefers-color-scheme: dark`)
- High contrast (`prefers-contrast: high`)
- Reduced motion (`prefers-reduced-motion: reduce`)

### Responsive Breakpoints

- Mobile: `< 768px` - Simplified layouts
- Desktop: `≥ 768px` - Full feature display

## Accessibility

### ARIA Support

```tsx
// Automatic ARIA labeling
<Article featured>
  Content
</Article>
// Results in: aria-label="Featured article"

// Custom ARIA labels
<Article aria-label="Custom article description">
  Content
</Article>
```

### Keyboard Navigation

- **Tab**: Focus the article
- **Enter/Space**: Trigger click events (if interactive)
- **Escape**: Remove focus

### Screen Reader Support

- Semantic `article` element with explicit `role="article"`
- Descriptive labels for featured content
- Reading time announcements
- Structure validation warnings

## Performance

### Code Splitting

```tsx
// Server-side rendering (default)
<Article>Fast server-rendered content</Article>

// Client-side rendering (when needed)
<Article isClient>Interactive content</Article>

// Memoized for frequent updates
<Article isClient isMemoized>Optimized content</Article>
```

### Bundle Size

- **Server component**: ~2KB gzipped
- **Client component**: ~3KB gzipped (lazy loaded)
- **CSS styles**: ~1KB gzipped

## Utility Functions

Access utility functions for advanced use cases:

```tsx
import { ArticleUtils } from "@portal/components";

// Validate content structure
const isValid = ArticleUtils.validateStructure(content);

// Extract text content
const text = ArticleUtils.extractContent(reactElement);

// Calculate reading time
const minutes = ArticleUtils.calculateReadingTime(content, 250); // 250 WPM
```

## Examples

### Blog Post Article

```tsx
<Article 
  featured
  analyticsId="blog-post-123"
  className="blog-article"
>
  <header>
    <h1>How to Build Better Web Components</h1>
    <p className="meta">Published on March 15, 2024</p>
  </header>
  
  <section>
    <p>Content goes here...</p>
  </section>
  
  <footer>
    <p>Tags: React, Components, TypeScript</p>
  </footer>
</Article>
```

### News Summary

```tsx
<Article 
  summary
  onAnalytics={(data) => newsAnalytics.track(data)}
>
  <h2>Breaking News Summary</h2>
  <p>Quick overview of today's top stories...</p>
  <a href="/full-story">Read full article →</a>
</Article>
```

### Interactive Article

```tsx
<Article 
  isClient
  isMemoized
  analyticsId="interactive-article"
  onMouseEnter={() => trackHover()}
  onFocus={() => trackFocus()}
>
  <h1>Interactive Content</h1>
  <div className="interactive-elements">
    {/* Client-side interactive components */}
  </div>
</Article>
```

## Best Practices

1. **Use semantic structure** - Include proper headings and content hierarchy
2. **Provide analytics IDs** - For tracking important articles
3. **Consider reading time** - Optimize content length for your audience
4. **Test accessibility** - Use screen readers and keyboard navigation
5. **Validate content** - Ensure articles have meaningful content
6. **Use featured sparingly** - Only for truly important content
7. **Client-side when needed** - Prefer server rendering for performance

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Android Chrome 90+

## Related Components

- `Section` - For general content sections
- `Header` - For article headers
- `Footer` - For article footers
- `Navigation` - For article navigation

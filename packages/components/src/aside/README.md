# Aside Component

A universal sidebar component with positioning, collapsible functionality, content types, and enhanced accessibility features.

## Features

- 🎯 **Semantic HTML5** - Proper `aside` element with ARIA roles
- 📍 **Position Variants** - Left, right, floating, and sticky positioning
- 📱 **Collapsible** - Expandable/collapsible with toggle controls
- 🎭 **Content Types** - Navigation, complementary, banner, search, and form variants
- 📊 **Analytics Integration** - Built-in Google Analytics and custom tracking
- ♿ **Accessibility First** - WCAG compliant with keyboard navigation
- 🎨 **Highlighted State** - Special highlighting for important content
- 📱 **Responsive Design** - Mobile-first with adaptive layouts
- 🌙 **Dark Mode** - Automatic dark mode support
- ⚡ **Performance** - Code splitting with client-side rendering options
- 🎭 **Type Safe** - Full TypeScript support

## Basic Usage

```tsx
import { Aside } from "@guyromellemagayano/components/aside";

// Basic aside
<Aside>
  <h3>Sidebar Content</h3>
  <p>This is complementary content to the main article.</p>
</Aside>

// Left positioned aside
<Aside position="left">
  <nav>
    <h3>Navigation</h3>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</Aside>

// Collapsible aside
<Aside collapsible showToggle>
  <h3>Collapsible Sidebar</h3>
  <p>This sidebar can be collapsed to save space.</p>
</Aside>
```

## Advanced Usage

### Position Variants

```tsx
// Left sidebar (default)
<Aside position="left">
  Left sidebar content
</Aside>

// Right sidebar
<Aside position="right">
  Right sidebar content
</Aside>

// Floating sidebar
<Aside position="floating">
  Floating overlay sidebar
</Aside>

// Sticky sidebar
<Aside position="sticky">
  Sticky sidebar that follows scroll
</Aside>
```

### Content Types

```tsx
// Navigation sidebar
<Aside contentType="navigation">
  <nav>Site navigation</nav>
</Aside>

// Complementary content (default)
<Aside contentType="complementary">
  Related articles and information
</Aside>

// Search sidebar
<Aside contentType="search">
  <form>Search functionality</form>
</Aside>

// Banner sidebar
<Aside contentType="banner">
  <div>Important announcements</div>
</Aside>

// Form sidebar
<Aside contentType="form">
  <form>Contact form or filters</form>
</Aside>
```

### Collapsible Functionality

```tsx
// Basic collapsible
<Aside collapsible defaultCollapsed>
  Content that starts collapsed
</Aside>

// With toggle button
<Aside collapsible showToggle>
  Content with visible toggle button
</Aside>

// Controlled state
<Aside 
  collapsible 
  collapsed={isCollapsed}
  onCollapseChange={setIsCollapsed}
>
  Controlled collapsible content
</Aside>

// Custom toggle content
<Aside 
  collapsible 
  showToggle
  toggleContent={{
    collapsed: <span>▶ Open</span>,
    expanded: <span>◀ Close</span>
  }}
>
  Custom toggle labels
</Aside>
```

### Analytics Integration

```tsx
// Google Analytics tracking
<Aside analyticsId="main-sidebar-123">
  Sidebar with automatic GA tracking
</Aside>

// Custom analytics function
<Aside
  onAnalytics={(data) => {
    console.log('Sidebar interaction:', data);
    myAnalytics.track('sidebar_interact', data);
  }}
>
  Sidebar with custom analytics
</Aside>

// Toggle-specific analytics
<Aside 
  collapsible 
  showToggle
  analyticsId="collapsible-nav"
  onAnalytics={(data) => {
    if (data.event === 'toggle') {
      console.log(`Sidebar ${data.action}ed`);
    }
  }}
>
  Analytics for toggle actions
</Aside>
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"left" \| "right" \| "floating" \| "sticky"` | `"left"` | Position relative to main content |
| `contentType` | `"navigation" \| "complementary" \| "banner" \| "search" \| "form"` | `"complementary"` | Semantic content type |
| `collapsible` | `boolean` | `false` | Whether the aside can be collapsed |
| `defaultCollapsed` | `boolean` | `false` | Initial collapsed state |
| `collapsed` | `boolean` | - | Controlled collapsed state |
| `onCollapseChange` | `(collapsed: boolean) => void` | - | Callback when collapse state changes |
| `showToggle` | `boolean` | `false` | Whether to show toggle button |
| `toggleContent` | `{ collapsed: ReactNode; expanded: ReactNode }` | - | Custom toggle button content |
| `analyticsId` | `string` | - | Unique identifier for analytics |
| `onAnalytics` | `function` | - | Custom analytics callback |
| `highlighted` | `boolean` | `false` | Whether to highlight the aside |
| `as` | `ElementType` | `"aside"` | HTML element to render as |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized client component |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Aside content |
| `...rest` | `HTMLAttributes` | - | All standard HTML aside attributes |

### Analytics Data Structure

When `onAnalytics` is triggered, it receives:

```typescript
{
  event: "click" | "toggle",     // Event type
  category: "aside",             // Event category
  label: string,                 // Analytics ID or default label
  action: "interact" | "collapse" | "expand"  // Specific action
}
```

## Layout & Positioning

### Position Types

- **Left**: Traditional left sidebar with right border accent
- **Right**: Right-aligned sidebar with left border accent  
- **Floating**: Fixed overlay positioned on screen
- **Sticky**: Follows scroll position, stays in viewport

### Responsive Behavior

```tsx
// Mobile-optimized floating aside
<Aside position="floating">
  {/* Automatically repositions on mobile */}
  Mobile-friendly content
</Aside>

// Adaptive positioning
<Aside position="left" className="hidden md:block">
  {/* Hidden on mobile, shown on larger screens */}
  Desktop sidebar
</Aside>
```

## Content Types & Semantics

### Navigation Asides

```tsx
<Aside contentType="navigation" position="left">
  <nav aria-label="Main navigation">
    <h2>Site Navigation</h2>
    <ul>
      <li><a href="/products">Products</a></li>
      <li><a href="/services">Services</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</Aside>
```

### Complementary Content

```tsx
<Aside contentType="complementary" position="right">
  <h2>Related Articles</h2>
  <ul>
    <li><a href="/article-1">How to Build Components</a></li>
    <li><a href="/article-2">React Best Practices</a></li>
  </ul>
</Aside>
```

### Search Functionality

```tsx
<Aside contentType="search" position="floating">
  <h2>Search & Filters</h2>
  <form>
    <input type="search" placeholder="Search products..." />
    <fieldset>
      <legend>Filters</legend>
      <label><input type="checkbox" /> In Stock</label>
      <label><input type="checkbox" /> On Sale</label>
    </fieldset>
  </form>
</Aside>
```

## Styling & Customization

### CSS Classes

- `.aside` - Base aside styles
- `.aside--left` - Left positioned variant
- `.aside--right` - Right positioned variant  
- `.aside--floating` - Floating positioned variant
- `.aside--sticky` - Sticky positioned variant
- `.aside--navigation` - Navigation content type
- `.aside--complementary` - Complementary content type
- `.aside--banner` - Banner content type
- `.aside--search` - Search content type
- `.aside--form` - Form content type
- `.aside--collapsible` - Collapsible functionality
- `.aside--collapsed` - Collapsed state
- `.aside--highlighted` - Highlighted state
- `.aside--invalid-structure` - Invalid content warning

### Custom Styling

```tsx
// Custom styled aside
<Aside 
  className="my-custom-aside"
  style={{ 
    maxWidth: '350px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }}
>
  Custom styled content
</Aside>
```

### Layout Integration

```tsx
// Full layout example
<div className="layout">
  <header>Site Header</header>
  
  <div className="content-wrapper">
    <Aside position="left" contentType="navigation">
      <nav>Navigation content</nav>
    </Aside>
    
    <main>
      <article>Main content</article>
    </main>
    
    <Aside position="right" contentType="complementary">
      <section>Related content</section>
    </Aside>
  </div>
  
  <footer>Site Footer</footer>
</div>
```

## Accessibility

### ARIA Support

```tsx
// Automatic ARIA labeling
<Aside contentType="navigation">
  {/* Results in: aria-label="Navigation sidebar" */}
  Navigation content
</Aside>

// Custom ARIA labels
<Aside aria-label="Product filters and search">
  Search and filter content
</Aside>

// Collapsible ARIA states
<Aside collapsible>
  {/* Automatically includes aria-expanded */}
  Collapsible content
</Aside>
```

### Keyboard Navigation

- **Tab**: Focus the aside and its interactive elements
- **Enter/Space**: Activate toggle button (when collapsible)
- **Escape**: Close floating asides (when implemented)

### Screen Reader Support

- Semantic `aside` element with explicit `role="complementary"`
- Descriptive labels based on content type and position
- Toggle button with clear collapse/expand labels
- Content structure validation warnings

## Performance

### Code Splitting

```tsx
// Server-side rendering (default)
<Aside>Fast server-rendered sidebar</Aside>

// Client-side rendering (when needed)
<Aside isClient>Interactive sidebar</Aside>

// Memoized for frequent updates
<Aside isClient isMemoized>Optimized sidebar</Aside>
```

### Bundle Size

- **Server component**: ~3KB gzipped
- **Client component**: ~4KB gzipped (lazy loaded)
- **CSS styles**: ~2KB gzipped

## Examples

### E-commerce Product Page

```tsx
<div className="product-layout">
  {/* Filters sidebar */}
  <Aside 
    position="left" 
    contentType="search"
    collapsible
    showToggle
    analyticsId="product-filters"
  >
    <h2>Filters</h2>
    <form>
      <fieldset>
        <legend>Price Range</legend>
        <input type="range" min="0" max="1000" />
      </fieldset>
      <fieldset>
        <legend>Categories</legend>
        <label><input type="checkbox" /> Electronics</label>
        <label><input type="checkbox" /> Clothing</label>
      </fieldset>
    </form>
  </Aside>

  {/* Main product content */}
  <main>
    <article>Product details</article>
  </main>

  {/* Related products */}
  <Aside 
    position="right" 
    contentType="complementary"
    highlighted
  >
    <h2>Related Products</h2>
    <div className="product-grid">
      {/* Related product cards */}
    </div>
  </Aside>
</div>
```

### Blog with Navigation

```tsx
<div className="blog-layout">
  {/* Navigation sidebar */}
  <Aside 
    position="left" 
    contentType="navigation"
    className="blog-nav"
  >
    <nav aria-label="Blog navigation">
      <h2>Categories</h2>
      <ul>
        <li><a href="/tech">Technology</a></li>
        <li><a href="/design">Design</a></li>
        <li><a href="/business">Business</a></li>
      </ul>
      
      <h2>Recent Posts</h2>
      <ul>
        <li><a href="/post-1">Getting Started with React</a></li>
        <li><a href="/post-2">CSS Grid vs Flexbox</a></li>
      </ul>
    </nav>
  </Aside>

  {/* Blog content */}
  <main>
    <article>Blog post content</article>
  </main>
</div>
```

### Floating Help Widget

```tsx
<Aside 
  position="floating"
  contentType="form"
  collapsible
  defaultCollapsed
  showToggle
  toggleContent={{
    collapsed: "💬 Help",
    expanded: "✕ Close"
  }}
  analyticsId="help-widget"
>
  <h3>Need Help?</h3>
  <form>
    <div>
      <label htmlFor="help-topic">What can we help with?</label>
      <select id="help-topic">
        <option>General Question</option>
        <option>Technical Support</option>
        <option>Billing</option>
      </select>
    </div>
    <div>
      <label htmlFor="help-message">Message</label>
      <textarea id="help-message" rows={4}></textarea>
    </div>
    <button type="submit">Send Message</button>
  </form>
</Aside>
```

## Best Practices

1. **Choose appropriate content types** - Use semantic content types for better accessibility
2. **Consider position impact** - Floating asides should be used sparingly
3. **Make collapsible content obvious** - Always provide clear toggle indicators
4. **Optimize for mobile** - Consider how asides behave on small screens
5. **Provide analytics for interactions** - Track sidebar usage for UX insights
6. **Test with screen readers** - Ensure all content is accessible
7. **Use highlighted state sparingly** - Only for truly important content
8. **Consider content hierarchy** - Aside content should complement, not compete

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Android Chrome 90+

## Related Components

- `Article` - For main content areas
- `Section` - For content sections
- `Navigation` - For navigation components
- `Header` - For page headers
- `Footer` - For page footers

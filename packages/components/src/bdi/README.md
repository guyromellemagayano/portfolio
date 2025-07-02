# BDI Component

Accessible bidirectional isolate component for text direction control with analytics tracking and enhanced styling.

## Features

- Performance optimized with React.memo and hooks
- Proper HTML `<bdi>` element for bidirectional text isolation
- Analytics tracking with Google Analytics
- Enhanced styling with emphasized variant
- TypeScript support with comprehensive types
- Universal rendering for SSR and client-side
- Polymorphic rendering support
- Accessibility with focus management
- RTL and LTR text direction support

## Installation

```bash
pnpm add @packages/components
```

## Usage

```tsx
import { Bdi } from "@packages/components";

// Basic usage - isolate user-generated content
<Bdi>محمد</Bdi>

// Explicit direction control
<Bdi dir="rtl">مرحبا بك</Bdi>

// Auto-detection of text direction
<Bdi dir="auto">Hello العالم</Bdi>

// With analytics
<Bdi analyticsId="user-name" dir="auto">John Smith العربي</Bdi>

// Polymorphic usage
<Bdi as="span" dir="rtl">نص باللغة العربية</Bdi>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dir` | `"ltr" \| "rtl" \| "auto"` | - | Text direction for the isolated content |
| `emphasized` | `boolean` | `false` | Apply emphasized styling |
| `analyticsId` | `string` | - | Analytics tracking identifier |
| `onAnalytics` | `function` | - | Custom analytics function |
| `as` | `string \| Component` | `"bdi"` | Element or component to render as |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized component |

## Examples

### User-Generated Content

```tsx
{/* Isolate usernames that might be in different languages */}
<p>
  Welcome, <Bdi>{username}</Bdi>! You have {messageCount} new messages.
</p>
```

### Mixed Language Content

```tsx
{/* Display mixed Arabic and English text properly */}
<p>
  The user <Bdi dir="auto">أحمد Smith</Bdi> posted a new comment.
</p>
```

### Chat Messages

```tsx
{/* Ensure proper text direction in chat applications */}
<div className="message">
  <Bdi dir="auto">{message.content}</Bdi>
  <span className="timestamp">{message.time}</span>
</div>
```

### Emphasized Content

```tsx
<Bdi emphasized dir="rtl">
  محتوى مهم باللغة العربية
</Bdi>
```

### With Custom Analytics

```tsx
<Bdi
  dir="auto"
  onAnalytics={(data) => {
    console.log('BDI content clicked:', data);
    // Track multilingual content interactions
  }}
>
  {multilingualContent}
</Bdi>
```

## When to Use

The BDI element should be used when:

- Displaying user-generated content that might contain text in different directions
- Showing usernames, comments, or messages in multilingual applications
- Isolating text snippets to prevent them from affecting surrounding text direction
- Working with mixed RTL/LTR content

## Text Direction Support

### Automatic Detection (`dir="auto"`)

The browser automatically determines text direction based on the first strong directional character.

### Explicit Direction

- `dir="ltr"` - Forces left-to-right text direction
- `dir="rtl"` - Forces right-to-left text direction

### Without Direction

If no `dir` attribute is specified, the text follows the parent element's direction.

## Styling

```css
.bdi                    /* Base bidirectional isolate styles */
.bdi--emphasized       /* Emphasized variant */
.bdi[dir="ltr"]        /* Left-to-right specific styles */
.bdi[dir="rtl"]        /* Right-to-left specific styles */
.bdi[dir="auto"]       /* Auto-direction styles */
```

## Accessibility

- Maintains semantic meaning of `<bdi>` element
- Proper text direction isolation for screen readers
- Keyboard navigation support
- Focus indicators for interactive elements
- High contrast mode compatibility
- Proper ARIA attributes for multilingual content

## Browser Support

The `<bdi>` element is supported in all modern browsers. For older browsers, it gracefully degrades to a regular inline element.

## Testing

```bash
pnpm test
```

## LICENSE

MIT

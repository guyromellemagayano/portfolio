# @portfolio/utils

A collection of utility functions for common operations across the monorepo.

## Table of Contents

- [Navigation Validation Utilities](#navigation-validation-utilities)
- [React Component Utilities](#react-component-utilities)
- [Content Validation Utilities](#content-validation-utilities)
- [Link Utilities](#link-utilities)
- [Styling Utilities](#styling-utilities)

## Navigation Validation Utilities

### `hasValidNavigationLinks(links)`

Validates if navigation links data is valid and usable.

```typescript
import { hasValidNavigationLinks } from "@portfolio/utils";

const isValid = hasValidNavigationLinks(navLinks);
if (isValid) {
  // Render navigation
}
```

**Parameters:**

- `links` - The navigation links data to validate (array, null, or undefined)

**Returns:** `true` if the links data is valid and contains items, `false` otherwise

### `isValidNavigationLink(link)`

Validates if a single navigation link item is valid.

```typescript
import { isValidNavigationLink } from "@portfolio/utils";

const isValid = isValidNavigationLink({ label: "About", href: "/about" });
// Returns: true

const isValid = isValidNavigationLink({ label: "", href: "/about" });
// Returns: false
```

**Parameters:**

- `link` - The navigation link item to validate

**Returns:** `true` if the link has both label and href, `false` otherwise

### `filterValidNavigationLinks(links)`

Filters navigation links to only include valid items.

```typescript
import { filterValidNavigationLinks } from "@portfolio/utils";

const validLinks = filterValidNavigationLinks([
  { label: "About", href: "/about" },
  { label: "", href: "/invalid" },
  { label: "Contact", href: "/contact" }
]);
// Returns: [{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }]
```

**Parameters:**

- `links` - The navigation links array to filter

**Returns:** A new array containing only valid navigation links

## React Component Utilities

### `setDisplayName(component, displayName?)`

Sets `displayName` for React components with improved type safety.

```typescript
import { setDisplayName } from "@portfolio/utils";

const MyComponent = setDisplayName(function MyComponent() {
  return <div>Hello</div>;
}, "MyComponent");
```

**Parameters:**

- `component` - The React component to set display name for
- `displayName` - Optional custom display name (defaults to component name)

**Returns:** The component with displayName set

### `ComponentProps` Interface

Common props interface used across components.

```typescript
import { ComponentProps } from "@portfolio/utils";

interface MyComponentProps extends ComponentProps {
  // Component-specific props
  title?: string;
}
```

**Properties:**

- `debugMode?: boolean` - Enable debug mode
- `internalId?: string` - Custom component ID for tracking
- `isClient?: boolean` - Opt-in client-side rendering
- `isMemoized?: boolean` - Opt-in memoization wrapper (for profiling)

## Content Validation Utilities

### `isRenderableContent(children)`

Checks if children are renderable in React components.

```typescript
import { isRenderableContent } from "@portfolio/utils";

const shouldRender = isRenderableContent("Hello"); // true
const shouldRender = isRenderableContent(""); // true
const shouldRender = isRenderableContent(null); // true
const shouldRender = isRenderableContent(false); // false
```

**Parameters:**

- `children` - The content to validate

**Returns:** `true` if content should be rendered, `false` otherwise

### `hasAnyRenderableContent(...values)`

Checks if any of the provided values are renderable content.

```typescript
import { hasAnyRenderableContent } from "@portfolio/utils";

const hasContent = hasAnyRenderableContent("Hello", "", null); // true
const hasContent = hasAnyRenderableContent("", null, false); // false
```

**Parameters:**

- `...values` - Multiple values to check

**Returns:** `true` if any value is renderable, `false` otherwise

### `trimStringContent(content)`

Safely trims whitespace from string content.

```typescript
import { trimStringContent } from "@portfolio/utils";

const trimmed = trimStringContent("  Hello World  "); // "Hello World"
const trimmed = trimStringContent(123); // "123"
const trimmed = trimStringContent(null); // ""
```

**Parameters:**

- `content` - The content to trim

**Returns:** Trimmed string content

### `hasMeaningfulText(content)`

Checks if string content has meaningful text (non-empty after trimming).

```typescript
import { hasMeaningfulText } from "@portfolio/utils";

const hasText = hasMeaningfulText("Hello"); // true
const hasText = hasMeaningfulText("  "); // false
const hasText = hasMeaningfulText(""); // false
const hasText = hasMeaningfulText(123); // false
```

**Parameters:**

- `content` - The content to check

**Returns:** `true` if content has meaningful text, `false` otherwise

### `shouldRenderComponent(children, componentType?)`

Checks if content should render based on component type and UX considerations.

```typescript
import { shouldRenderComponent } from "@portfolio/utils";

// Interactive components (buttons, links) - strict validation
const shouldRender = shouldRenderComponent("Click me", "interactive"); // true
const shouldRender = shouldRenderComponent("", "interactive"); // false

// Decorative components - very strict validation
const shouldRender = shouldRenderComponent("Icon", "decorative"); // true
const shouldRender = shouldRenderComponent("  ", "decorative"); // false

// Structural components (div, section) - allow empty
const shouldRender = shouldRenderComponent("", "structural"); // true

// Semantic components (p, span) - allow empty strings
const shouldRender = shouldRenderComponent("", "semantic"); // true
```

**Parameters:**

- `children` - The content to validate
- `componentType` - Type of component ("semantic" | "structural" | "interactive" | "decorative")

**Returns:** `true` if component should render, `false` otherwise

## Link Utilities

### `isValidLink(href)`

Validates if a URL is valid and not a placeholder.

```typescript
import { isValidLink } from "@portfolio/utils";

const isValid = isValidLink("/about"); // true
const isValid = isValidLink("https://example.com"); // true
const isValid = isValidLink("#"); // false
const isValid = isValidLink(""); // false
const isValid = isValidLink(null); // false
```

**Parameters:**

- `href` - The URL to validate (string or object with toString method)

**Returns:** `true` if link is valid, `false` otherwise

### `getLinkTargetProps(href, target?)`

Gets safe link target attributes for external links.

```typescript
import { getLinkTargetProps } from "@portfolio/utils";

const props = getLinkTargetProps("https://example.com");
// Returns: { target: "_blank", rel: "noopener noreferrer" }

const props = getLinkTargetProps("/about");
// Returns: { target: "_self" }

const props = getLinkTargetProps("https://example.com", "_self");
// Returns: { target: "_self" }
```

**Parameters:**

- `href` - The URL to get target props for
- `target` - Optional target attribute override

**Returns:** Object with `target` and optional `rel` attributes

### `getDefaultLinkProps(props)`

Validates and provides default values for common link props.

```typescript
import { getDefaultLinkProps } from "@portfolio/utils";

const props = getDefaultLinkProps({
  href: "/about",
  target: "_blank",
  title: "About Us"
});
// Returns: { href: "/about", target: "_blank", title: "About Us" }

const props = getDefaultLinkProps({});
// Returns: { href: "#", target: "_self", title: "" }
```

**Parameters:**

- `props` - Object containing href, target, and title

**Returns:** Object with validated and defaulted link properties

## Styling Utilities

### `createConditionalClasses(baseClass, conditionalClasses, additionalClass?)`

Creates conditional CSS class names with proper fallbacks.

```typescript
import { createConditionalClasses } from "@portfolio/utils";

const classes = createConditionalClasses(
  "button",
  {
    "button--primary": isPrimary,
    "button--large": isLarge,
    "button--disabled": isDisabled
  },
  "custom-class"
);
// Returns: "button button--primary button--large custom-class" (if isPrimary and isLarge are true)
```

**Parameters:**

- `baseClass` - The base CSS class name
- `conditionalClasses` - Object mapping class names to boolean conditions
- `additionalClass` - Optional additional class name

**Returns:** Space-separated string of CSS class names

### `formatDateSafely(date, options?)`

Safely formats a date string with fallback handling.

```typescript
import { formatDateSafely } from "@portfolio/utils";

const formatted = formatDateSafely("2023-12-25");
// Returns: "December 25, 2023"

const formatted = formatDateSafely(new Date(), { 
  year: "numeric", 
  month: "short" 
});
// Returns: "Dec 2023"

const formatted = formatDateSafely(null);
// Returns: ""

const formatted = formatDateSafely("invalid-date");
// Returns: ""
```

**Parameters:**

- `date` - The date to format (string, Date, null, or undefined)
- `options` - Optional Intl.DateTimeFormatOptions

**Returns:** Formatted date string or empty string if invalid

## Usage Examples

### React Component Example

```typescript
import { 
  hasValidNavigationLinks, 
  filterValidNavigationLinks,
  shouldRenderComponent,
  isValidLink 
} from "@portfolio/utils";

function Navigation({ links }) {
  const validLinks = filterValidNavigationLinks(links);
  
  if (!hasValidNavigationLinks(validLinks)) {
    return null; // Don't render navigation if no valid links
  }
  
  return (
    <nav>
      {validLinks.map(({ label, href }) => (
        <a key={href} href={href}>{label}</a>
      ))}
    </nav>
  );
}

function Button({ children, href, ...props }) {
  if (!shouldRenderComponent(children, "interactive")) {
    return null; // Don't render button without meaningful content
  }
  
  if (href && !isValidLink(href)) {
    return null; // Don't render button with invalid link
  }
  
  return <button {...props}>{children}</button>;
}
```

### API Response Validation

```typescript
import { hasValidNavigationLinks } from "@portfolio/utils";

async function fetchNavigation() {
  const response = await fetch('/api/navigation');
  const data = await response.json();
  
  if (hasValidNavigationLinks(data.links)) {
    return data.links;
  }
  
  return []; // Return empty array if no valid links
}
```

### CMS Data Processing

```typescript
import { filterValidNavigationLinks } from "@portfolio/utils";

function processCMSNavigation(cmsData) {
  // CMS might return mixed valid/invalid data
  const rawLinks = cmsData.navigation || [];
  const validLinks = filterValidNavigationLinks(rawLinks);
  
  return {
    ...cmsData,
    navigation: validLinks
  };
}
```

### Link Processing

```typescript
import { getLinkTargetProps, getDefaultLinkProps } from "@portfolio/utils";

function processExternalLinks(links) {
  return links.map(link => {
    const targetProps = getLinkTargetProps(link.href);
    const defaultProps = getDefaultLinkProps({
      href: link.href,
      title: link.title
    });
    
    return {
      ...link,
      ...defaultProps,
      ...targetProps
    };
  });
}
```

### Content Validation

```typescript
import { 
  hasMeaningfulText, 
  trimStringContent, 
  shouldRenderComponent 
} from "@portfolio/utils";

function validateContent(content, componentType = "semantic") {
  const trimmed = trimStringContent(content);
  const hasText = hasMeaningfulText(trimmed);
  const shouldRender = shouldRenderComponent(content, componentType);
  
  return {
    trimmed,
    hasText,
    shouldRender,
    isValid: shouldRender
  };
}
```

## TypeScript Support

All utilities are fully typed with TypeScript:

```typescript
interface NavigationLink {
  label: string;
  href: string;
  kind?: "internal" | "external";
}

// Type-safe validation
const links: NavigationLink[] = getLinks();
const validLinks = filterValidNavigationLinks(links); // Returns NavigationLink[]

// Component props with proper typing
interface MyComponentProps extends ComponentProps {
  title?: string;
  children: React.ReactNode;
}

// Link utilities with type safety
const targetProps = getLinkTargetProps("/about"); // Properly typed return
```

## Error Handling

These utilities are designed to handle edge cases gracefully:

- **Null/undefined inputs** - Returns appropriate default values
- **Empty arrays** - Handled as invalid data
- **Mixed valid/invalid data** - Filters out invalid items
- **Type mismatches** - Validates data types before processing
- **Invalid dates** - Returns empty string for unparseable dates
- **Invalid URLs** - Handles malformed or placeholder URLs

This makes them perfect for handling dynamic data from APIs, CMS systems, or user input.

## Persona

- Treat the user as a senior software architect who knows the direction and wants surgical help executing.
- Assume deep experience with: TypeScript/React/Next.js/Remix, Node/Express, Python/Django, Go, PostgreSQL, Redis,
  Docker/Compose, AWS (ECS/Fargate/Lambda/RDS/S3/CloudFront/SQS/Step Functions), Terraform, Nx/Turborepo/pnpm,
  Tailwind, Storybook, Vitest/Jest/RTL/Cypress/Playwright, Sentry/LogRocket, Sanity.
- Default to modern patterns and strong typing; prefer boring, reliable solutions unless a contrarian idea clearly wins.
- **Industry Standards**: Follow WCAG 2.1 (AA/AAA), OWASP Top 10, W3C ARIA Authoring Practices, Core Web Vitals, and Vercel React Best Practices.

## Golden Rules (follow strictly)

1) No high-level fluff. If I ask for a fix or explanation, provide code (diffs/patches/snippets) or a concrete, step-by-step remedy.
2) Answer immediately with the solution. Explanations come after the code. If helpful, restate my request in your own words after the solution.
3) Be terse and casual. No motivational speeches. No "you could" lists without concrete code.
4) Anticipate needs. Suggest related improvements and edge-case coverage I likely want, with code.
5) Respect my code comments. Only remove comments if clearly obsolete post-change; otherwise keep them.
6) Prefer arguments over authorities. Cite sources only if asked or nontrivial—at the end, never inline.
7) Consider new tech and contrarian ideas; speculative content must be flagged with "[Speculation]".
8) Discuss safety/security only when crucial and non-obvious; be concise and actionable.
9) If content policy blocks something, give the closest acceptable answer first; then explain the policy—and only then.
10) Don't mention being an AI or any knowledge cutoff. Don't apologize unless you broke a rule.
11) **FOLLOW MY CODE STANDARDIZATION PATTERNS EXACTLY** - Don't deviate from established patterns without explicit permission.
12) **RESPECT COMPONENT ARCHITECTURE DECISIONS** - If I revert changes, follow the pattern I establish, not what I initially suggested.
13) **IMPLEMENT COMPREHENSIVE ARIA ATTRIBUTES** - All interactive components must have proper ARIA roles, relationships, and labels.
14) **TEST ARIA ATTRIBUTES THOROUGHLY** - Use `getByRole` queries and test all ARIA relationships, IDs, and conditional behavior.
15) **FOLLOW INDUSTRY STANDARDS** - Adhere to WCAG 2.1, OWASP Top 10, Core Web Vitals, and Vercel React Best Practices.
16) **MAINTAIN COMPLIANCE** - Ensure all code meets security, accessibility, performance, and code quality benchmarks.

## Standards Reference

**Quick Reference to All Standards**:

- **Component Architecture**: `.cursor/rules/component-architecture.mdc`
- **React + TypeScript**: `.cursor/rules/react-typescript.mdc`
- **Accessibility (WCAG 2.1)**: `.cursor/rules/accessibility.mdc`
- **Performance (Vercel Best Practices)**: `.cursor/rules/performance.mdc`
- **Testing**: `.cursor/rules/testing.mdc`
- **Documentation**: `.cursor/rules/documentation.mdc`
- **Security**: `.cursor/rules/security.mdc`
- **Vercel React Best Practices**: `.cursor/skills/vercel-react-best-practices/`
- **Web Design Guidelines**: `.cursor/skills/web-design-guidelines/`

**Industry Standards**:

- **Accessibility**: WCAG 2.1 Level AA/AAA, W3C ARIA Authoring Practices
- **Security**: OWASP Top 10, OWASP ASVS Level 2
- **Performance**: Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **Code Quality**: TypeScript strict mode, ESLint recommended rules

## Documentation Standards (Quick Reference)

**Reference**: See `.cursor/rules/documentation.mdc` for comprehensive documentation standards.

### Documentation Levels

- **Components**: File-level JSDoc with `@file`, `@author`, `@description`
- **Types**: For `@packages/` components, use one-liner JSDoc (`/** Ref type for Component. */`). For `@apps/` components (web, admin, API), type documentation is NOT ALLOWED.
- **Functions**: Full JSDoc with `@param`/`@returns`/`@example` (when needed)
- **Memoized Components**: Brief explanation of memoization behavior

### Documentation Template

**For `@apps/` components (web, admin, API):**

```typescript
/**
 * @file ComponentName.tsx
 * @author Guy Romelle Magayano
 * @description [One-line description of what the component does].
 */

import React from "react";
// ... other imports

export type ComponentNameRef = React.ComponentRef<typeof ComponentElementType>;

export interface ComponentNameProps {
  prop: Type;
}

export function ComponentName(props: ComponentNameProps) {
  const { ...rest } = props;
  // ref is available via props spread (React 19)
  // Implementation
}

ComponentName.displayName = "ComponentName"; // Optional: manual assignment or omit
```

**For `@packages/` components:**

```typescript
/**
 * @file ComponentName.tsx
 * @author Guy Romelle Magayano
 * @description [One-line description of what the component does].
 */

import React from "react";
// ... other imports

/** Ref type for the ComponentName component. */
export type ComponentNameRef = React.ComponentRef<typeof ComponentElementType>;

/** Props for the ComponentName component. */
export interface ComponentNameProps {
  /** Prop description. */
  prop: Type;
}

export const ComponentName = setDisplayName(
  React.forwardRef<ComponentNameRef, ComponentNameProps>(function ComponentName(props, ref) {
    // Implementation
  })
);
```

## Component Standardization Patterns

**Reference**: See `.cursor/rules/component-architecture.mdc` and `.cursor/rules/react-typescript.mdc` for detailed standards.

- **Main Components**: For `@packages/` components, use `setDisplayName` for proper component naming. For `@apps/` components (web, admin, API), `setDisplayName` is NOT ALLOWED - use manual `displayName` assignment or omit it entirely. Extend `React.ComponentProps<typeof ElementType>` + `CommonComponentProps` for utility props. For `@apps/` components, refs work via props spread in `rest` (React 19 pattern), so `forwardRef` is NOT ALLOWED. For `@packages/` components, `forwardRef` is REQUIRED.
- **Sub-components**: Use `useComponentId` hook internally, receive `internalId`/`debugMode` props directly. For `@packages/` sub-components, use `setDisplayName`. For `@apps/` sub-components, `setDisplayName` is NOT ALLOWED. Use `hasAnyRenderableContent` for content validation
- **Component Props**: Extend `React.ComponentProps<typeof BaseComponent>` + `CommonComponentProps` for utility props
- **Consistent Prop Names**: All components use `internalId`/`debugMode` (external props) from `CommonComponentProps`
- **Compound Components**: Manually attach sub-components as properties to main component
- **Type Organization**: Co-locate types with their components, use inline types for component-specific interfaces, separate files only for shared types
- **File Structure**: Follow established patterns with `_internal/`, `_data/`, `__tests__/` folders
- **Main Types**: Use `_types/` for types shared between main component and internal sub-components
- **Internal Types**: Use `_internal/_types/` for types shared only between internal sub-components
- **Export Patterns**: Use `export { ComponentInternal as Component }` for internal components
- **Internal Components**: Only export from `_internal/index.ts` for internal use, never from main `index.ts`
- **CSS Modules**: Use `cn()` helper for className composition, co-locate with components
- **Test Structure**: Vitest + RTL, mock dependencies, use `afterEach` cleanup, import globals explicitly
- **Process Mocking**: Mock `process` object for logger compatibility in browser tests
- **Component Mocking**: Mock `@web/components`, `@web/utils`, and internal components in tests
- **ESLint Protection**: Rules prevent cross-component access to `_internal/`, `_types/`, `_data/` folders
- **ARIA Implementation**: Comprehensive accessibility attributes required for all interactive components
- **Import Organization**: Avoid barrel file imports (see `.cursor/rules/react-typescript.mdc` for direct import patterns)

## ARIA Implementation Standards

### **Required ARIA Attributes for All Components**

- **Semantic Roles**: Apply appropriate ARIA roles (`main`, `region`, `article`, `banner`, `navigation`, `button`, etc.)
- **Element Relationships**: Use `aria-labelledby` and `aria-describedby` to connect related elements
- **Unique IDs**: Generate unique IDs for elements referenced by ARIA relationships
- **Descriptive Labels**: Provide `aria-label` attributes for context and clarity
- **Decorative Elements**: Use `aria-hidden="true"` for purely decorative elements
- **Heading Structure**: Apply `aria-level` attributes for proper heading hierarchy
- **State Management**: Use `aria-expanded`, `aria-selected`, `aria-checked` for dynamic states
- **Live Regions**: Use `aria-live` for dynamic content updates

### **ARIA Implementation Patterns**

#### **1. Landmark Roles**

```typescript
// Main content area
<div role="main" aria-label="Article content">

// Navigation areas
<nav role="navigation" aria-label="Main navigation">

// Content regions
<section role="region" aria-label="Article layout">

// Article content
<article role="article" aria-labelledby="article-title">
```

#### **2. Element Relationships**

```typescript
// Article with title and date relationships
<article
  role="article"
  aria-labelledby="article-title"
  aria-describedby="article-date"
>
  <h1 id="article-title">Article Title</h1>
  <time id="article-date" aria-label="Published on January 1, 2023">
    January 1, 2023
  </time>
</article>
```

#### **3. Interactive Elements**

```typescript
// Button with descriptive label
<button
  role="button"
  aria-label="Go back to articles"
  aria-describedby="back-button-help"
>
  <Icon.ArrowLeft aria-hidden="true" />
  Back
</button>

// Form elements with proper labeling
<input
  type="text"
  aria-label="Search articles"
  aria-describedby="search-help"
  aria-required="true"
/>
```

#### **4. Conditional ARIA Attributes**

```typescript
// Only apply ARIA attributes when content exists
<article
  role="article"
  aria-labelledby={title ? "article-title" : undefined}
  aria-describedby={date ? "article-date" : undefined}
>
  {title && <h1 id="article-title">{title}</h1>}
  {date && <time id="article-date">{date}</time>}
</article>
```

### **ARIA Testing Requirements**

#### **1. Role Testing**

```typescript
// Test ARIA roles are correctly applied
const mainElement = screen.getByRole("main");
const articleElement = screen.getByRole("article");
const buttonElement = screen.getByRole("button", { name: /go back/i });
```

#### **2. Relationship Testing**

```typescript
// Test ARIA relationships
const articleElement = screen.getByRole("article");
expect(articleElement).toHaveAttribute("aria-labelledby", "article-title");
expect(articleElement).toHaveAttribute("aria-describedby", "article-date");
```

#### **3. ID Testing**

```typescript
// Test unique IDs for ARIA relationships
const titleElement = screen.getByRole("heading", { level: 1 });
expect(titleElement).toHaveAttribute("id", "article-title");
```

#### **4. Label Testing**

```typescript
// Test descriptive labels
const dateElement = screen.getByText("January 1, 2023").closest("time");
expect(dateElement).toHaveAttribute("aria-label", "Published on January 1, 2023");
```

#### **5. Decorative Element Testing**

```typescript
// Test decorative elements are hidden
const separatorElement = screen.getByTestId("date-separator");
expect(separatorElement).toHaveAttribute("aria-hidden", "true");
```

#### **6. Conditional ARIA Testing**

```typescript
// Test ARIA attributes when content is missing
const articleWithoutTitle = { ...mockArticle, title: "" };
render(<ArticleLayout article={articleWithoutTitle} />);

const articleElement = screen.getByRole("article");
expect(articleElement).not.toHaveAttribute("aria-labelledby");
```

### **ARIA Best Practices**

- **Semantic HTML First**: Use native HTML elements with built-in accessibility
- **Progressive Enhancement**: Add ARIA attributes to enhance, not replace, semantic HTML
- **User-Centric Testing**: Test with screen readers and assistive technologies
- **Consistent Patterns**: Apply ARIA attributes consistently across similar components
- **Documentation**: Document ARIA implementation decisions and patterns
- **Validation**: Use accessibility testing tools to validate ARIA implementation

## SEO Best Practices for Components

**Reference**: Google Search Central Guidelines, Schema.org, Next.js SEO Documentation, Core Web Vitals.

### **Core SEO Requirements**

All components must follow these SEO best practices to ensure optimal search engine visibility and ranking:

#### **1. Semantic HTML Structure**

- **Use Semantic Elements**: Prefer semantic HTML5 elements (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`, `<time>`, `<figure>`, `<figcaption>`) over generic `<div>` elements
- **Proper Element Types**: Components should support semantic element types via `as` prop when appropriate
- **Example**:

```typescript
// ✅ Good: Supports semantic elements
type CardElementType = "div" | "article" | "section";

export function Card<T extends CardElementType>(props: CardProps<T>) {
  const { as: Component = "div", ...rest } = props;
  return <Component {...rest}>{children}</Component>;
}

// ❌ Bad: Only supports div
export function Card(props: CardProps) {
  return <div {...props}>{children}</div>;
}
```

#### **2. Heading Hierarchy**

- **Flexible Heading Levels**: Title/heading components must support all heading levels (`h1` through `h6`) via `as` prop
- **Proper Hierarchy**: Maintain logical heading hierarchy (h1 → h2 → h3, no skipping levels)
- **Default to h2**: Default to `h2` for card titles and list items, allow override for page-level titles
- **Example**:

```typescript
// ✅ Good: Supports all heading levels
type CardTitleElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

function CardTitle<T extends CardTitleElementType>(props: CardTitleProps<T>) {
  const { as: Component = "h2", ...rest } = props;
  return <Component {...rest}>{children}</Component>;
}

// ❌ Bad: Locked to single heading level
function CardTitle(props: CardTitleProps) {
  return <h2 {...props}>{children}</h2>;
}
```

#### **3. Link Optimization**

- **Descriptive Link Text**: Links must have descriptive, visible text content (not just icons or generic text)
- **Aria-Label Strategy**: Only use `aria-label` when link text is not descriptive (e.g., icon-only links). Search engines prioritize visible link text over `aria-label`
- **Proper Rel Attributes**: External links must include `rel="noopener noreferrer"` for security and SEO
- **Internal Link Optimization**: Use Next.js `Link` component for internal links to enable prefetching
- **Example**:

```typescript
// ✅ Good: Descriptive link text, aria-label only when needed
function CardLinkCustom(props: CardLinkCustomProps) {
  const hasDescriptiveText =
    typeof children === "string"
      ? children.trim().length > 0
      : React.Children.count(children) > 0;
  const ariaLabel = title && !hasDescriptiveText ? title : undefined;

  return (
    <Link href={href} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

// ❌ Bad: Always uses aria-label, overriding link text
function CardLinkCustom(props: CardLinkCustomProps) {
  return (
    <Link href={href} aria-label={title}>
      {children}
    </Link>
  );
}
```

#### **4. Date and Time Semantics**

- **Time Element Support**: Date/time components must support `<time>` element via `as` prop
- **DateTime Attribute**: When using `<time>` element, always include `dateTime` attribute with ISO 8601 format
- **Example**:

```typescript
// ✅ Good: Supports time element with dateTime
type CardEyebrowElementType = "p" | "time";
type CardEyebrowProps<T extends CardEyebrowElementType> = {
  as?: T;
  dateTime?: T extends "time" ? string : never;
};

function CardEyebrow<T extends CardEyebrowElementType>(props: CardEyebrowProps<T>) {
  const { as: Component = "p", dateTime, ...rest } = props;
  const timeProps = Component === "time" && dateTime ? { dateTime } : {};
  
  return (
    <Component {...rest} {...timeProps}>
      {children}
    </Component>
  );
}

// ❌ Bad: No dateTime support
function CardEyebrow(props: CardEyebrowProps) {
  return <p {...props}>{children}</p>;
}
```

#### **5. Image Optimization**

- **Alt Text Required**: All images must have descriptive `alt` attributes (empty `alt=""` only for decorative images)
- **Responsive Images**: Use Next.js `Image` component with proper `width`, `height`, and `sizes` attributes
- **Lazy Loading**: Implement lazy loading for below-the-fold images
- **WebP Format**: Prefer WebP format with fallbacks for better performance
- **Example**:

```typescript
// ✅ Good: Proper image optimization
import Image from "next/image";

function CardImage({ src, alt, ...props }: CardImageProps) {
  return (
    <Image
      src={src}
      alt={alt || ""}
      width={800}
      height={600}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      loading="lazy"
      {...props}
    />
  );
}
```

#### **6. Content Structure**

- **Logical Content Order**: Structure content in logical order (title → date → description → CTA)
- **Unique Content**: Avoid duplicate content across pages
- **Content Length**: Ensure descriptive text is sufficient (minimum 150-300 words for articles)
- **Keyword Optimization**: Use natural, semantic keywords without keyword stuffing

#### **7. Meta Tags and Structured Data**

- **Page-Level Meta Tags**: Use Next.js `Metadata` API for title, description, and Open Graph tags
- **Structured Data**: Implement JSON-LD schema markup for articles, products, and other content types
- **Canonical URLs**: Always include canonical URLs to prevent duplicate content issues
- **Example**:

```typescript
// Page-level metadata (in page.tsx or layout.tsx)
export const metadata: Metadata = {
  title: "Article Title | Site Name",
  description: "Article description for search engines",
  openGraph: {
    title: "Article Title",
    description: "Article description",
    images: ["/og-image.jpg"],
  },
};

// Structured data (in component or page)
export function ArticleStructuredData({ article }: { article: Article }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

#### **8. Performance and Core Web Vitals**

- **LCP Optimization**: Optimize Largest Contentful Paint (LCP) by prioritizing above-the-fold content
- **CLS Prevention**: Prevent Cumulative Layout Shift (CLS) by setting explicit dimensions for images and avoiding dynamic content insertion
- **FID Optimization**: Minimize First Input Delay (FID) by reducing JavaScript execution time
- **Code Splitting**: Use dynamic imports for below-the-fold components
- **Example**:

```typescript
// ✅ Good: Dynamic import for heavy components
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <Skeleton />,
  ssr: false, // Only if component doesn't need SSR
});

// ✅ Good: Explicit image dimensions to prevent CLS
<Image
  src={src}
  alt={alt}
  width={800}
  height={600}
  style={{ width: "100%", height: "auto" }}
/>
```

### **SEO Testing Requirements**

#### **1. Semantic Structure Testing**

```typescript
// Test semantic elements are used correctly
it("uses article element for article cards", () => {
  render(<Card as="article">Content</Card>);
  const article = screen.getByRole("article");
  expect(article).toBeInTheDocument();
});
```

#### **2. Heading Hierarchy Testing**

```typescript
// Test heading levels are correct
it("supports all heading levels", () => {
  const { rerender } = render(<Card.Title as="h1">Title</Card.Title>);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

  rerender(<Card.Title as="h3">Title</Card.Title>);
  expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
});
```

#### **3. Link Text Testing**

```typescript
// Test links have descriptive text
it("prioritizes visible link text over aria-label", () => {
  render(
    <Card.LinkCustom href="/article" title="Article title">
      Read full article
    </Card.LinkCustom>
  );
  
  const link = screen.getByRole("link", { name: "Read full article" });
  expect(link).toBeInTheDocument();
  expect(link).not.toHaveAttribute("aria-label");
});
```

#### **4. Date/Time Testing**

```typescript
// Test time element has dateTime attribute
it("includes dateTime when using time element", () => {
  render(
    <Card.Eyebrow as="time" dateTime="2023-01-01">
      January 1, 2023
    </Card.Eyebrow>
  );
  
  const time = screen.getByText("January 1, 2023");
  expect(time).toHaveAttribute("dateTime", "2023-01-01");
});
```

### **SEO Best Practices Checklist**

- ✅ Use semantic HTML5 elements (`article`, `section`, `time`, etc.)
- ✅ Support flexible heading levels (h1-h6) via `as` prop
- ✅ Prioritize descriptive link text over `aria-label`
- ✅ Include `rel="noopener noreferrer"` for external links
- ✅ Support `<time>` element with `dateTime` attribute
- ✅ Provide descriptive `alt` text for images
- ✅ Use Next.js `Image` component with proper dimensions
- ✅ Implement structured data (JSON-LD) for rich results
- ✅ Optimize for Core Web Vitals (LCP, FID, CLS)
- ✅ Use dynamic imports for below-the-fold content
- ✅ Include canonical URLs to prevent duplicate content
- ✅ Test semantic structure and heading hierarchy

### **SEO Anti-Patterns to Avoid**

- ❌ **Locked Heading Levels**: Don't lock components to single heading level (e.g., always `h2`)
- ❌ **Aria-Label Overuse**: Don't use `aria-label` when link text is already descriptive
- ❌ **Generic Elements**: Don't use `<div>` when semantic elements are more appropriate
- ❌ **Missing DateTime**: Don't use `<time>` element without `dateTime` attribute
- ❌ **Missing Alt Text**: Don't omit `alt` attributes on images
- ❌ **Duplicate Content**: Don't create duplicate content across pages
- ❌ **Keyword Stuffing**: Don't over-optimize with unnatural keyword density
- ❌ **Hidden Content**: Don't hide important content with `display: none` or `visibility: hidden` (use `sr-only` class for screen reader-only content)

## Enterprise Component Architecture Standards

### Component Classification

1. **Compound Components**: Main component with orchestrated sub-components
   - Structure: `_internal/` folder with sub-components
   - Tests: Both unit AND integration tests
   - Example: Card, Tabs, Accordion

2. **Orchestrator Components**: Coordinates multiple independent components
   - Structure: Flat, imports other components
   - Tests: Unit tests only (integration happens at parent level)
   - Example: ArticleLayout, DashboardView

3. **Presentational Components**: Pure display, no sub-components
   - Structure: Single file + tests + `constants/Component.i18n.ts`
   - Tests: Unit tests only
   - Example: Article, Button, Badge
   - **i18n**: Always include `constants/Component.i18n.ts` for labels

4. **Utility Components**: Wrappers around primitives
   - Structure: Single file
   - Tests: Basic unit tests (60% coverage acceptable)
   - Example: Container, Section, Grid

### Required Component Classification Comments

**For `@packages/` components only**: All component files must include classification comments at the top.

**For `@apps/` components (web, admin, API)**: Component classification comments are NOT ALLOWED.

```typescript
// ============================================================================
// COMPONENT CLASSIFICATION
// - Type: Compound/Orchestrator/Presentational/Utility
// - Testing: Unit + Integration tests (both required) / Unit tests only / Basic unit tests
// - Structure: _internal/ folder with sub-components / Flat, imports other components / Single file + tests + constants/Component.i18n.ts / Single file
// - Risk Tier: Tier 1 (90%+ coverage, comprehensive edge cases) / Tier 2 (80%+ coverage, key paths + edges) / Tier 3 (60%+ coverage, happy path + basic validation)
// - Data Source: Static data (no external data fetching) / Sanity CMS (GROQ queries) / External API / GraphQL
// ============================================================================
```

### Scalable Folder Structure

**Component Folder Naming Convention**: Use **kebab-case** for component folder names (e.g., `article`, `card-title`, `list-item`), with **PascalCase** for component file names (e.g., `Article.tsx`, `CardTitle.tsx`, `ListItem.tsx`). This pattern applies to all components in `apps/` and `packages/` folders.

#### For Compound Components (with sub-components)

```bash
components/component-name/
├── ComponentName.tsx          # Main component (PascalCase file)
├── index.ts                   # Public exports
├── __tests__/
│   ├── ComponentName.test.tsx
│   └── ComponentName.integration.test.tsx
├── _types/                    # Shared types (main + internal)
│   ├── index.ts
│   └── ComponentName.types.ts
├── _internal/                 # Sub-components
│   ├── index.ts
│   ├── sub-component/        # Kebab-case folder
│   │   ├── SubComponent.tsx  # PascalCase file
│   │   ├── SubComponent.module.css
│   │   └── __tests__/
│   └── _types/               # Internal-only types
│       ├── index.ts
│       └── Internal.types.ts
├── _data/                    # Constants, labels, defaults
│   ├── index.ts
│   ├── ComponentName.data.ts
│   └── ComponentName.i18n.ts
└── _queries/                 # GraphQL/API (if needed)
    ├── index.ts
    ├── ComponentName.queries.ts
    └── ComponentName.mutations.ts
```

#### For Orchestrator/Presentational Components (no sub-components)

```bash
components/component-name/
├── ComponentName.tsx          # Main component (PascalCase file)
├── ComponentName.module.css
├── index.ts
├── __tests__/
│   └── ComponentName.test.tsx # Unit tests only
├── constants/
│   └── ComponentName.i18n.ts   # Internationalization labels
└── _data/                     # Optional: if shared data/types
    ├── index.ts
    ├── ComponentName.data.ts
    └── ComponentName.types.ts
```

### Type Organization Rules

- **Inline types**: Component-specific interfaces in component file (default)
- **`_types/`**: Only when types shared between main + internal sub-components
- **`_data/Component.types.ts`**: Only when types shared across multiple components
- **Never**: Separate `.types.ts` for single-component types

### Data Organization Rules

- **`_data/Component.data.ts`**: Constants, defaults, configuration
- **`_data/Component.i18n.ts`**: Internationalization labels (use dot notation: `Component.i18n.ts`) (use dot notation: `Component.i18n.ts`)
- **`_data/Component.types.ts`**: Types shared across multiple components
- **`_queries/`**: GraphQL queries/mutations (separate from data)
- **Never**: Business logic, API calls, or complex transformations in `_data/`

### Web App Specific Data Organization (Sanity CMS)

For `@web/` components using Sanity CMS:

- **`_queries/Component.queries.ts`**: GROQ queries for Sanity data fetching
- **`_queries/Component.fragments.ts`**: Reusable GROQ fragments
- **`_queries/Component.mutations.ts`**: Sanity mutations (if needed)
- **`_types/Component.types.ts`**: Sanity document types and component interfaces
- **`_data/Component.data.ts`**: Static constants, labels, defaults
- **`_data/Component.i18n.ts`**: Internationalization labels (use dot notation: `Component.i18n.ts`)
- **Never**: GROQ queries in component files - always in `_queries/`

## File Structure Standards

**Component Folder Naming Convention**: Use **kebab-case** for component folder names (e.g., `article`, `card-title`, `list-item`), with **PascalCase** for component file names (e.g., `Article.tsx`, `CardTitle.tsx`, `ListItem.tsx`). This pattern applies to all components in `apps/` and `packages/` folders.

```bash
components/component-name/
├── ComponentName.tsx              # Main component (PascalCase file)
├── ComponentName.module.css       # CSS modules
├── index.ts                       # Public exports
├── __tests__/                     # Main tests
│   ├── ComponentName.test.tsx
│   └── ComponentName.integration.test.tsx
├── _types/                        # Main component types (shared between main + internal)
│   ├── index.ts
│   └── ComponentName.types.ts     # Main component interfaces
├── _internal/                     # Sub-components
│   ├── index.ts
│   ├── _types/                    # Private internal types (for sub-components only)
│   │   ├── index.ts
│   │   └── Internal.types.ts      # Internal component interfaces
│   ├── sub-component/             # Each sub-component (kebab-case folder)
│   │   ├── SubComponent.tsx       # PascalCase file
│   │   ├── SubComponent.module.css
│   │   ├── index.ts
│   │   └── __tests__/
│   └── styles/                    # Sub-component styles
│       ├── SubComponent.module.css
│       └── AnotherSub.module.css
├── _data/                         # Simple constants and labels only
│   ├── index.ts
│   ├── ComponentName.data.ts      # Constants, labels, defaults
│   └── ComponentName.types.ts     # ONLY shared types (when used by multiple components)
└── styles/                        # Main component styles
    └── ComponentName.module.css
```

## Utility Function Standards

- **`useComponentId`**: For ID generation and debug mode in sub-components
- **`setDisplayName`**: For component naming in `@packages/` components only. NOT ALLOWED in `@apps/` components (web, admin, API)
- **`hasAnyRenderableContent`**: For content validation in main components
- **`hasMeaningfulText`**: For content validation in sub-components
- **`isValidLink`**: For link validation
- **`getLinkTargetProps`**: For link target/rel attributes
- **`createComponentProps`**: For component data attributes
- **`cn`**: For className composition from `@web/utils`

## TypeScript Standards

- **Strict mode**: Always use strict TypeScript
- **Component Props**: Extend base component props + utility props
- **Type Co-location**: Keep types close to their usage - use inline types for component-specific interfaces
- **Interface Naming**: `ComponentProps`, `ComponentCompoundComponent`
- **Export Types**: Re-export types from index files only when shared across multiple components
- **Inline Types**: Use inline types for component-specific interfaces in component files
- **Main Types**: Use `_types/` folder for types shared between main and internal components
- **Private Types**: Use `_internal/_types/` folder for component-specific types used internally only
- **Public Types**: Only export types from main `index.ts` that external components should use
- **Separate Types Files**: Only create `.types.ts` files when types are shared across multiple components
- **Compound Component Types**: Define compound component types inline in main component file
- **Data Types**: Keep `_data/` types simple - only constants, labels, and shared interfaces
- **Type Documentation**: For `@packages/` components, document all exported types with JSDoc comments, document type properties with `/** */` comments. For `@apps/` components (web, admin, API), type documentation is NOT ALLOWED.

## Data Organization Standards

- **`_data/` Purpose**: Simple constants, labels, and shared types only
- **Constants**: Use `Component.data.ts` for labels, defaults, and static configuration
- **Shared Types**: Use `Component.types.ts` ONLY when types are shared across multiple components
- **Inline Types**: Keep component-specific interfaces inline in component files
- **No Complex Data**: Don't put API types, data fetching logic, or complex data structures in `_data/`
- **Export Pattern**: Re-export from `_data/index.ts` for clean imports

## Type Organization Standards

- **`_types/` Purpose**: Main component types shared between main and internal components
- **`_internal/_types/` Purpose**: Private internal types shared only between sub-components
- **Main Types**: Component interfaces used by main component and accessible to internal components
- **Internal Types**: Component-specific interfaces used only within the component's internal structure
- **Encapsulation**: Prevents external components from importing internal type definitions
- **Loose Coupling**: External components should use `React.ComponentProps<typeof Component>` instead
- **Main Usage**: Types used by main component and shared with internal sub-components
- **Internal Usage**: Types used by sub-components within the same component family only
- **Export Pattern**: Re-export from both `_types/index.ts` and `_internal/_types/index.ts` for clean imports

## Type Documentation Standards

**For `@packages/` components only**: Type documentation is REQUIRED.

**For `@apps/` components (web, admin, API)**: Type documentation is NOT ALLOWED.

- **Exported Types**: For `@packages/`, always document exported types with JSDoc comments
- **Type Properties**: For `@packages/`, document all type properties with `/** */` comments
- **Union Types**: For `@packages/`, document each union variant with descriptive comments
- **Interface Properties**: For `@packages/`, document each interface property with purpose and constraints
- **Type Aliases**: For `@packages/`, document type aliases with their intended usage
- **Generic Types**: For `@packages/`, document generic type parameters and constraints
- **One-liner Comments**: For `@packages/`, use single-line `/** */` format instead of multiline for concise documentation
- **JSDoc Titles**: For `@packages/`, use uppercase for JSDoc comment titles only when they serve as section headers (e.g., `/** FOOTER LINK CONFIGURATION */`), otherwise use proper English casing (e.g., `/** Internal link */`)
- **Example Pattern for `@packages/`**:

  ```typescript
  /** FOOTER LINK CONFIGURATION FOR NAVIGATION AND EXTERNAL LINKS */
  export type FooterLink =
    | {
        /** Internal link */
        kind: "internal";
        /** Link label */
        label: string;
        /** Link href */
        href: React.ComponentProps<typeof Link>["href"];
      }
    | {
        /** External link */
        kind: "external";
        /** Link label */
        label: string;
        /** Link href */
        href: string;
        /** Open link in new tab */
        newTab?: boolean;
        /** Link rel */
        rel?: string;
      };
  ```

- **Example Pattern for `@apps/`** (no type documentation):

  ```typescript
  export type FooterLink =
    | {
        kind: "internal";
        label: string;
        href: React.ComponentProps<typeof Link>["href"];
      }
    | {
        kind: "external";
        label: string;
        href: string;
        newTab?: boolean;
        rel?: string;
      };
  ```

## Internationalization (i18n) Standards

### File Naming Conventions

- **Use dot notation**: `Component.i18n.ts` (not `ComponentLabels.ts` or `ComponentLabels.i18n.ts`)
- **Consistent naming**: All i18n files follow the pattern `{ComponentName}.i18n.ts`
- **Clear intent**: The `.i18n.ts` extension immediately indicates internationalization purpose
- **Future-ready**: Perfect for Sanity CMS + third-party i18n package integration

### i18n File Structure

```typescript
// ============================================================================
// COMPONENT INTERNATIONALIZATION
// ============================================================================

/** `ComponentI18n` type. */
export type ComponentI18n = Readonly<Record<string, string>>;

/** `COMPONENT_I18N` object. */
export const COMPONENT_I18N = {
  // Action labels
  cta: "Call to action",
  submit: "Submit",
  cancel: "Cancel",

  // Content labels
  title: "Title",
  description: "Description",

  // Navigation labels
  goBack: "Go back",
  nextPage: "Next page",

  // Error messages
  invalidData: "Invalid data provided",
  requiredField: "This field is required",

  // Accessibility labels
  ariaLabel: "Accessible label",
  ariaDescription: "Accessible description",
} as const satisfies ComponentI18n;
```

### i18n Integration Patterns

- **Import pattern**: `import { COMPONENT_I18N } from "./constants/Component.i18n";`
- **Usage pattern**: `{COMPONENT_I18N.cta}` or `aria-label={COMPONENT_I18N.ariaLabel}`
- **Type safety**: Use `satisfies ComponentI18n` for compile-time validation
- **Const assertion**: Use `as const` for literal type inference
- **Readonly**: Use `Readonly<Record<string, string>>` for immutability

### i18n Testing Standards

```typescript
// Mock i18n constants in tests
vi.mock("../constants/Component.i18n", () => ({
  COMPONENT_I18N: {
    cta: "Read article",
    goBack: "Go back to articles",
    invalidData: "Invalid article data",
    // ... other labels
  },
}));
```

### Future Sanity + i18n Integration

- **Sanity integration**: Labels can be fetched from Sanity CMS for dynamic content
- **Third-party i18n**: Compatible with libraries like `react-i18next`, `next-intl`
- **Fallback strategy**: Static labels as fallback when dynamic content unavailable
- **Type generation**: Generate TypeScript types from Sanity i18n schemas

## Internal Component Standards

- **`_internal/` Purpose**: Sub-components used only within their parent component
- **No Public Exports**: Never export internal components from main `index.ts`
- **Internal-Only Access**: Only import from `_internal/` within the same component tree
- **Compound Pattern**: External consumers use `Component.SubComponent` pattern
- **Encapsulation**: Prevents external components from importing internal sub-components directly
- **Type Safety**: Internal components can use private types from `_types/` folder

## Testing Standards

**Reference**: See `.cursor/rules/testing.mdc` for comprehensive testing standards and patterns.

- **Vitest**: Use Vitest for all testing
- **RTL**: Use React Testing Library for component tests
- **Mocking**: Mock dependencies properly, use `vi.mock()`
- **Globals**: Import `describe`, `it`, `expect`, `afterEach`, `vi` explicitly
- **Test Structure**: Arrange/Act/Assert pattern
- **Cleanup**: Use `afterEach(cleanup)` in all test files
- **Accessibility Testing**: Comprehensive ARIA attribute testing required for all components

### Test Standardization Rules

**Critical**: Test patterns differ significantly between `@apps/` and `@packages/` components. Follow the correct pattern for each.

#### **For `@apps/` Components (web, admin, API)**

- ❌ **NO ref forwarding tests** - Refs work via props spread in React 19, not `forwardRef`. Remove any existing ref forwarding tests.
- ❌ **NO `setDisplayName` mocks** - `@apps/` components use manual `displayName` assignment or omit it entirely. Do not mock `setDisplayName`.
- ❌ **NO `useComponentId` mocks or tests** - `@apps/` components do not use `useComponentId` hook. Remove all `useComponentId` mocks and integration tests.
- ❌ **NO `createComponentProps` mocks** - `@apps/` components do not use `createComponentProps`. Remove from mocks unless needed for other utilities.
- ✅ **Polymorphic `as` prop tests** - Test all supported element types when component supports polymorphism (e.g., `div`, `section`, `main`, `article`).
- ✅ **Correct mock paths** - Use actual import paths (e.g., `@web/utils/helpers` not `@web/utils`). Verify imports match implementation.
- ✅ **Essential tests only** - Focus on critical paths, avoid exhaustive edge case testing. Keep tests maintainable and non-flaky.
- ✅ **Integration tests ONLY for compound components** - Write integration tests only for components with 3+ sub-components that require orchestration.

#### **For `@packages/` Components**

- ✅ **Ref forwarding tests REQUIRED** - `@packages/` components use `forwardRef`, so ref forwarding tests are mandatory.
- ✅ **`setDisplayName` mocks REQUIRED** - `@packages/` components use `setDisplayName`, so this mock is required.
- ✅ **Comprehensive testing** - Higher coverage requirements (90%+ for Tier 1 components).
- ✅ **Full test suite** - Include all standard test categories with comprehensive edge case coverage.

#### **Test Cleanup Guidelines**

When updating existing test files for `@apps/` components, remove:

- ❌ Ref forwarding tests (refs work via props spread in React 19)
- ❌ `setDisplayName`-related mocks and tests
- ❌ `useComponentId` mocks and integration tests (not used in `@apps/` components)
- ❌ `createComponentProps` mocks (not used in `@apps/` components)
- ❌ `debugId` and `debugMode` prop tests (not used in `@apps/` components)
- ❌ Excessive edge case tests (keep only critical ones)
- ❌ Tests for features that don't exist in implementation
- ❌ Outdated mock paths that don't match actual imports

When updating existing test files for `@apps/` components, add:

- ✅ Polymorphic `as` prop tests (when component supports polymorphism)
- ✅ Integration tests only for compound components (3+ sub-components)
- ✅ Essential ARIA attribute tests
- ✅ Correct mock paths matching actual imports

**Reference**: See `apps/web/src/components/__tests__/Container.test.tsx` for the standard `@apps/` component test pattern.

### Required Test File Documentation

All test files must include JSDoc at the top:

```typescript
/**
 * @file ComponentName.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the ComponentName component.
 */
```

For integration tests:

```typescript
/**
 * @file ComponentName.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the ComponentName component.
 */
```

## Enterprise Testing Strategy

### Testing Philosophy

- **Risk-Based + Practical Approach**: Test critical paths heavily, simple presentational components lightly
- **Test Pyramid**: 70% unit, 20% integration, 10% e2e
- **Integration Tests ONLY for**: Compound components with orchestrated sub-components (e.g., Card with Card.Title/Description/Cta)
- **Skip Integration Tests for**: Simple components that delegate to other components without orchestration

### When to Write Integration Tests

- ✅ Compound components with 3+ sub-components
- ✅ Components with complex state management across sub-components
- ✅ Components with prop drilling to multiple internal components
- ❌ Simple presentational components (Article, ArticleList, etc.)
- ❌ Components that just wrap other components
- ❌ Pure data display components

### Test Coverage Requirements

- **Critical Components** (auth, payments, data mutations): 90%+ coverage, comprehensive edge cases
- **Core Components** (layout, navigation, forms): 80%+ coverage, key paths + edges
- **Presentational Components**: 60%+ coverage, happy path + basic validation
- **Utility Functions**: 100% coverage for shared utils, 80% for component-specific

### Test Organization

**Component Folder Naming Convention**: Use **kebab-case** for component folder names (e.g., `article`, `card-title`, `list-item`), with **PascalCase** for component file names (e.g., `Article.tsx`, `CardTitle.tsx`, `ListItem.tsx`). This pattern applies to all components in `apps/` and `packages/` folders.

```bash
components/component-name/
├── __tests__/
│   ├── ComponentName.test.tsx           # Unit tests (always required)
│   ├── ComponentName.integration.test.tsx  # Only if compound component
│   └── ComponentName.e2e.test.tsx       # Only for critical user flows
```

### Test Cleanup Implementation

- **Import Pattern**: Always import `cleanup` from `@testing-library/react` and `afterEach` from `vitest`
- **Cleanup Hook**: Implement `afterEach(() => { cleanup(); vi.clearAllMocks(); })` in all test files
- **Test Isolation**: Ensures DOM is reset between tests, preventing "Found multiple elements" errors
- **Mock Reset**: Clears mock state between tests for consistent behavior
- **Required Pattern**:

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

- **Why**: Prevents test interference, ensures reliable test results, maintains clean DOM state
- **When**: Required in ALL test files - main component tests and internal sub-component tests
- **Exception**: None - this pattern is mandatory for all component tests

### Test Cleanup Guidelines for Existing Test Files

When updating existing test files, follow these guidelines to remove outdated patterns and add missing tests:

#### **Tests to Remove from `@apps/` Components**

- ❌ **Ref forwarding tests** - Refs work via props spread in React 19, not `forwardRef`. Remove all `React.createRef()` and ref forwarding assertions.
- ❌ **`setDisplayName` mocks** - `@apps/` components don't use `setDisplayName`. Remove from mocks.
- ❌ **Excessive edge case tests** - Keep only critical edge cases. Remove tests for unlikely scenarios that don't add value.
- ❌ **Tests for non-existent features** - Remove tests that verify features not present in the implementation.
- ❌ **Incorrect mock paths** - Update mock paths to match actual imports (e.g., `@web/utils/helpers` not `@web/utils`).

#### **Tests to Add for `@apps/` Components**

- ✅ **Polymorphic `as` prop tests** - When component supports polymorphism, test all supported element types.
- ✅ **Integration tests for compound components** - Only for components with 3+ sub-components that require orchestration.
- ✅ **Essential ARIA attribute tests** - Test critical accessibility attributes, relationships, and roles.
- ✅ **Correct mock paths** - Ensure all mocks use actual import paths from the component implementation.

#### **Migration Example**

**Before (outdated pattern):**

```typescript
// ❌ REMOVE: Ref forwarding test for @apps/ component
describe("Ref Forwarding", () => {
  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Container ref={ref}>Content</Container>);
    expect(ref.current).toBeInTheDocument();
  });
});

// ❌ REMOVE: setDisplayName mock
vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn(/* ... */), // Not used in @apps/
}));
```

**After (correct pattern):**

```typescript
// ✅ ADD: Polymorphic element type tests
describe("Polymorphic Element Types", () => {
  it("renders as div by default", () => {
    render(<Container>Content</Container>);
    const container = screen.getByTestId("test-id-container-outer-root");
    expect(container.tagName).toBe("DIV");
  });

  it("renders as section when as prop is section", () => {
    render(<Container as="section">Content</Container>);
    const container = screen.getByTestId("test-id-container-outer-root");
    expect(container.tagName).toBe("SECTION");
  });
});

// ✅ CORRECT: No setDisplayName mock for @apps/
vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn(/* ... */),
  // NO setDisplayName - not used in @apps/
}));
```

### Test Categories by Risk Level

#### Tier 1: Critical Components (Auth, Payments, Data Mutations)

- ✅ All basic rendering tests
- ✅ All content validation tests
- ✅ All ARIA attributes (comprehensive)
- ✅ Error boundaries and fallbacks
- ✅ Loading and error states
- ✅ Edge cases (null, undefined, malformed data)
- ✅ Security implications (XSS, injection)
- ✅ Performance under load

#### Tier 2: Core Components (Layouts, Navigation, Forms)

- ✅ Basic rendering tests
- ✅ Content validation tests
- ✅ Key ARIA attributes
- ✅ Main user paths
- ✅ Common edge cases
- ⚠️ Complex edge cases (if time permits)

#### Tier 3: Presentational Components (Cards, Lists, Text)

- ✅ Basic rendering tests
- ✅ Content validation (null/undefined)
- ✅ Basic ARIA roles
- ⚠️ Full ARIA relationships (only if accessibility-critical)
- ⚠️ Edge cases (only if found in production)

### Standard Test Categories (All Tiers)

#### **1. Basic Rendering Tests**

- ✅ Renders children correctly
- ✅ Applies custom className
- ✅ Renders with debug mode enabled
- ✅ Renders with custom component ID
- ✅ Passes through HTML attributes

#### **2. Content Validation Tests**

- ✅ Does not render when no content
- ✅ Handles null/undefined/empty children
- ✅ Validates content with `hasAnyRenderableContent`

#### **3. Debug Mode Tests**

- ✅ Applies data-debug-mode when enabled
- ✅ Does not apply when disabled/undefined

#### **4. Component Structure Tests**

- ✅ Renders as correct element type
- ✅ Applies correct CSS classes
- ✅ Combines CSS module + custom classes

#### **5. Polymorphic Element Type Tests** (for components with `as` prop)

**Required for components that support polymorphic `as` prop:**

- ✅ Test default element type renders correctly
- ✅ Test all supported element types (e.g., `div`, `section`, `main`, `article`)
- ✅ Test element-specific props are correctly typed and applied
- ✅ Test element tag name changes based on `as` prop value

**Example:**

```typescript
describe("Polymorphic Element Types", () => {
  it("renders as div by default", () => {
    render(<Container>Content</Container>);
    const container = screen.getByTestId("test-id-container-outer-root");
    expect(container.tagName).toBe("DIV");
  });

  it("renders as section when as prop is section", () => {
    render(<Container as="section">Content</Container>);
    const container = screen.getByTestId("test-id-container-outer-root");
    expect(container.tagName).toBe("SECTION");
  });

  it("renders as main when as prop is main", () => {
    render(<Container as="main">Content</Container>);
    const container = screen.getByTestId("test-id-container-outer-root");
    expect(container.tagName).toBe("MAIN");
  });

  it("renders as article when as prop is article", () => {
    render(<Container as="article">Content</Container>);
    const container = screen.getByTestId("test-id-container-outer-root");
    expect(container.tagName).toBe("ARTICLE");
  });
});
```

#### **6. Ref Forwarding Tests**

**For `@packages/` components only**: Ref forwarding tests are REQUIRED.

**For `@apps/` components (web, admin, API)**: Ref forwarding tests are NOT REQUIRED and should be REMOVED (refs work via props spread in React 19).

- ✅ For `@packages/`: Forwards ref correctly
- ✅ For `@packages/`: Ref points to correct element
- ❌ For `@apps/`: Do not write ref forwarding tests

#### **7. Accessibility Tests**

- ✅ Proper semantic structure
- ✅ Correct data attributes for debugging

#### **8. ARIA Attributes Testing (Required)**

- ✅ Test ARIA roles are correctly applied (`role="main"`, `role="region"`, `role="article"`, etc.)
- ✅ Test ARIA relationships (`aria-labelledby`, `aria-describedby`)
- ✅ Test unique IDs for ARIA relationships
- ✅ Test descriptive labels (`aria-label` attributes)
- ✅ Test decorative element handling (`aria-hidden="true"`)
- ✅ Test heading structure (`aria-level` attributes)
- ✅ Test conditional ARIA attributes (when content is missing)
- ✅ Test ARIA landmark structure for navigation
- ✅ Test ARIA attributes with different internal IDs
- ✅ Test ARIA attributes during component updates

### Test File Structure

#### **For `@apps/` Components**

```typescript
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ComponentName } from "../ComponentName";

// Mock dependencies (NO setDisplayName for @apps/)
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn(
    (componentId, componentType, isDebugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${componentId}-${componentType}`,
      "data-debug-mode": isDebugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] ||
        `${componentId}-${componentType}-root`,
      ...additionalProps,
    })
  ),
  // NO setDisplayName - not used in @apps/ components
}));

vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../ComponentName.module.css", () => ({
  default: { componentName: "componentName" },
}));

describe("ComponentName", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    // Test cases...
  });

  describe("Content Validation", () => {
    // Test cases...
  });

  describe("Polymorphic Element Types", () => {
    // Test cases for components with `as` prop...
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main layout elements", () => {
      render(<ComponentName internalId="aria-test" />);

      // Test main content area
      const mainElement = screen.getByRole("main");
      expect(mainElement).toHaveAttribute("aria-label", "Component content");

      // Test article region
      const regionElement = screen.getByRole("region", { name: "Component layout" });
      expect(regionElement).toBeInTheDocument();

      // Test article element
      const articleElement = screen.getByRole("article");
      expect(articleElement).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      render(<ComponentName internalId="aria-test" />);

      const articleElement = screen.getByRole("article");

      // Article should be labelled by the title
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "aria-test-component-title"
      );

      // Article should be described by the date
      expect(articleElement).toHaveAttribute(
        "aria-describedby",
        "aria-test-component-date"
      );
    });

    it("applies unique IDs for ARIA relationships", () => {
      render(<ComponentName internalId="aria-test" />);

      // Title should have unique ID
      const titleElement = screen.getByRole("heading", { level: 1 });
      expect(titleElement).toHaveAttribute("id", "aria-test-component-title");

      // Date should have unique ID
      const dateElement = screen.getByText("Formatted Date").closest("time");
      expect(dateElement).toHaveAttribute("id", "aria-test-component-date");
    });

    it("applies correct ARIA labels to content elements", () => {
      render(<ComponentName internalId="aria-test" />);

      // Date element should have descriptive label
      const dateElement = screen.getByText("Formatted Date").closest("time");
      expect(dateElement).toHaveAttribute(
        "aria-label",
        "Published on Formatted Date"
      );
    });

    it("hides decorative elements from screen readers", () => {
      render(<ComponentName internalId="aria-test" />);

      const dateElement = screen.getByText("Formatted Date").closest("time");
      const separatorElement = dateElement?.querySelector("span:first-child");

      // Date separator should be hidden from screen readers
      expect(separatorElement).toHaveAttribute("aria-hidden", "true");
    });

    it("handles ARIA attributes when content is missing", () => {
      const componentWithoutTitle = { ...mockData, title: "" };
      render(<ComponentName data={componentWithoutTitle} internalId="aria-test" />);

      const articleElement = screen.getByRole("article");

      // Should not have aria-labelledby when title is missing
      expect(articleElement).not.toHaveAttribute("aria-labelledby");
    });
  });

  // Additional test categories...
  // NOTE: NO ref forwarding tests for @apps/ components
});
```

#### **For `@packages/` Components**

```typescript
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ComponentName } from "../ComponentName";

// Mock dependencies (setDisplayName REQUIRED for @packages/)
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }), // REQUIRED for @packages/ components
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
}));

vi.mock("../ComponentName.module.css", () => ({
  default: { componentName: "componentName" },
}));

describe("ComponentName", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    // Test cases...
  });

  describe("Content Validation", () => {
    // Test cases...
  });

  describe("Ref Forwarding", () => {
    // REQUIRED for @packages/ components
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ComponentName ref={ref}>Content</ComponentName>);
      expect(ref.current).toBeInTheDocument();
    });
  });

  describe("ARIA Attributes Testing", () => {

### Mocking Standards

#### **Required Mocks for `@apps/` Components**

```typescript
// ✅ CORRECT: @apps/ component mocks
// NO useComponentId mock - not used in @apps/ components
// NO createComponentProps mock - not used in @apps/ components

// Mock utility functions (only what's actually used)
vi.mock("@guyromellemagayano/utils", () => ({
  isValidLink: vi.fn((href) => {
    return href && href !== "" && href !== "#";
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (target === "_blank" && href?.startsWith("http")) {
      return { rel: "noopener noreferrer", target };
    }
    return { target };
  }),
  // NO setDisplayName - not used in @apps/ components
  // NO createComponentProps - not used in @apps/ components
  // NO useComponentId - not used in @apps/ components
}));

// Mock utils with correct import path (match actual imports)
vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock CSS modules (if component uses CSS modules)
vi.mock("../ComponentName.module.css", () => ({
  default: { componentName: "componentName" },
}));
```

#### **Required Mocks for `@packages/` Components**

```typescript
// ✅ CORRECT: @packages/ component mocks
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

// Mock utility functions (setDisplayName REQUIRED for @packages/)
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
  }), // REQUIRED for @packages/ components
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
}));

// Mock CSS modules
vi.mock("../ComponentName.module.css", () => ({
  default: { componentName: "componentName" },
}));
```

#### **Component-Specific Mocks**

- **Next.js Components**: Mock `next/link`, `next/image`, `next/navigation`
- **External Libraries**: Mock `@headlessui/react`, `react-intersection-observer`
- **Internal Components**: Mock sibling components and sub-components
- **CSS Modules**: Always mock with consistent naming pattern

### Test Query Standards

#### **Preferred Query Methods (in order)**

1. **`getByRole`** - Most accessible, user-focused, **REQUIRED for ARIA testing**
2. **`getByLabelText`** - For form elements
3. **`getByPlaceholderText`** - For inputs
4. **`getByText`** - For text content
5. **`getByDisplayValue`** - For form values
6. **`getByTestId`** - Last resort, use with `data-testid`

#### **ARIA-Specific Query Patterns**

```typescript
// Test ARIA roles
const mainElement = screen.getByRole("main");
const articleElement = screen.getByRole("article");
const buttonElement = screen.getByRole("button", { name: /go back/i });

// Test ARIA landmarks
const regionElement = screen.getByRole("region", { name: "Article layout" });
const bannerElement = screen.getByRole("banner");

// Test ARIA relationships
const articleElement = screen.getByRole("article");
expect(articleElement).toHaveAttribute("aria-labelledby", "article-title");

// Test ARIA states
const expandedElement = screen.getByRole("button", { expanded: true });
const selectedElement = screen.getByRole("option", { selected: true });
```

#### **Avoid These Queries**

- ❌ `getByClassName` - Brittle, implementation detail
- ❌ `getById` - Not user-focused (except for ARIA relationship testing)
- ❌ `querySelector` - Too generic, bypasses RTL benefits
- ❌ `getByTestId` for ARIA testing - Use `getByRole` instead

### Test Data Attributes

#### **Standard Test IDs**

```typescript
// Component root elements
data-testid="${id}-${componentType}-root"

// Examples:
data-testid="test-id-card-root"
data-testid="test-id-header-root"
data-testid="test-id-footer-root"
```

#### **Debug Attributes**

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

### Integration Test Standards

#### **Compound Component Testing**

```typescript
describe("Integration Tests", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Component with Sub-components", () => {
    it("renders Component with all sub-components", () => {
      render(
        <Component>
          <Component.SubComponent>Sub content</Component.SubComponent>
          <Component.AnotherSub>Another content</Component.AnotherSub>
        </Component>
      );

      expect(screen.getByText("Sub content")).toBeInTheDocument();
      expect(screen.getByText("Another content")).toBeInTheDocument();
    });
  });
});
```

### Performance Testing

#### **Memoization Tests**

```typescript
describe("Memoization", () => {
  it("renders with memoization when isMemoized is true", () => {
    render(<Component isMemoized={true}>Content</Component>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("does not memoize when isMemoized is false", () => {
    const { rerender } = render(<Component isMemoized={false}>Content</Component>);

    rerender(<Component isMemoized={false}>Different content</Component>);
    expect(screen.getByText("Different content")).toBeInTheDocument();
  });
});
```

### Error Handling Tests

#### **Edge Cases**

```typescript
describe("Edge Cases", () => {
  it("handles complex children content", () => {
    render(
      <Component>
        <span>Complex</span> <strong>content</strong>
      </Component>
    );

    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("handles special characters", () => {
    render(<Component>Special chars: &lt;&gt;&amp;</Component>);
    expect(screen.getByText(/Special chars:/)).toBeInTheDocument();
  });
});
```

## Web App Specific Patterns (Sanity CMS)

### Sanity CMS Integration Standards

- **GROQ Queries**: Always use GROQ for data fetching, never GraphQL
- **Query Organization**: Place all GROQ queries in `_queries/` folder
- **Type Safety**: Generate TypeScript types from Sanity schemas
- **Data Fetching**: Use `next-sanity` client for server-side rendering
- **Client-Side**: Use `@sanity/client` for client-side data fetching
- **Image Optimization**: Use `next-sanity/image` for optimized images
- **Preview Mode**: Implement draft content preview for editors

### Sanity Component Structure

For components that fetch Sanity data:

**Component Folder Naming Convention**: Use **kebab-case** for component folder names (e.g., `article`, `card-title`, `list-item`), with **PascalCase** for component file names (e.g., `Article.tsx`, `CardTitle.tsx`, `ListItem.tsx`). This pattern applies to all components in `apps/` and `packages/` folders.

```bash
components/component-name/
├── ComponentName.tsx          # Main component (PascalCase file)
├── index.ts                   # Public exports
├── __tests__/
│   ├── ComponentName.test.tsx
│   └── ComponentName.integration.test.tsx
├── _types/                    # Sanity types + component interfaces
│   ├── index.ts
│   ├── ComponentName.types.ts     # Component props + Sanity document types
│   └── Sanity.types.ts        # Generated Sanity schema types
├── _queries/                  # GROQ queries
│   ├── index.ts
│   ├── ComponentName.queries.ts   # Main GROQ queries
│   ├── ComponentName.fragments.ts # Reusable GROQ fragments
│   └── ComponentName.mutations.ts # Sanity mutations (if needed)
├── _data/                     # Static data
│   ├── index.ts
│   ├── ComponentName.data.ts      # Constants, defaults
│   └── ComponentName.i18n.ts      # Labels
└── _internal/                 # Sub-components (if compound)
    ├── index.ts
    └── sub-component/         # Kebab-case folder
        └── SubComponent.tsx   # PascalCase file
```

### GROQ Query Patterns

```typescript
// _queries/Article.queries.ts
export const ARTICLE_QUERY = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  content,
  author->{
    name,
    image
  },
  mainImage {
    asset->{
      url,
      metadata
    }
  }
}`;

export const ARTICLES_LIST_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage {
    asset->{
      url
    }
  }
}`;
```

### Sanity Type Generation

```typescript
// _types/Sanity.types.ts
export interface SanityArticle {
  _id: string;
  _type: "article";
  title: string;
  slug: { current: string };
  publishedAt: string;
  content: any[]; // Portable Text
  author: SanityAuthor;
  mainImage: SanityImage;
}

export interface SanityAuthor {
  _id: string;
  name: string;
  image: SanityImage;
}
```

### Data Fetching Patterns

```typescript
// Component.tsx
import { sanityClient } from "@web/lib/sanity";
import { ARTICLE_QUERY } from "./_queries/Article.queries";

export async function getArticle(slug: string) {
  return await sanityClient.fetch(ARTICLE_QUERY, { slug });
}

// For client-side fetching with React Query
import { useQuery } from "@tanstack/react-query";

export function useArticle(slug: string, preview: boolean = false) {
  return useQuery({
    queryKey: ["article", slug, preview],
    queryFn: () => getArticle(slug, preview),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!slug,
  });
}

// For real-time updates with Sanity
import { useDocument } from "@sanity/react-hooks";

export function useArticleRealtime(slug: string) {
  return useDocument({
    query: ARTICLE_QUERY,
    params: { slug },
    options: { enabled: !!slug },
  });
}
```

### Performance Optimization Patterns

```typescript
// Memoized components with proper dependencies
const MemoizedArticle = React.memo(Article, (prevProps, nextProps) => {
  return (
    prevProps.article._id === nextProps.article._id &&
    prevProps.article.updatedAt === nextProps.article.updatedAt
  );
});

// Optimized data processing
const processedArticle = useMemo(() => {
  return {
    ...article,
    formattedDate: formatDateSafely(article.publishedAt),
    slug: article.slug.current,
  };
}, [article.publishedAt, article.slug.current]);

// Optimized event handlers
const handleClick = useCallback((event: React.MouseEvent) => {
  // Handle click
}, [article.slug]);
```

### Error Handling Patterns

```typescript
// Error boundary for article components
export class ArticleErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logger.error("Article component error:", { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <ArticleErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Loading and error states
export function useArticleWithStates(slug: string) {
  const { data: article, isLoading, error } = useArticle(slug);

  if (isLoading) return { article: null, loading: true, error: null };
  if (error) return { article: null, loading: false, error };
  return { article, loading: false, error: null };
}
```

### SEO and Meta Management

```typescript
// SEO optimization for articles
export function useArticleSEO(article: SanityArticle) {
  useEffect(() => {
    if (!article) return;

    // Update document title
    document.title = `${article.title} | Your Site`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && article.excerpt) {
      metaDescription.setAttribute('content', article.excerpt);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', article.title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && article.excerpt) {
      ogDescription.setAttribute('content', article.excerpt);
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${window.location.origin}/articles/${article.slug.current}`);
    }
  }, [article]);
}
```

## Advanced Component Architecture Patterns

### Component Composition Best Practices

```typescript
// Compound component pattern with proper typing
export interface ArticleCompoundComponent extends React.FC<ArticleProps> {
  Title: typeof ArticleTitle;
  Content: typeof ArticleContent;
  Meta: typeof ArticleMeta;
  Actions: typeof ArticleActions;
}

// Higher-order component for common functionality
export function withArticleData<P extends object>(
  Component: React.ComponentType<P & { article: SanityArticle }>
) {
  return function WrappedComponent(props: P & { slug: string }) {
    const { data: article, isLoading, error } = useArticle(props.slug);

    if (isLoading) return <ArticleSkeleton />;
    if (error) return <ArticleError error={error} />;
    if (!article) return <ArticleNotFound />;

    return <Component {...props} article={article} />;
  };
}

// Render prop pattern for flexible data handling
export function ArticleDataProvider({
  slug,
  children
}: {
  slug: string;
  children: (data: ArticleDataState) => React.ReactNode;
}) {
  const { data: article, isLoading, error } = useArticle(slug);

  return children({ article, isLoading, error });
}
```

### State Management Patterns

```typescript
// Custom hook for article state management
export function useArticleState(initialArticle?: SanityArticle) {
  const [article, setArticle] = useState<SanityArticle | null>(initialArticle || null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const updateArticle = useCallback((updates: Partial<SanityArticle>) => {
    setArticle(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  const resetArticle = useCallback(() => {
    setArticle(initialArticle || null);
    setIsEditing(false);
  }, [initialArticle]);

  return {
    article,
    isEditing,
    isPreview,
    setArticle,
    setIsEditing,
    setIsPreview,
    updateArticle,
    resetArticle,
  };
}

// Context for article data sharing
export const ArticleContext = createContext<ArticleContextValue | null>(null);

export function ArticleProvider({
  children,
  article
}: {
  children: React.ReactNode;
  article: SanityArticle;
}) {
  const value = useArticleState(article);

  return (
    <ArticleContext.Provider value={value}>
      {children}
    </ArticleContext.Provider>
  );
}
```

### Advanced TypeScript Patterns

```typescript
// Discriminated unions for different article states
export type ArticleState =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: SanityArticle }
  | { status: 'not-found' };

// Generic component props with constraints
export interface ArticleComponentProps<T extends SanityArticle = SanityArticle> {
  article: T;
  variant?: 'default' | 'compact' | 'featured';
  onAction?: (action: ArticleAction, data: T) => void;
}

// Utility types for component composition
export type ArticleComponentRef = React.RefObject<HTMLElement>;
export type ArticleEventHandler<T = void> = (data: T) => void;
export type ArticleAsyncHandler<T = void> = (data: T) => Promise<void>;

// Conditional types for dynamic props
export type ArticlePropsWithActions<T extends boolean = false> =
  T extends true
    ? ArticleComponentProps & { actions: ArticleAction[] }
    : ArticleComponentProps;
```

### Performance Optimization Standards

```typescript
// Virtual scrolling for large article lists
export function VirtualizedArticleList({
  articles
}: {
  articles: SanityArticleListItem[];
}) {
  const [containerRef, { width, height }] = useResizeObserver();

  const virtualizer = useVirtualizer({
    count: articles.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });

  return (
    <div ref={containerRef} style={{ height, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: virtualItem.size,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <ArticleListItem article={articles[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Intersection observer for lazy loading
export function useArticleVisibility(ref: React.RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}
```

## Industry Standards & Compliance

### Standards Compliance Checklist

**Accessibility**:

- ✅ WCAG 2.1 Level AA compliance (target AAA where feasible)
- ✅ W3C ARIA Authoring Practices compliance
- ✅ Semantic HTML5 usage
- ✅ Screen reader testing (NVDA, JAWS, VoiceOver)

**SEO**:

- ✅ Semantic HTML5 structure (article, section, time, etc.)
- ✅ Flexible heading hierarchy (h1-h6 support)
- ✅ Descriptive link text (prioritize visible text over aria-label)
- ✅ Proper date/time semantics (time element with dateTime)
- ✅ Image optimization (alt text, responsive images, lazy loading)
- ✅ Structured data (JSON-LD schema markup)
- ✅ Core Web Vitals optimization (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- ✅ Meta tags and Open Graph tags
- ✅ Canonical URLs to prevent duplicate content

**Security**:

- ✅ OWASP Top 10 mitigation
- ✅ OWASP ASVS Level 2 compliance
- ✅ Content Security Policy (CSP) implementation
- ✅ Secure headers (HSTS, X-Frame-Options, X-Content-Type-Options)

**Performance**:

- ✅ Core Web Vitals targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- ✅ Lighthouse Performance score > 90
- ✅ Bundle size optimization (code splitting, tree shaking)
- ✅ Image optimization (WebP, lazy loading, responsive images)

**Code Quality**:

- ✅ TypeScript strict mode enabled
- ✅ ESLint with recommended rules + custom rules
- ✅ Prettier for consistent formatting
- ✅ Pre-commit hooks (Husky, lint-staged)

**Testing**:

- ✅ Test coverage: Tier 1 (90%+), Tier 2 (80%+), Tier 3 (60%+)
- ✅ Accessibility testing with axe-core
- ✅ E2E testing for critical user flows
- ✅ Performance testing with Lighthouse CI

**Documentation**:

- ✅ JSDoc for all exported functions (both `@apps/` and `@packages/`)
- ✅ For `@packages/` only: JSDoc for all exported types (concise, one-liner for types). For `@apps/` components (web, admin, API), type documentation is NOT ALLOWED.
- ✅ Component documentation with `@example` when helpful
- ✅ README for each package
- ✅ ADRs for architectural decisions
- ✅ Storybook for UI components
- ✅ Code comments only for non-obvious behavior

### Code Quality Standards

**TypeScript**:

- **Strict Mode**: Always enabled (`strict: true` in tsconfig.JSON)
- **Type Safety**: Use `satisfies` operator, exhaustive switches, `never` checks
- **No `any`**: Use `unknown` with type guards instead
- **Type Co-location**: Keep types close to usage, avoid global type pollution

**ESLint Configuration**:

- Use recommended rulesets: `@typescript-eslint/recommended`, `eslint:recommended`
- Custom rules for component architecture enforcement
- Import organization: `eslint-plugin-import`, `eslint-plugin-simple-import-sort`
- React best practices: `eslint-plugin-react`, `eslint-plugin-react-hooks`

**Prettier Configuration**:

- Consistent formatting across all file types
- Integration with ESLint (`eslint-config-prettier`)
- Pre-commit formatting with `lint-staged`

**Pre-commit Hooks** (Husky):

- Lint staged files
- Format staged files
- Run type checking
- Run tests for changed files (if applicable)

### Performance Benchmarks

**Core Web Vitals Targets**:

- **LCP (Largest Contentful Paint)**: < 2.5 seconds (Good), < 4.0s (Needs Improvement)
- **FID (First Input Delay)**: < 100ms (Good), < 300ms (Needs Improvement)
- **CLS (Cumulative Layout Shift)**: < 0.1 (Good), < 0.25 (Needs Improvement)

**Lighthouse Targets**:

- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

**Bundle Size Targets**:

- Initial JavaScript: < 200KB (gzipped)
- Total JavaScript: < 500KB (gzipped) for above-the-fold content
- Images: WebP format, lazy loading, responsive sizes

**Monitoring**:

- Use Web Vitals API for real user monitoring (RUM)
- Integrate with analytics (Google Analytics, Vercel Analytics)
- Set up alerts for performance regressions

## Enterprise Development Patterns

### Modularity and Reusability

- Design components to be self-contained with clear interfaces
- Extract reusable logic to shared utilities (`@guyromellemagayano/utils`)
- Avoid tight coupling between components
- Use dependency injection for external dependencies

### Security Best Practices

**Reference**: OWASP Top 10, OWASP ASVS (Application Security Verification Standard), Next.js Security Best Practices.

**Core Security Requirements**:

- **Input Validation & Sanitization**:
  - Sanitize all user inputs (client and server-side)
  - Use parameterized queries (GraphQL variables, not string interpolation)
  - Validate data schemas with Zod/Yup before processing
  - Escape user-generated content to prevent XSS attacks

- **Content Security Policy (CSP)**:
  - Implement strict CSP headers in `next.config.js`
  - Use nonce-based CSP for inline scripts when necessary
  - Restrict resource loading to trusted domains only

- **Authentication & Authorization**:
  - Use secure session management (httpOnly cookies, secure flag)
  - Implement proper authorization checks on all protected routes
  - Validate JWT tokens server-side, never trust client-side validation
  - Use CSRF tokens for state-changing operations

- **Data Protection**:
  - Never expose sensitive data in client-side code
  - Use environment variables for secrets (never commit to git)
  - Encrypt sensitive data at rest and in transit (HTTPS/TLS 1.3)
  - Implement rate limiting on API endpoints

- **Secure Defaults**:
  - Use `rel="noopener noreferrer"` for external links
  - Set secure cookie flags (`Secure`, `HttpOnly`, `SameSite`)
  - Disable unnecessary HTTP methods (HEAD, OPTIONS if not needed)
  - Use Subresource Integrity (SRI) for external scripts

- **Dependency Security**:
  - Regularly update dependencies (`pnpm audit`, Dependabot)
  - Review and audit third-party packages before integration
  - Use lock files to prevent supply chain attacks
  - Scan for known vulnerabilities in CI/CD pipeline

**OWASP Top 10 Compliance**:

- A01:2021 – Broken Access Control → Implement proper authorization
- A02:2021 – Cryptographic Failures → Use strong encryption, secure defaults
- A03:2021 – Injection → Parameterized queries, input validation
- A04:2021 – Insecure Design → Security by design, threat modeling
- A05:2021 – Security Misconfiguration → Secure defaults, CSP headers
- A06:2021 – Vulnerable Components → Dependency scanning, updates
- A07:2021 – Authentication Failures → Secure session management
- A08:2021 – Software and Data Integrity → SRI, secure supply chain
- A09:2021 – Security Logging Failures → Structured logging, monitoring
- A10:2021 – Server-Side Request Forgery (SSRF) → Validate URLs, use allowlists

### Performance Optimization

**Reference**: See `.cursor/rules/performance.mdc` for comprehensive Vercel React Best Practices (45 rules across 8 priority categories).

**Key Patterns**:

- **Eliminating Waterfalls** (CRITICAL): Use `Promise.all()` for independent operations, defer await until needed, use Suspense boundaries
- **Bundle Size** (CRITICAL): Avoid barrel imports, use `next/dynamic` for heavy components, load third-party scripts after hydration
- **Server-Side** (HIGH): Use `React.cache()` for per-request deduplication, minimize data passed to client components, parallelize fetches
- **Client-Side** (MEDIUM-HIGH): Use SWR for request deduplication, deduplicate global event listeners
- **Re-render** (MEDIUM): Extract expensive work into memoized components, use primitive dependencies, subscribe to derived booleans
- **Rendering** (MEDIUM): Use `content-visibility` for long lists, hoist static JSX, use ternary not `&&` for conditionals
- **JavaScript** (LOW-MEDIUM): Use Set/Map for O(1) lookups, cache property access in loops, batch DOM/CSS changes
- **Advanced** (LOW): Store event handlers in refs, use `useLatest` for stable callbacks

**General Guidelines**:

- Lazy load non-critical components
- Memoize expensive computations
- Use React.memo for pure components in lists
- Implement virtual scrolling for large lists (>100 items)
- Optimize images (next/image with proper sizing)
- Code-split by route

**Full Reference**: See `.cursor/skills/vercel-react-best-practices/` for detailed rule explanations and code examples.

### Accessibility Requirements

**Reference**: See `.cursor/rules/accessibility.mdc` for comprehensive ARIA implementation standards.

**WCAG 2.1 Compliance** (Target: Level AA, Strive for AAA where feasible):

- **Perceivable**:
  - All images: descriptive alt text (empty alt for decorative images)
  - Color contrast: WCAG AA minimum (4.5:1 for text, 3:1 for UI components)
  - Text alternatives for non-text content (audio, video transcripts)
  - Responsive design: content readable at 200% zoom without horizontal scrolling

- **Operable**:
  - All interactive elements: keyboard accessible (Tab, Enter, Space, Arrow keys)
  - Focus indicators: visible and consistent (minimum 2px outline)
  - No keyboard traps: users can navigate away from all components
  - Sufficient time: no time limits, or user can extend/adjust
  - Seizure safe: no content flashes more than 3 times per second

- **Understandable**:
  - All forms: labels and validation messages (use `aria-describedby` for errors)
  - Language declared: use `lang` attribute on HTML element
  - Consistent navigation: predictable UI patterns
  - Error identification: clear error messages with suggestions

- **Robust**:
  - Valid HTML: semantic markup, proper nesting
  - ARIA attributes: correct usage, no redundant roles
  - Screen reader compatibility: test with NVDA, JAWS, VoiceOver
  - Future-proof: use semantic HTML5 elements

**Testing Requirements**:

- Automated: Use `@axe-core/react` in tests (see `.cursor/rules/accessibility.mdc`)
- Manual: Keyboard navigation testing, screen reader testing
- Tools: Lighthouse accessibility audit, WAVE, axe DevTools
- Continuous: Include accessibility checks in CI/CD pipeline

**Web Design Guidelines**: Use `.cursor/skills/web-design-guidelines/` skill to review UI code for Web Interface Guidelines compliance. Fetch latest guidelines from: `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`

### Documentation Standards

**Industry Best Practices**:

- **JSDoc**: All exported functions and components (follow TypeScript JSDoc standards). For `@packages/` only: All exported types must have JSDoc comments. For `@apps/` components (web, admin, API), type documentation is NOT ALLOWED.
- **README**: Each package in monorepo with usage examples, API documentation
- **Inline comments**: Complex logic only (not obvious code), explain "why" not "what"
- **Storybook**: All reusable UI components with interactive examples and accessibility notes
- **ADRs**: Architectural decisions in `docs/adr/` (follow MADR format)
- **API Documentation**: OpenAPI/Swagger for REST APIs, GraphQL schema documentation
- **CHANGELOG**: Keep CHANGELOG.md following Keep a CHANGELOG format
- **Contributing Guide**: CONTRIBUTING.md with setup, testing, and PR guidelines

**Documentation Quality**:

- Use clear, concise language
- Include code examples for complex patterns
- Document breaking changes prominently
- Keep documentation in sync with code (automated checks where possible)

## Component Composition Patterns

### Main Component Pattern

**For `@apps/` components (web, admin, API):**

```typescript
import React from "react";
import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { cn } from "@web/utils";
import styles from "./ComponentName.module.css";
import { COMPONENT_I18N } from "./constants/Component.i18n";

export interface ComponentNameProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}

export type ComponentNameComponent = React.FC<ComponentNameProps>;

export function ComponentName(props: ComponentNameProps) {
  const {
    as: Component = "div",
    children,
    className,
    internalId,
    debugMode,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...rest}
      id={`${componentId}-component-name`}
      className={cn(styles.componentName, className)}
      data-component-name-id={componentId}
      data-debug-mode={isDebugMode ? "true" : undefined}
      data-testid={`${componentId}-component-name-root`}
    >
      {children}
    </Component>
  );
}

ComponentName.displayName = "ComponentName"; // Optional
```

**For `@packages/` components:**

```typescript
import React from "react";
import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { setDisplayName } from "@guyromellemagayano/utils";
import { cn } from "@web/utils";
import styles from "./ComponentName.module.css";
import { COMPONENT_I18N } from "./constants/Component.i18n";

// ============================================================================
// COMPONENT TYPES & INTERFACES
// ============================================================================

/** `ComponentName` component props. */
export interface ComponentNameProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}

/** `ComponentName` component type. */
export type ComponentNameComponent = React.FC<ComponentNameProps>;

// ============================================================================
// BASE COMPONENT
// ============================================================================

/** A flexible component for [purpose]. */
const BaseComponentName: ComponentNameComponent = setDisplayName(
  React.forwardRef<HTMLDivElement, ComponentNameProps>(
    function BaseComponentName(props, ref) {
      const {
        as: Component = "div",
        children,
        className,
        internalId,
        debugMode,
        ...rest
      } = props;

      const { componentId, isDebugMode } = useComponentId({
        internalId,
        debugMode,
      });

      if (!children) return null;

      const element = (
        <Component
          {...rest}
          ref={ref}
          id={`${componentId}-component-name`}
          className={cn(styles.componentName, className)}
          data-component-name-id={componentId}
          data-debug-mode={isDebugMode ? "true" : undefined}
          data-testid={`${componentId}-component-name-root`}
        >
          {children}
        </Component>
      );

      return element;
    }
  )
);

// ============================================================================
// MEMOIZED COMPONENT
// ============================================================================

/** A memoized component. */
const MemoizedComponentName = React.memo(BaseComponentName);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/** [Component description]. */
export const ComponentName: ComponentNameComponent = setDisplayName(
  function ComponentName(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedComponentName : BaseComponentName;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
```

### Sub-Component Pattern

**For `@apps/` components (web, admin, API):**

```typescript
import React from "react";
import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { hasMeaningfulText } from "@guyromellemagayano/utils";
import { cn } from "@web/utils";
import styles from "./SubComponent.module.css";

export interface SubComponentProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {
  customProp?: string;
}

export type SubComponentComponent = React.FC<SubComponentProps>;

export function SubComponent(props: SubComponentProps) {
  const {
    as: Component = "div",
    children,
    className,
    internalId,
    debugMode,
    customProp,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  if (!hasMeaningfulText(customProp)) return null;

  return (
    <Component
      {...rest}
      id={`${componentId}-sub-component`}
      className={cn(styles.subComponent, className)}
      data-sub-component-id={componentId}
      data-debug-mode={isDebugMode ? "true" : undefined}
      data-testid={`${componentId}-sub-component-root`}
    >
      {children}
    </Component>
  );
}

SubComponent.displayName = "SubComponent"; // Optional
```

**For `@packages/` components:**

```typescript
import React from "react";
import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { setDisplayName, hasMeaningfulText } from "@guyromellemagayano/utils";
import { cn } from "@web/utils";
import styles from "./SubComponent.module.css";

// ============================================================================
// SUB-COMPONENT TYPES & INTERFACES
// ============================================================================

/** `SubComponent` component props. */
export interface SubComponentProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {
  /** Sub-component specific prop */
  customProp?: string;
}

/** `SubComponent` component type. */
export type SubComponentComponent = React.FC<SubComponentProps>;

// ============================================================================
// SUB-COMPONENT
// ============================================================================

/** A sub-component for specific functionality. */
export const SubComponent: SubComponentComponent = setDisplayName(
  React.forwardRef<HTMLDivElement, SubComponentProps>(
    function SubComponent(props, ref) {
      const {
        as: Component = "div",
        children,
        className,
        internalId,
        debugMode,
        customProp,
        ...rest
      } = props;

      const { componentId, isDebugMode } = useComponentId({
        internalId,
        debugMode,
      });

      if (!hasMeaningfulText(customProp)) return null;

      const element = (
        <Component
          {...rest}
          ref={ref}
          id={`${componentId}-sub-component`}
          className={cn(styles.subComponent, className)}
          data-sub-component-id={componentId}
          data-debug-mode={isDebugMode ? "true" : undefined}
          data-testid={`${componentId}-sub-component-root`}
        >
          {children}
        </Component>
      );

      return element;
    }
  )
);
```

## Output Style

- Start with the code or the command. Then a short rationale. Then optional extras (tests, migrations, follow-ups).
- For code edits: show minimal context (a few lines before/after). Do not paste entire files unless rewriting end-to-end.
- Prefer unified diffs (---/+++ with @@) for multi-file changes; otherwise filename-scoped fenced blocks.
- Keep explanations compact: bullets > paragraphs; include trade-offs.

## Command Policy (no interactive tools assumed)

- Use plain shell commands. Assume pnpm workspaces + Turborepo.
- Prefer workspace-aware invocations:
  - Run all tests:            `pnpm -w -r test`
  - Type-check all:           `pnpm -w -r typecheck`  # fall back to `pnpm -w tsc -b` if missing
  - Lint all:                 `pnpm -w -r lint`
  - Build all via turbo:      `pnpm -w turbo run build`
  - Dev targets (per app):
    - web (Next.js):          `pnpm --filter ./apps/web dev`
    - admin (Vite):           `pnpm --filter ./apps/admin dev`
    - API (Node/Express):     `pnpm --filter ./apps/api dev`
  - Scoped operations:
    - components pkg tests:   `pnpm --filter ./packages/components test`
    - utils pkg tests:        `pnpm --filter ./packages/utils test`
    - logger pkg tests:       `pnpm --filter ./packages/logger test`
- If a script is missing, show the exact `package.json` diff to add it (root or package-level).
- Avoid interactive prompts; add flags (e.g., `-y`, `--yes`, `--force`) where safe and relevant.

## Project Defaults & Assumptions (tailored to this repo)

- Monorepo layout:
  - Apps: `./apps/web` (Next.js), `./apps/admin` (Vite), `./apps/api` (Node/Express).
  - Packages: `./packages/{components,ui,utils,hooks,logger,config-eslint,config-typescript,vitest-presets}`.
- Testing: Vitest everywhere; use `vitest-presets/{browser,node,react}` when applicable.
- TypeScript: strict; prefer `satisfies`, exhaustive switches, and `never` checks; keep ambient types in `global.d.ts` minimal.
- React: function components, hooks, RSC where applicable (Next 13+), suspense-ready, a11y-first.
- Styling: Tailwind + CSS Modules; use `cn/clsx` helper; no global leaks.
- API: Express handlers typed; schema validation with Zod; error boundaries and structured logs.
- CI: GitHub Actions with turbo cache keys (lockfile + turbo.JSON + tsconfig); run per-package tests in parallel matrices.

## When I Say…

- "fix `<issue>`": provide a minimal diff/patch + why it broke + tests that prove the fix.
- "explain `<code|error>`": show the corrected snippet first, then a crisp explanation with root-cause and prevention.
- "refactor `<file|module>`": show the new API/signature + usage examples + migration steps + tests.
- "add tests for `<X>`": add focused unit/integration tests with clear Arrange/Act/Assert; show how to run them.
- "perf"/"profile"/"optimize": show measurable change (bench/test), note complexity/space trade-offs, and regression guards.
- "secure"/"harden": show concrete mitigations (headers, validation, authz boundaries, SSRF/CSRF/CORS) with code.
- "infra"/"pipeline": provide YAML/Terraform/turbo steps; include cache keys, matrix builds, failure gates.

## Editing Protocols

- Prefer diffs:

--- a/apps/web/src/foo.ts
+++ b/apps/web/src/foo.ts
@@

- // old
- export function parse(q) { return JSON.parse(q) }

- // safer parse with zod, preserves comments unless obsolete

- import { z } from "zod";
- const Q = z.string().transform((s) => JSON.parse(s));
- export function parse(q: string) {
- return Q.parse(q);
- }

- Group multi-file diffs by package/app; include necessary config/test updates.
- Don't reformat unrelated code; note if formatter touched lines (and why).

## Testing Defaults

- FE (Next/Vite): Vitest + RTL; mock network with MSW; Playwright/Cypress optional for e2e.
- BE (API): Vitest/Jest; fast, deterministic; cover happy/edge/failure paths.
- Contract checks: OpenAPI/GraphQL schema tests if relevant.
- Perf claims must include a repro script or benchmark.

## Docs & ADR Nudge

- If a decision impacts architecture, include a 1-minute ADR stub (Title, Context, Decision, Consequences).
- Update README/Storybook MDX only when public APIs change.

## Migrations & Data

- Show SQL/Prisma/Knex/Django migration steps as needed; prefer backward/forward-compatible sequences.
- For destructive ops, require an explicit "ACK" comment in the migration block.

## Error Handling & Telemetry

- Add error boundaries (React), structured logs (backend), and Sentry hooks on risky paths.
- Provide sample dashboards/alerts only when crucial and non-obvious.

## Speculation & Contrarian Takes

- Boldly suggest improvements outside the ask if ROI is high. Tag speculative items as:
  [Speculation] `<one-liner why it might be worth it>` (+ code if a small POC helps)

## Security Notes

- Only raise security when non-obvious and critical; include exact code/config to fix.
- Examples: authz checks on new endpoints, input validation, SSRF on fetch/proxy, CSRF on mutating routes, CORS least-privilege.

## Source Citations

- If external sources meaningfully inform the answer, add a short "Sources:" list at the end (no inline citations). Otherwise omit.

## If Blocked by Policy

- First: give the closest acceptable answer first; then explain the policy—and only then.

## Response Templates (use these shapes)

### Template: Code-First Fix

<CODE/DIFF HERE>

Why:

- `<root cause in 1–2 bullets>`
- `<why this fix>`

Tests:

```bash
pnpm -w -r test -- --run
```

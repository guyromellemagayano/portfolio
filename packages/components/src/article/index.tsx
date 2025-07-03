import React, { Suspense, useCallback, useMemo } from "react";

import type { CommonComponentProps } from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const ArticleClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ArticleClient };
});

const MemoizedArticleClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedArticleClient };
});

export type ArticleRef = React.ComponentRef<"article">;

export interface ArticleProps
  extends React.HTMLAttributes<HTMLElement>,
    CommonComponentProps {
  /** Whether the article should be featured/highlighted */
  featured?: boolean;
  /** Whether the article is a summary/excerpt */
  summary?: boolean;
  /** Analytics identifier for tracking */
  analyticsId?: string;
  /** Custom analytics function */
  onAnalytics?: (data: {
    event: string;
    category: string;
    label: string;
    content: string;
  }) => void;
  /** Support for data attributes commonly used in testing */
  [key: `data-${string}`]: string | undefined;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Validate if the article has proper semantic structure
 * @param element - The article element or children to validate
 * @returns boolean indicating if structure is valid
 */
function validateArticleStructure(element: React.ReactNode): boolean {
  // Basic validation - in a real implementation, this could check for
  // required elements like headings, content sections, etc.
  return element != null && element !== "";
}

/**
 * Extract text content from article for analytics
 * @param children - The article children/content
 * @returns string representation of the content
 */
function extractArticleContent(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children;
  }
  if (typeof children === "number") {
    return children.toString();
  }
  if (React.isValidElement(children)) {
    // For React elements, try to extract text content
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childrenProp = (children.props as any)?.children;
    return childrenProp ? extractArticleContent(childrenProp) : "";
  }
  if (Array.isArray(children)) {
    return children.map(extractArticleContent).join(" ");
  }
  return "";
}

/**
 * Generate article reading time estimate
 * @param content - The article content
 * @param wordsPerMinute - Average reading speed (default: 200 wpm)
 * @returns estimated reading time in minutes
 */
function calculateReadingTime(content: string, wordsPerMinute = 200): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// =============================================================================
// ANALYTICS FUNCTIONS
// =============================================================================

/**
 * Fire analytics tracking for article interactions
 * @param analyticsId - The analytics identifier
 * @param event - The event data
 * @param content - The article content
 */
function fireArticleAnalytics(
  analyticsId: string,
  event: React.MouseEvent<HTMLElement>,
  content: string
): void {
  try {
    // Google Analytics implementation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", "click", {
        event_category: "article",
        event_label: analyticsId,
        article_content: content.substring(0, 100), // First 100 chars
        reading_time: calculateReadingTime(content),
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Analytics tracking failed:", error);
    }
  }
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * Universal article component with semantic structure, analytics, and accessibility.
 * Supports server-side and client-side rendering with enhanced features.
 */
const ArticleComponent = React.forwardRef<ArticleRef, ArticleProps>(
  (props, ref) => {
    const {
      featured = false,
      summary = false,
      analyticsId,
      onAnalytics,
      as: Component = "article",
      isClient = false,
      isMemoized = false,
      children,
      className,
      onClick,
      onMouseEnter,
      onFocus,
      style,
      ...rest
    } = props;

    const asElement = typeof Component === "string" ? Component : "unknown";
    const hasAnalytics = analyticsId || onAnalytics;
    const content = extractArticleContent(children);
    const isValidStructure = validateArticleStructure(children);

    // Event handlers - always use useCallback to maintain hooks order
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        // Only execute analytics if we have analytics setup
        if (hasAnalytics && (analyticsId || onAnalytics)) {
          const analyticsData = {
            event: "click",
            category: "article",
            label: analyticsId || "article-click",
            content,
          };

          if (onAnalytics) {
            onAnalytics(analyticsData);
          } else if (analyticsId) {
            fireArticleAnalytics(analyticsId, event, content);
          }
        }
        onClick?.(event);
      },
      [hasAnalytics, analyticsId, onAnalytics, content, onClick]
    );

    // Props with accessibility and semantic structure
    const enhancedProps = useMemo(
      () => ({
        ...rest,
        ref,
        className: [
          "article",
          featured && "article--featured",
          summary && "article--summary",
          !isValidStructure && "article--invalid-structure",
          className,
        ]
          .filter(Boolean)
          .join(" "),
        style,
        onClick: handleClick,
        onMouseEnter,
        onFocus,
        "data-featured": featured ? "true" : undefined,
        "data-summary": summary ? "true" : undefined,
        "data-analytics-id": analyticsId || undefined,
        "data-reading-time": calculateReadingTime(content || ""),
        "data-valid-structure": isValidStructure ? "true" : "false",
        "data-polymorphic-element":
          asElement !== "article" ? asElement : undefined,
        // Enhanced accessibility
        "aria-label":
          rest["aria-label"] || (featured ? "Featured article" : undefined),
        role: "article", // Explicit ARIA role
      }),
      [
        rest,
        featured,
        summary,
        isValidStructure,
        className,
        style,
        handleClick,
        onMouseEnter,
        onFocus,
        analyticsId,
        content,
        asElement,
      ]
    );

    // Base element
    const element = <Component {...enhancedProps}>{children}</Component>;

    // Client-side rendering
    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedArticleClient
        : ArticleClient;

      return (
        <Suspense fallback={element}>
          <ClientComponent {...props} ref={ref}>
            {children}
          </ClientComponent>
        </Suspense>
      );
    }

    return element;
  }
);

ArticleComponent.displayName = "Article";

// Export the server component
export const Article = ArticleComponent;

// Utility exports for advanced use cases
// eslint-disable-next-line react-refresh/only-export-components
export const ArticleUtils = {
  validateStructure: validateArticleStructure,
  extractContent: extractArticleContent,
  calculateReadingTime,
};

// For most use cases, the server component is sufficient
// For client-side memoization, use isClient=true with isMemoized=true
export default Article;

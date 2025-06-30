import React, { Suspense, useCallback, useMemo, useState } from "react";

import type { CommonComponentProps } from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const AsideClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AsideClient };
});

const MemoizedAsideClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAsideClient };
});

export type AsideRef = React.ComponentRef<"aside">;

export interface AsideProps
  extends React.HTMLAttributes<HTMLElement>,
    CommonComponentProps {
  /** Position of the aside relative to main content */
  position?: "left" | "right" | "floating" | "sticky";
  /** Type of aside content for semantic understanding */
  contentType?: "navigation" | "complementary" | "banner" | "search" | "form";
  /** Whether the aside can be collapsed/expanded */
  collapsible?: boolean;
  /** Whether the aside is initially collapsed (only applies if collapsible=true) */
  defaultCollapsed?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Whether to show a collapse/expand toggle button */
  showToggle?: boolean;
  /** Custom toggle button content */
  toggleContent?: {
    collapsed: React.ReactNode;
    expanded: React.ReactNode;
  };
  /** Analytics identifier for tracking */
  analyticsId?: string;
  /** Custom analytics function */
  onAnalytics?: (data: {
    event: string;
    category: string;
    label: string;
    action: string;
  }) => void;
  /** Whether the aside should be highlighted */
  highlighted?: boolean;
  /** Support for data attributes commonly used in testing */
  [key: `data-${string}`]: string | undefined;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Validate if the aside has proper semantic content structure
 * @param element - The aside element or children to validate
 * @param contentType - The declared content type
 * @returns boolean indicating if structure is valid
 */
function validateAsideStructure(
  element: React.ReactNode,
  contentType?: string
): boolean {
  if (element == null || element === "") {
    return false;
  }

  // Basic validation - in a real implementation, this could check for
  // appropriate content based on contentType (navigation should have nav elements, etc.)
  if (contentType === "navigation" && typeof element === "string") {
    // Navigation asides should typically contain nav elements or links
    return element.toLowerCase().includes("nav") || element.includes("link");
  }

  return true;
}

/**
 * Extract text content from aside for analytics
 * @param children - The aside children/content
 * @returns string representation of the content
 */
function extractAsideContent(children: React.ReactNode): string {
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
    return childrenProp ? extractAsideContent(childrenProp) : "";
  }
  if (Array.isArray(children)) {
    return children.map(extractAsideContent).join(" ");
  }
  return "";
}

/**
 * Get appropriate ARIA label based on content type and position
 * @param contentType - The content type
 * @param position - The position
 * @param customLabel - Custom aria-label if provided
 * @returns appropriate ARIA label
 */
function getAsideAriaLabel(
  contentType?: string,
  position?: string,
  customLabel?: string
): string | undefined {
  if (customLabel) {
    return customLabel;
  }

  const typeLabels = {
    navigation: "Navigation sidebar",
    complementary: "Complementary content",
    banner: "Banner sidebar",
    search: "Search sidebar",
    form: "Form sidebar",
  };

  const positionLabels = {
    left: "Left sidebar",
    right: "Right sidebar",
    floating: "Floating sidebar",
    sticky: "Sticky sidebar",
  };

  if (contentType && typeLabels[contentType as keyof typeof typeLabels]) {
    return typeLabels[contentType as keyof typeof typeLabels];
  }

  if (position && positionLabels[position as keyof typeof positionLabels]) {
    return positionLabels[position as keyof typeof positionLabels];
  }

  return "Sidebar content";
}

// =============================================================================
// ANALYTICS FUNCTIONS
// =============================================================================

/**
 * Fire analytics tracking for aside interactions
 * @param analyticsId - The analytics identifier
 * @param action - The action performed
 * @param content - The aside content
 */
function fireAsideAnalytics(
  analyticsId: string,
  action: string,
  content: string
): void {
  try {
    // Google Analytics implementation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", action, {
        event_category: "aside",
        event_label: analyticsId,
        aside_content: content.substring(0, 100), // First 100 chars
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
 * Universal aside component with positioning, collapsible functionality, and accessibility.
 * Supports navigation, complementary content, and various layouts.
 */
const AsideComponent = React.forwardRef<AsideRef, AsideProps>((props, ref) => {
  const {
    position = "left",
    contentType = "complementary",
    collapsible = false,
    defaultCollapsed = false,
    collapsed: controlledCollapsed,
    onCollapseChange,
    showToggle = false,
    toggleContent,
    analyticsId,
    onAnalytics,
    highlighted = false,
    as: Component = "aside",
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

  // Collapse state management
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed =
    controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const hasAnalytics = analyticsId || onAnalytics;
  const content = extractAsideContent(children);
  const isValidStructure = validateAsideStructure(children, contentType);

  // Event handlers - always use useCallback to maintain hooks order
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      // Only execute analytics if we have analytics setup
      if (hasAnalytics && (analyticsId || onAnalytics)) {
        const analyticsData = {
          event: "click",
          category: "aside",
          label: analyticsId || "aside-click",
          action: "interact",
        };

        if (onAnalytics) {
          onAnalytics(analyticsData);
        } else if (analyticsId) {
          fireAsideAnalytics(analyticsId, "click", content);
        }
      }
      onClick?.(event);
    },
    [hasAnalytics, analyticsId, onAnalytics, content, onClick]
  );

  const handleToggle = useCallback(() => {
    const newCollapsed = !isCollapsed;

    if (controlledCollapsed === undefined) {
      setInternalCollapsed(newCollapsed);
    }

    onCollapseChange?.(newCollapsed);

    // Analytics for toggle action
    if (hasAnalytics && (analyticsId || onAnalytics)) {
      const action = newCollapsed ? "collapse" : "expand";
      const analyticsData = {
        event: "toggle",
        category: "aside",
        label: analyticsId || "aside-toggle",
        action,
      };

      if (onAnalytics) {
        onAnalytics(analyticsData);
      } else if (analyticsId) {
        fireAsideAnalytics(analyticsId, action, content);
      }
    }
  }, [
    isCollapsed,
    controlledCollapsed,
    onCollapseChange,
    hasAnalytics,
    analyticsId,
    onAnalytics,
    content,
  ]);

  // Props with accessibility and semantic structure
  const enhancedProps = useMemo(
    () => ({
      ...rest,
      ref,
      className: [
        "aside",
        `aside--${position}`,
        `aside--${contentType}`,
        collapsible && "aside--collapsible",
        isCollapsed && "aside--collapsed",
        highlighted && "aside--highlighted",
        !isValidStructure && "aside--invalid-structure",
        className,
      ]
        .filter(Boolean)
        .join(" "),
      style,
      onClick: handleClick,
      onMouseEnter,
      onFocus,
      "data-position": position,
      "data-content-type": contentType,
      "data-collapsible": collapsible ? "true" : undefined,
      "data-collapsed": collapsible ? String(isCollapsed) : undefined,
      "data-highlighted": highlighted ? "true" : undefined,
      "data-analytics-id": analyticsId || undefined,
      "data-valid-structure": isValidStructure ? "true" : "false",
      // Enhanced accessibility
      "aria-label": getAsideAriaLabel(
        contentType,
        position,
        rest["aria-label"]
      ),
      "aria-expanded": collapsible ? String(!isCollapsed) : undefined,
      role: "complementary", // Default ARIA role for aside
    }),
    [
      rest,
      position,
      contentType,
      collapsible,
      isCollapsed,
      highlighted,
      isValidStructure,
      className,
      style,
      handleClick,
      onMouseEnter,
      onFocus,
      analyticsId,
    ]
  );

  // Toggle button component
  const toggleButton = collapsible && showToggle && (
    <button
      type="button"
      className="aside__toggle"
      onClick={handleToggle}
      aria-label={`${isCollapsed ? "Expand" : "Collapse"} sidebar`}
      aria-controls={rest.id}
    >
      {toggleContent
        ? isCollapsed
          ? toggleContent.collapsed
          : toggleContent.expanded
        : isCollapsed
          ? "▶"
          : "◀"}
    </button>
  );

  // Base element with toggle button
  const element = (
    <Component {...enhancedProps}>
      {toggleButton}
      <div className="aside__content">{children}</div>
    </Component>
  );

  // Client-side rendering
  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAsideClient : AsideClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...props} ref={ref}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
});

AsideComponent.displayName = "Aside";

// Export the server component
export const Aside = AsideComponent;

// Utility exports for advanced use cases
// eslint-disable-next-line react-refresh/only-export-components
export const AsideUtils = {
  validateStructure: validateAsideStructure,
  extractContent: extractAsideContent,
  getAriaLabel: getAsideAriaLabel,
};

// For most use cases, the server component is sufficient
// For client-side interactivity, use isClient=true with isMemoized=true
export default Aside;

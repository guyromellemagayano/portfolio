import React, { Suspense, useCallback, useMemo } from "react";

import type { CommonComponentProps } from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const BClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BClient };
});

const MemoizedBClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBClient };
});

export type BRef = React.ComponentRef<"b">;

export interface BProps
  extends React.HTMLAttributes<HTMLElement>,
    CommonComponentProps {
  /** Whether the text should be emphasized beyond normal boldness */
  emphasized?: boolean;
  /** Analytics identifier for tracking */
  analyticsId?: string;
  /** Custom analytics function */
  onAnalytics?: (data: {
    event: string;
    category: string;
    label: string;
    content: string;
  }) => void;
}

// =============================================================================
// ANALYTICS INTEGRATION
// =============================================================================

/**
 * Fires Google Analytics event for text emphasis interactions
 * Gracefully handles missing gtag and provides error logging
 */
function fireAnalytics(
  analyticsId?: string,
  onAnalytics?: BProps["onAnalytics"],
  children?: React.ReactNode,
  event?: React.MouseEvent<HTMLElement>
): void {
  if (!analyticsId && !onAnalytics) return;
  if (!event) return;

  const analyticsData = {
    event: "click",
    category: "text-emphasis",
    label: analyticsId || "b-click",
    content: String(children || ""),
  };

  try {
    if (onAnalytics) {
      onAnalytics(analyticsData);
    } else if (analyticsId && typeof window !== "undefined") {
      // Google Analytics implementation
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gtag = (window as any).gtag;
      if (gtag) {
        gtag("event", "click", {
          event_category: analyticsData.category,
          event_label: analyticsData.label,
          text_content: analyticsData.content,
        });
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Analytics tracking failed:", error);
    }
  }
}

/**
 * Enhanced bring attention to (bold) component with analytics and accessibility support.
 * Provides semantic emphasis for text content that needs visual distinction.
 */
const BComponent = React.forwardRef<BRef, BProps>((props, ref) => {
  const {
    emphasized = false,
    analyticsId,
    onAnalytics,
    as: Component = "b",
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

  // Only compute when needed - avoid unnecessary memoization
  const hasAnalytics = analyticsId || onAnalytics;

  // Analytics click handler - only create when analytics are needed
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (hasAnalytics) {
        fireAnalytics(analyticsId, onAnalytics, children, event);
      }
      onClick?.(event);
    },
    [hasAnalytics, analyticsId, onAnalytics, children, onClick]
  );

  // Props with accessibility and enhanced features
  const enhancedProps = useMemo(
    () => ({
      ...rest,
      ref,
      className: ["b", emphasized && "b--emphasized", className]
        .filter(Boolean)
        .join(" "),
      style,
      onClick: handleClick,
      onMouseEnter,
      onFocus,
      "data-emphasized": emphasized ? "true" : undefined,
      "data-analytics-id": analyticsId || undefined,
    }),
    [
      rest,
      emphasized,
      className,
      style,
      handleClick,
      onMouseEnter,
      onFocus,
      analyticsId,
    ]
  );

  // Create the base element
  const element = <Component {...enhancedProps}>{children}</Component>;

  // Handle client-side rendering
  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBClient : BClient;

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

BComponent.displayName = "B";

// Export the server component
export const B = BComponent;

// For most use cases, the server component is sufficient
// For client-side memoization, use isClient=true with isMemoized=true
export default B;

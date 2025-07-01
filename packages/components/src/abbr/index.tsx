import React, { Suspense, useCallback, useMemo } from "react";

import type { CommonComponentProps } from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const AbbrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AbbrClient };
});

const MemoizedAbbrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAbbrClient };
});

export type AbbrRef = React.ComponentRef<"abbr">;

export interface AbbrProps
  extends React.HTMLAttributes<HTMLElement>,
    CommonComponentProps {
  /** The full form or expansion of the abbreviation */
  title?: string;
  /** Whether to show the title as a tooltip */
  showTooltip?: boolean;
  /** Custom tooltip content (overrides title) */
  tooltip?: string;
  /** Whether the abbreviation should be emphasized */
  emphasized?: boolean;
  /** Analytics identifier for tracking */
  analyticsId?: string;
  /** Custom analytics function */
  onAnalytics?: (data: {
    event: string;
    category: string;
    label: string;
    abbreviation: string;
    expanded: string;
  }) => void;
}

/**
 * Enhanced abbreviation component with accessibility and analytics support.
 * Optimized for performance with minimal re-renders and efficient prop handling.
 */
const AbbrComponent = React.forwardRef<AbbrRef, AbbrProps>((props, ref) => {
  const {
    title,
    showTooltip = true,
    tooltip,
    emphasized = false,
    analyticsId,
    onAnalytics,
    as: Component = "abbr",
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
  const displayTitle = tooltip || title;
  const hasAnalytics = analyticsId || onAnalytics;

  // Optimized click handler - only create when analytics are needed
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (hasAnalytics && (analyticsId || onAnalytics)) {
        const analyticsData = {
          event: "click",
          category: "abbreviation",
          label: analyticsId || "abbr-click",
          abbreviation: String(children || ""),
          expanded: displayTitle || "",
        };

        if (onAnalytics) {
          onAnalytics(analyticsData);
        } else if (analyticsId && typeof window !== "undefined") {
          // Flexible analytics - works with gtag, dataLayer, or custom
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const gtag = (window as any).gtag;
            if (gtag) {
              gtag("event", "click", {
                event_category: analyticsData.category,
                event_label: analyticsData.label,
                abbreviation_text: analyticsData.abbreviation,
                expanded_text: analyticsData.expanded,
              });
            }
          } catch (error) {
            if (process.env.NODE_ENV === "development") {
              console.warn("Analytics tracking failed:", error);
            }
          }
        }
      }
      onClick?.(event);
    },
    [hasAnalytics, analyticsId, onAnalytics, children, displayTitle, onClick]
  );

  // Props with accessibility and enhanced features
  const enhancedProps = useMemo(
    () => ({
      ...rest,
      ref,
      className: ["abbr", emphasized && "abbr--emphasized", className]
        .filter(Boolean)
        .join(" "),
      style,
      onClick: handleClick,
      onMouseEnter,
      onFocus,
      title: showTooltip && displayTitle ? displayTitle : undefined,
      "aria-label": displayTitle || rest["aria-label"],
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
      showTooltip,
      displayTitle,
      analyticsId,
    ]
  );

  // Create the base element
  const element = <Component {...enhancedProps}>{children}</Component>;

  // Handle client-side rendering
  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAbbrClient : AbbrClient;

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

AbbrComponent.displayName = "Abbr";

// Export the server component
export const Abbr = AbbrComponent;

// For most use cases, the server component is sufficient
// For client-side memoization, use isClient=true with isMemoized=true
export default Abbr;

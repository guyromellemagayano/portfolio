import React, { Suspense, useCallback, useMemo } from "react";

import type { CommonComponentProps } from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const BaseClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BaseClient };
});

const MemoizedBaseClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBaseClient };
});

export type BaseRef = React.ComponentRef<"base">;

export interface BaseProps
  extends React.BaseHTMLAttributes<HTMLBaseElement>,
    CommonComponentProps {
  /** The base URL for all relative URLs in the document */
  href?: string;
  /** Default target for all hyperlinks and forms */
  target?: "_self" | "_blank" | "_parent" | "_top" | string;
  /** Whether the base should be emphasized in styling */
  emphasized?: boolean;
  /** Analytics identifier for tracking */
  analyticsId?: string;
  /** Custom analytics function */
  onAnalytics?: (data: {
    event: string;
    category: string;
    label: string;
    href?: string;
    target?: string;
  }) => void;
}

/**
 * Universal base component for setting document base URL and default target.
 * Supports server-side and client-side rendering.
 */
const BaseComponent = React.forwardRef<BaseRef, BaseProps>((props, ref) => {
  const {
    href,
    target,
    emphasized = false,
    analyticsId,
    onAnalytics,
    as: Component = "base",
    isClient = false,
    isMemoized = false,
    className,
    onClick,
    onMouseEnter,
    onFocus,
    style,
    ...rest
  } = props;

  const hasAnalytics = analyticsId || onAnalytics;

  // Event handlers - always use useCallback to maintain hooks order
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLBaseElement>) => {
      // Only execute analytics if we have analytics setup
      if (hasAnalytics && (analyticsId || onAnalytics)) {
        const analyticsData = {
          event: "click",
          category: "base",
          label: analyticsId || "base-click",
          href: href || undefined,
          target: target || undefined,
        };

        if (onAnalytics) {
          onAnalytics(analyticsData);
        } else if (analyticsId && typeof window !== "undefined") {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const gtag = (window as any).gtag;
            if (gtag) {
              gtag("event", "click", {
                event_category: analyticsData.category,
                event_label: analyticsData.label,
                base_href: analyticsData.href,
                base_target: analyticsData.target,
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
    [hasAnalytics, analyticsId, onAnalytics, href, target, onClick]
  );

  // Props with accessibility and enhanced features
  const enhancedProps = useMemo(
    () => ({
      ...rest,
      ref,
      href,
      target,
      className: ["base", emphasized && "base--emphasized", className]
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
      href,
      target,
      emphasized,
      className,
      style,
      handleClick,
      onMouseEnter,
      onFocus,
      analyticsId,
    ]
  );

  // Base element (void element - no children)
  const element = <Component {...enhancedProps} />;

  // Client-side rendering
  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBaseClient : BaseClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...props} ref={ref} />
      </Suspense>
    );
  }

  return element;
});

BaseComponent.displayName = "Base";

// Export the server component
export const Base = BaseComponent;

// For most use cases, the server component is sufficient
// For client-side memoization, use isClient=true with isMemoized=true
export default Base;

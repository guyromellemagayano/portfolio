import React, { Suspense, useCallback, useMemo } from "react";

import type { CommonComponentProps } from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const BdoClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BdoClient };
});

const MemoizedBdoClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBdoClient };
});

export type BdoRef = React.ComponentRef<"bdo">;

export interface BdoProps
  extends React.HTMLAttributes<HTMLElement>,
    CommonComponentProps {
  /** Text direction override - required for semantic meaning */
  dir: "ltr" | "rtl";
  /** Whether the content should be emphasized */
  emphasized?: boolean;
  /** Analytics identifier for tracking */
  analyticsId?: string;
  /** Custom analytics function */
  onAnalytics?: (data: {
    event: string;
    category: string;
    label: string;
    content: string;
    dir: string;
  }) => void;
}

/**
 * Universal bidirectional override component with analytics and accessibility.
 * Supports server-side and client-side rendering.
 *
 * Note: The dir attribute is required for BDO elements to provide semantic meaning.
 */
const BdoComponent = React.forwardRef<BdoRef, BdoProps>((props, ref) => {
  const {
    dir,
    emphasized = false,
    analyticsId,
    onAnalytics,
    as: Component = "bdo",
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

  // Event handlers - always use useCallback to maintain hooks order
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      // Only execute analytics if we have analytics setup
      if (hasAnalytics && (analyticsId || onAnalytics)) {
        const analyticsData = {
          event: "click",
          category: "bdo",
          label: analyticsId || "bdo-click",
          content: String(children || ""),
          dir: dir,
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
                bdo_content: analyticsData.content,
                bdo_dir: analyticsData.dir,
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
    [hasAnalytics, analyticsId, onAnalytics, children, dir, onClick]
  );

  // Props with accessibility and enhanced features
  const enhancedProps = useMemo(
    () => ({
      ...rest,
      ref,
      dir,
      className: [
        "bdo",
        emphasized && "bdo--emphasized",
        `bdo--${dir}`,
        className,
      ]
        .filter(Boolean)
        .join(" "),
      style,
      onClick: handleClick,
      onMouseEnter,
      onFocus,
      "data-emphasized": emphasized ? "true" : undefined,
      "data-analytics-id": analyticsId || undefined,
      "data-polymorphic-element": asElement !== "bdo" ? asElement : undefined,
      "data-element-validation":
        process.env.NODE_ENV === "development" && asElement !== "bdo"
          ? "warning"
          : undefined,
    }),
    [
      rest,
      dir,
      emphasized,
      className,
      style,
      handleClick,
      onMouseEnter,
      onFocus,
      analyticsId,
      asElement,
    ]
  );

  // Base element
  const element = <Component {...enhancedProps}>{children}</Component>;

  // Client-side rendering
  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBdoClient : BdoClient;

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

BdoComponent.displayName = "Bdo";

// Export the server component
export const Bdo = BdoComponent;

// For most use cases, the server component is sufficient
// For client-side memoization, use isClient=true with isMemoized=true
export default Bdo;

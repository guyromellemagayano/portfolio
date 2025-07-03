import React, { Suspense, useCallback, useMemo } from "react";

import type { CommonComponentProps } from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const BdiClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BdiClient };
});

const MemoizedBdiClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBdiClient };
});

export type BdiRef = React.ComponentRef<"bdi">;

export interface BdiProps
  extends React.HTMLAttributes<HTMLElement>,
    CommonComponentProps {
  /** Text direction for the isolated content */
  dir?: "ltr" | "rtl" | "auto";
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
    dir?: string;
  }) => void;
}

/**
 * Universal bidirectional isolate component with analytics and accessibility.
 * Supports server-side and client-side rendering.
 */
const BdiComponent = React.forwardRef<BdiRef, BdiProps>((props, ref) => {
  const {
    dir,
    emphasized = false,
    analyticsId,
    onAnalytics,
    as: Component = "bdi",
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
          category: "bdi",
          label: analyticsId || "bdi-click",
          content: String(children || ""),
          dir: dir || undefined,
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
                bdi_content: analyticsData.content,
                bdi_dir: analyticsData.dir,
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
      className: ["bdi", emphasized && "bdi--emphasized", className]
        .filter(Boolean)
        .join(" "),
      style,
      onClick: handleClick,
      onMouseEnter,
      onFocus,
      "data-emphasized": emphasized ? "true" : undefined,
      "data-analytics-id": analyticsId || undefined,
      "data-polymorphic-element": asElement !== "bdi" ? asElement : undefined,
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
    const ClientComponent = isMemoized ? MemoizedBdiClient : BdiClient;

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

BdiComponent.displayName = "Bdi";

// Export the server component
export const Bdi = BdiComponent;

// For most use cases, the server component is sufficient
// For client-side memoization, use isClient=true with isMemoized=true
export default Bdi;

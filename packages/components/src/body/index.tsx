import React, { Suspense, useCallback, useMemo } from "react";

import {
  type CommonComponentProps,
  ELEMENT_CONFIGS,
  validatePolymorphicProps,
} from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const BodyClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BodyClient };
});

const MemoizedBodyClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBodyClient };
});

export type BodyRef = React.ComponentRef<"body">;

export interface BodyProps
  extends React.HTMLAttributes<HTMLElement>,
    CommonComponentProps {
  /** Whether the body should be scrollable */
  scrollable?: boolean;
  /** Whether the body should have a background */
  hasBackground?: boolean;
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

/**
 * Universal body component with semantic structure, analytics, and accessibility.
 * Supports server-side and client-side rendering.
 */
const BodyComponent = React.forwardRef<BodyRef, BodyProps>((props, ref) => {
  const {
    scrollable = true,
    hasBackground = true,
    analyticsId,
    onAnalytics,
    as: Component = "body",
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

  // Polymorphic validation - warn about body-specific props when rendering as different element
  useMemo(() => {
    validatePolymorphicProps(
      "Body",
      asElement,
      props as Record<string, unknown>,
      ELEMENT_CONFIGS.BODY
    );
  }, [asElement, props]);

  // Event handlers - always use useCallback to maintain hooks order
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      // Only execute analytics if we have analytics setup
      if (hasAnalytics && (analyticsId || onAnalytics)) {
        const analyticsData = {
          event: "click",
          category: "body",
          label: analyticsId || "body-click",
          content: String(children || ""),
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
                body_content: analyticsData.content,
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
    [hasAnalytics, analyticsId, onAnalytics, children, onClick]
  );

  // Props with accessibility and semantic structure
  const enhancedProps = useMemo(
    () => ({
      ...rest,
      ref,
      className: [
        "body",
        scrollable && "body--scrollable",
        hasBackground && "body--has-background",
        className,
      ]
        .filter(Boolean)
        .join(" "),
      style: {
        ...style,
        overflow: scrollable ? undefined : "hidden",
      },
      onClick: handleClick,
      onMouseEnter,
      onFocus,
      "data-scrollable": scrollable ? "true" : "false",
      "data-has-background": hasBackground ? "true" : "false",
      "data-analytics-id": analyticsId || undefined,
      "data-polymorphic-element": asElement !== "body" ? asElement : undefined,
      "data-element-validation":
        process.env.NODE_ENV === "development" && asElement !== "body"
          ? "warning"
          : undefined,
    }),
    [
      rest,
      scrollable,
      hasBackground,
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
    const ClientComponent = isMemoized ? MemoizedBodyClient : BodyClient;

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

BodyComponent.displayName = "Body";

// Export the server component
export const Body = BodyComponent;

// For most use cases, the server component is sufficient
// For client-side memoization, use isClient=true with isMemoized=true
export default Body;

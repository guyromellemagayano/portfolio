import React, { Suspense, useCallback, useMemo } from "react";

import {
  type CommonComponentProps,
  ELEMENT_CONFIGS,
  validatePolymorphicProps,
} from "../types";

import "./styles.css";

const BrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BrClient };
});

const MemoizedBrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBrClient };
});

export type BrRef = React.ComponentRef<"br">;
export interface BrProps
  extends React.HTMLAttributes<HTMLBRElement>,
    CommonComponentProps {
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
 * Polymorphic line break component with analytics and validation.
 * Renders as <br> by default, but can be rendered as any element.
 */
const BrComponent = React.forwardRef<BrRef, BrProps>((props, ref) => {
  const {
    analyticsId,
    onAnalytics,
    as: Component = "br",
    isClient = false,
    isMemoized = false,
    className,
    onClick,
    onMouseEnter,
    onFocus,
    style,
    children,
    ...rest
  } = props;

  const asElement = typeof Component === "string" ? Component : "unknown";
  const hasAnalytics = analyticsId || onAnalytics;
  const isBrElement = asElement === "br";

  // Polymorphic validation with warnings
  useMemo(() => {
    validatePolymorphicProps(
      "Br",
      asElement,
      props as Record<string, unknown>,
      ELEMENT_CONFIGS.BR
    );

    // Additional validation for br-specific props on non-br elements
    if (process.env.NODE_ENV === "development" && !isBrElement) {
      const brSpecificProps = ["clear"];
      const hasBrProps = brSpecificProps.some((prop) => prop in rest);
      if (hasBrProps) {
        console.warn(
          `Warning: <br> specific props (${brSpecificProps.join(", ")}) are being used on a <${asElement}> element. This may cause unexpected behavior.`
        );
      }
    }
  }, [asElement, props, rest, isBrElement]);

  // Analytics handler
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLBRElement>) => {
      if (hasAnalytics && (analyticsId || onAnalytics)) {
        const analyticsData = {
          event: "click",
          category: "br",
          label: analyticsId || "br-click",
          content: "<br />",
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
                br_content: analyticsData.content,
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
    [hasAnalytics, analyticsId, onAnalytics, onClick]
  );

  const enhancedProps = useMemo(
    () => ({
      ...rest,
      ref,
      className: ["br", className].filter(Boolean).join(" "),
      style,
      onClick: handleClick,
      onMouseEnter,
      onFocus,
      "data-analytics-id": analyticsId || undefined,
      "data-polymorphic-element": asElement !== "br" ? asElement : undefined,
    }),
    [
      rest,
      className,
      style,
      handleClick,
      onMouseEnter,
      onFocus,
      analyticsId,
      asElement,
      ref,
    ]
  );

  // Only render children for non-br elements (polymorphic usage)
  const element = isBrElement ? (
    <Component {...enhancedProps} />
  ) : (
    <Component {...enhancedProps}>{children}</Component>
  );

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBrClient : BrClient;
    return (
      <Suspense fallback={element}>
        <ClientComponent {...props} ref={ref} />
      </Suspense>
    );
  }

  return element;
});

BrComponent.displayName = "Br";

export const Br = BrComponent;
export default Br;

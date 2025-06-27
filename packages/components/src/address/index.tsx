import React, { Suspense, useCallback, useMemo } from "react";

import type { CommonComponentProps } from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const AddressClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AddressClient };
});

const MemoizedAddressClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAddressClient };
});

export type AddressRef = React.ComponentRef<"address">;

export interface AddressProps
  extends React.HTMLAttributes<HTMLElement>,
    CommonComponentProps {
  /** Whether to show the address as a block element */
  block?: boolean;
  /** Whether the address should be emphasized */
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

/**
 * Universal address component with variants, analytics, and accessibility.
 * Supports server-side and client-side rendering.
 */
const AddressComponent = React.forwardRef<AddressRef, AddressProps>(
  (props, ref) => {
    const {
      block = false,
      emphasized = false,
      analyticsId,
      onAnalytics,
      as: Component = "address",
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

    const hasAnalytics = analyticsId || onAnalytics;

    // Event handlers
    const handleClick = hasAnalytics
      ? useCallback(
          (event: React.MouseEvent<HTMLElement>) => {
            if (analyticsId || onAnalytics) {
              const analyticsData = {
                event: "click",
                category: "address",
                label: analyticsId || "address-click",
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
                      address_content: analyticsData.content,
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
          [analyticsId, onAnalytics, children, onClick]
        )
      : onClick;

    // Props with accessibility and security
    const enhancedProps = useMemo(
      () => ({
        ...rest,
        ref,
        className: [
          "address",
          block && "address--block",
          emphasized && "address--emphasized",
          className,
        ]
          .filter(Boolean)
          .join(" "),
        style,
        onClick: handleClick,
        onMouseEnter,
        onFocus,
        "data-block": block ? "true" : undefined,
        "data-emphasized": emphasized ? "true" : undefined,
        "data-analytics-id": analyticsId || undefined,
      }),
      [
        rest,
        block,
        emphasized,
        className,
        style,
        handleClick,
        onMouseEnter,
        onFocus,
        analyticsId,
      ]
    );

    // Base element
    const element = <Component {...enhancedProps}>{children}</Component>;

    // Client-side rendering
    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedAddressClient
        : AddressClient;

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

AddressComponent.displayName = "Address";

// Export the server component
export const Address = AddressComponent;

// For most use cases, the server component is sufficient
// For client-side memoization, use isClient=true with isMemoized=true
export default Address;

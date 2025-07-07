import React, { Suspense, useMemo } from "react";

import {
  type CommonComponentProps,
  ELEMENT_CONFIGS,
  validatePolymorphicProps,
} from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const BlockquoteClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BlockquoteClient };
});

const MemoizedBlockquoteClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBlockquoteClient };
});

export type BlockquoteRef = React.ComponentRef<"blockquote">;
export interface BlockquoteProps
  extends React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
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
 * Universal blockquote component with semantic quotation support and polymorphic validation. Supports server-side and client-side rendering with proper cite attribution.
 */
const BlockquoteComponent = React.forwardRef<BlockquoteRef, BlockquoteProps>(
  (props, ref) => {
    const {
      cite,
      as: Component = "blockquote",
      isClient = false,
      isMemoized = false,
      children,
      className,
      analyticsId,
      onClick,
      onMouseEnter,
      onFocus,
      style,
      ...rest
    } = props;

    const asElement = typeof Component === "string" ? Component : "unknown";

    // Runtime validation for development - warns about invalid prop usage
    useMemo(() => {
      validatePolymorphicProps(
        "Blockquote",
        asElement,
        { cite },
        ELEMENT_CONFIGS.BLOCKQUOTE
      );
    }, [asElement, cite]);

    // Props with accessibility and semantic structure
    const enhancedProps = useMemo(
      () => ({
        ...rest,
        ref,
        className: ["blockquote", className].filter(Boolean).join(" "),
        style,
        cite,
        onClick,
        onMouseEnter,
        onFocus,
        "data-analytics-id": analyticsId || undefined,
        "data-polymorphic-element":
          asElement !== "blockquote" ? asElement : undefined,
        "data-element-validation":
          process.env.NODE_ENV === "development" && asElement !== "blockquote"
            ? "warning"
            : undefined,
      }),
      [
        rest,
        className,
        style,
        cite,
        onClick,
        onMouseEnter,
        onFocus,
        analyticsId,
        asElement,
      ]
    );

    // Create the base element
    const element = <Component {...enhancedProps}>{children}</Component>;

    // Handle client-side rendering
    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedBlockquoteClient
        : BlockquoteClient;

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

BlockquoteComponent.displayName = "Blockquote";

// Export the server component
export const Blockquote = BlockquoteComponent;

// For most use cases, the server component is sufficient
// For client-side memoization, use isClient=true with isMemoized=true
export default Blockquote;

import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const ParagraphClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ParagraphClient };
});
const MemoizedParagraphClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedParagraphClient };
});

export type ParagraphRef = React.ComponentRef<"p">;

export interface ParagraphProps
  extends React.ComponentPropsWithoutRef<"p">,
    CommonComponentProps {}

/**
 * Render the paragraph server component.
 */
export const Paragraph = React.forwardRef<ParagraphRef, ParagraphProps>(
  (props, ref) => {
    const {
      as: Component = "p",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedParagraphClient
        : ParagraphClient;

      return (
        <Suspense fallback={element}>
          <ClientComponent {...rest} ref={ref}>
            {children}
          </ClientComponent>
        </Suspense>
      );
    }

    return element;
  }
);

Paragraph.displayName = "Paragraph";

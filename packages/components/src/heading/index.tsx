import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const HeadingClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.HeadingClient };
});
const MemoizedHeadingClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedHeadingClient };
});

export type HeadingRef = React.ComponentRef<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

export interface HeadingProps
  extends
    React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">,
    CommonComponentProps {}

/** Render the HTML section heading server component. */
export const Heading = React.forwardRef<HeadingRef, HeadingProps>(
  (props, ref) => {
    const {
      as: Component = "h1" as const,
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedHeadingClient
        : HeadingClient;

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

Heading.displayName = "Heading";

import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const SpanClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SpanClient };
});
const MemoizedSpanClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedSpanClient };
});

export type SpanRef = React.ComponentRef<"span">;

export interface SpanProps
  extends React.ComponentPropsWithoutRef<"span">, CommonComponentProps {}

/** Render the content span server component. */
export const Span = React.forwardRef<SpanRef, SpanProps>((props, ref) => {
  const {
    as: Component = "span",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedSpanClient : SpanClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
});

Span.displayName = "Span";

import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const MarkClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MarkClient };
});
const MemoizedMarkClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedMarkClient };
});

export type MarkRef = React.ComponentRef<"mark">;

export interface MarkProps
  extends React.ComponentPropsWithoutRef<"mark">, CommonComponentProps {}

/** Render the mark text server component. */
export const Mark = React.forwardRef<MarkRef, MarkProps>((props, ref) => {
  const {
    as: Component = "mark",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedMarkClient : MarkClient;

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

Mark.displayName = "Mark";

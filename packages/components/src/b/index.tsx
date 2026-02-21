import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const BClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BClient };
});
const MemoizedBClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBClient };
});

export type BRef = React.ComponentRef<"b">;

export interface BProps
  extends React.ComponentPropsWithoutRef<"b">, CommonComponentProps {}

/** Render the bring attention server component. */
export const B = React.forwardRef<BRef, BProps>((props, ref) => {
  const {
    as: Component = "b",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBClient : BClient;

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

B.displayName = "B";

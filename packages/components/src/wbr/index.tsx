import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const WbrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.WbrClient };
});
const MemoizedWbrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedWbrClient };
});

export type WbrRef = React.ComponentRef<"wbr">;

export interface WbrProps
  extends React.ComponentPropsWithoutRef<"wbr">, CommonComponentProps {}

/** Render the word break opportunity server component. */
export const Wbr = React.forwardRef<WbrRef, WbrProps>((props, ref) => {
  const {
    as: Component = "wbr",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedWbrClient : WbrClient;

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

Wbr.displayName = "Wbr";

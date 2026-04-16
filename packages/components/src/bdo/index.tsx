import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const BdoClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BdoClient };
});
const MemoizedBdoClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBdoClient };
});

export type BdoRef = React.ComponentRef<"bdo">;

export interface BdoProps
  extends React.ComponentPropsWithoutRef<"bdo">, CommonComponentProps {}

/** Render the bidirectional text override server component. */
export const Bdo = React.forwardRef<BdoRef, BdoProps>((props, ref) => {
  const {
    as: Component = "bdo",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBdoClient : BdoClient;

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

Bdo.displayName = "Bdo";

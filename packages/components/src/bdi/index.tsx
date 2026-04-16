import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const BdiClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BdiClient };
});
const MemoizedBdiClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBdiClient };
});

export type BdiRef = React.ComponentRef<"bdi">;

export interface BdiProps
  extends React.ComponentPropsWithoutRef<"bdi">, CommonComponentProps {}

/** Render the bidirectional isolate server component. */
export const Bdi = React.forwardRef<BdiRef, BdiProps>((props, ref) => {
  const {
    as: Component = "bdi",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBdiClient : BdiClient;

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

Bdi.displayName = "Bdi";

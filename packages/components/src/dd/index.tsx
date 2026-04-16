import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const DdClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DdClient };
});
const MemoizedDdClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDdClient };
});

export type DdRef = React.ComponentRef<"dd">;

export interface DdProps
  extends React.ComponentPropsWithoutRef<"dd">, CommonComponentProps {}

/** Render the description details server component. */
export const Dd = React.forwardRef<DdRef, DdProps>((props, ref) => {
  const {
    as: Component = "dd",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDdClient : DdClient;

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

Dd.displayName = "Dd";

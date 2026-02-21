import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const DfnClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DfnClient };
});
const MemoizedDfnClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDfnClient };
});

export type DfnRef = React.ComponentRef<"dfn">;

export interface DfnProps
  extends React.ComponentPropsWithoutRef<"dfn">, CommonComponentProps {}

/** Render the definition element server component. */
export const Dfn = React.forwardRef<DfnRef, DfnProps>((props, ref) => {
  const {
    as: Component = "dfn",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDfnClient : DfnClient;

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

Dfn.displayName = "Dfn";

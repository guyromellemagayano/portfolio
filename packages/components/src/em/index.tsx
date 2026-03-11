import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const EmClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.EmClient };
});
const MemoizedEmClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedEmClient };
});

export type EmRef = React.ComponentRef<"em">;

export interface EmProps
  extends React.ComponentPropsWithoutRef<"em">, CommonComponentProps {}

/** Render the emphasis server component. */
export const Em = React.forwardRef<EmRef, EmProps>((props, ref) => {
  const {
    as: Component = "em",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedEmClient : EmClient;

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

Em.displayName = "Em";

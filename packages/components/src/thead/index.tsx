import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const TheadClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TheadClient };
});
const MemoizedTheadClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedTheadClient };
});

export type TheadRef = React.ComponentRef<"thead">;

export interface TheadProps
  extends React.ComponentPropsWithoutRef<"thead">, CommonComponentProps {}

/** Render the table head server component. */
export const Thead = React.forwardRef<TheadRef, TheadProps>((props, ref) => {
  const {
    as: Component = "thead",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedTheadClient : TheadClient;

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

Thead.displayName = "Thead";

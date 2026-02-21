import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const PClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.PClient };
});
const MemoizedPClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedPClient };
});

export type PRef = React.ComponentRef<"p">;

export interface PProps
  extends React.ComponentPropsWithoutRef<"p">, CommonComponentProps {}

/** Render the paragraph server component. */
export const P = React.forwardRef<PRef, PProps>((props, ref) => {
  const {
    as: Component = "p",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedPClient : PClient;

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

P.displayName = "P";

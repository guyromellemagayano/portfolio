import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const InsClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.InsClient };
});
const MemoizedInsClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedInsClient };
});

export type InsRef = React.ComponentRef<"ins">;

export interface InsProps
  extends React.ComponentPropsWithoutRef<"ins">, CommonComponentProps {}

/** Render the inserted text server component. */
export const Ins = React.forwardRef<InsRef, InsProps>((props, ref) => {
  const {
    as: Component = "ins",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedInsClient : InsClient;

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

Ins.displayName = "Ins";

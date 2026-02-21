import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const TdClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TdClient };
});
const MemoizedTdClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedTdClient };
});

export type TdRef = React.ComponentRef<"td">;

export interface TdProps
  extends React.ComponentPropsWithoutRef<"td">, CommonComponentProps {}

/** Render the table data cell server component. */
export const Td = React.forwardRef<TdRef, TdProps>((props, ref) => {
  const {
    as: Component = "td",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedTdClient : TdClient;

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

Td.displayName = "Td";

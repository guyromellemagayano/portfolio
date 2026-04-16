import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const QClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.QClient };
});
const MemoizedQClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedQClient };
});

export type QRef = React.ComponentRef<"q">;

export interface QProps
  extends React.ComponentPropsWithoutRef<"q">, CommonComponentProps {}

/** Render the inline quotation server component. */
export const Q = React.forwardRef<QRef, QProps>((props, ref) => {
  const {
    as: Component = "q",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedQClient : QClient;

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

Q.displayName = "Q";

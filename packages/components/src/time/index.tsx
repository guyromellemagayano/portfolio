import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const TimeClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TimeClient };
});
const MemoizedTimeClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedTimeClient };
});

export type TimeRef = React.ComponentRef<"time">;

export interface TimeProps
  extends React.ComponentPropsWithoutRef<"time">, CommonComponentProps {}

/** Render the (date) time server component. */
export const Time = React.forwardRef<TimeRef, TimeProps>((props, ref) => {
  const {
    as: Component = "time",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedTimeClient : TimeClient;

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

Time.displayName = "Time";

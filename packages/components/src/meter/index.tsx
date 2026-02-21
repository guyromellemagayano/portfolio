import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const MeterClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MeterClient };
});
const MemoizedMeterClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedMeterClient };
});

export type MeterRef = React.ComponentRef<"meter">;

export interface MeterProps
  extends React.ComponentPropsWithoutRef<"meter">, CommonComponentProps {}

/** Render the HTML meter server component. */
export const Meter = React.forwardRef<MeterRef, MeterProps>((props, ref) => {
  const {
    as: Component = "meter",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedMeterClient : MeterClient;

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

Meter.displayName = "Meter";

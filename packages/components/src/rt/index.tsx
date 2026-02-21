import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const RtClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.RtClient };
});
const MemoizedRtClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedRtClient };
});

export type RtRef = React.ComponentRef<"rt">;

export interface RtProps
  extends React.ComponentPropsWithoutRef<"rt">, CommonComponentProps {}

/** Render the ruby text server component. */
export const Rt = React.forwardRef<RtRef, RtProps>((props, ref) => {
  const {
    as: Component = "rt",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedRtClient : RtClient;

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

Rt.displayName = "Rt";

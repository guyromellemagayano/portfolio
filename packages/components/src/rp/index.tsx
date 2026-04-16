import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const RpClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.RpClient };
});
const MemoizedRpClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedRpClient };
});

export type RpRef = React.ComponentRef<"rp">;

export interface RpProps
  extends React.ComponentPropsWithoutRef<"rp">, CommonComponentProps {}

/** Render the ruby fallback parenthesis server component. */
export const Rp = React.forwardRef<RpRef, RpProps>((props, ref) => {
  const {
    as: Component = "rp",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedRpClient : RpClient;

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

Rp.displayName = "Rp";

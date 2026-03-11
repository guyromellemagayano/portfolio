import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const StrongClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.StrongClient };
});
const MemoizedStrongClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedStrongClient };
});

export type StrongRef = React.ComponentRef<"strong">;

export interface StrongProps
  extends React.ComponentPropsWithoutRef<"strong">, CommonComponentProps {}

/** Render the strong importance server component. */
export const Strong = React.forwardRef<StrongRef, StrongProps>((props, ref) => {
  const {
    as: Component = "strong",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedStrongClient : StrongClient;

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

Strong.displayName = "Strong";

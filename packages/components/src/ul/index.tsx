import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const UlClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.UlClient };
});
const MemoizedUlClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedUlClient };
});

export type UlRef = React.ComponentRef<"ul">;

export interface UlProps
  extends React.ComponentPropsWithoutRef<"ul">, CommonComponentProps {}

/** Render the unordered list server component. */
export const Ul = React.forwardRef<UlRef, UlProps>((props, ref) => {
  const {
    as: Component = "ul",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedUlClient : UlClient;

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

Ul.displayName = "Ul";

import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const SClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SClient };
});
const MemoizedSClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedSClient };
});

export type SRef = React.ComponentRef<"s">;

export interface SProps
  extends React.ComponentPropsWithoutRef<"s">, CommonComponentProps {}

/** Render the strikethrough server component. */
export const S = React.forwardRef<SRef, SProps>((props, ref) => {
  const {
    as: Component = "s",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedSClient : SClient;

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

S.displayName = "S";

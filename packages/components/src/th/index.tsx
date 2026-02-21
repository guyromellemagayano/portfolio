import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const ThClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ThClient };
});
const MemoizedThClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedThClient };
});

export type ThRef = React.ComponentRef<"th">;

export interface ThProps
  extends React.ComponentPropsWithoutRef<"th">, CommonComponentProps {}

/** Render the table header server component. */
export const Th = React.forwardRef<ThRef, ThProps>((props, ref) => {
  const {
    as: Component = "th",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedThClient : ThClient;

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

Th.displayName = "Th";

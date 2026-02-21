import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const LiClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.LiClient };
});
const MemoizedLiClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedLiClient };
});

export type LiRef = React.ComponentRef<"li">;

export interface LiProps
  extends React.ComponentPropsWithoutRef<"li">, CommonComponentProps {}

/** Render the list item server component. */
export const Li = React.forwardRef<LiRef, LiProps>((props, ref) => {
  const {
    as: Component = "li",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedLiClient : LiClient;

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

Li.displayName = "Li";

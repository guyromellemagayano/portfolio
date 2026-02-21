import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const BaseClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BaseClient };
});
const MemoizedBaseClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBaseClient };
});

export type BaseRef = React.ComponentRef<"base">;

export interface BaseProps
  extends React.ComponentPropsWithoutRef<"base">, CommonComponentProps {}

/** Render the base server component. */
export const Base = React.forwardRef<BaseRef, BaseProps>((props, ref) => {
  const {
    as: Component = "base",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBaseClient : BaseClient;

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

Base.displayName = "Base";

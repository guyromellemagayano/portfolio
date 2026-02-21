import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const IClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.IClient };
});
const MemoizedIClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedIClient };
});

export type IRef = React.ComponentRef<"i">;

export interface IProps
  extends React.ComponentPropsWithoutRef<"i">, CommonComponentProps {}

/** Render the idiomatic text server component. */
export const I = React.forwardRef<IRef, IProps>((props, ref) => {
  const {
    as: Component = "i",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedIClient : IClient;

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

I.displayName = "I";

import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const BodyClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BodyClient };
});
const MemoizedBodyClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBodyClient };
});

export type BodyRef = React.ComponentRef<"body">;

export interface BodyProps
  extends React.ComponentPropsWithoutRef<"body">, CommonComponentProps {}

/** Render the default body server component. */
export const Body = React.forwardRef<BodyRef, BodyProps>((props, ref) => {
  const {
    as: Component = "body",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBodyClient : BodyClient;

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

Body.displayName = "Body";

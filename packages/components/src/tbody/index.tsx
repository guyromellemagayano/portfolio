import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const TbodyClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TbodyClient };
});
const MemoizedTbodyClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedTbodyClient };
});

export type TbodyRef = React.ComponentRef<"tbody">;

export interface TbodyProps
  extends React.ComponentPropsWithoutRef<"tbody">, CommonComponentProps {}

/** Render the table body server component. */
export const Tbody = React.forwardRef<TbodyRef, TbodyProps>((props, ref) => {
  const {
    as: Component = "tbody",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedTbodyClient : TbodyClient;

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

Tbody.displayName = "Tbody";

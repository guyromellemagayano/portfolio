import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const TrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TrClient };
});
const MemoizedTrClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedTrClient };
});

export type TrRef = React.ComponentRef<"tr">;

export interface TrProps
  extends React.ComponentPropsWithoutRef<"tr">, CommonComponentProps {}

/** Render the table row server component. */
export const Tr = React.forwardRef<TrRef, TrProps>((props, ref) => {
  const {
    as: Component = "tr",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedTrClient : TrClient;

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

Tr.displayName = "Tr";

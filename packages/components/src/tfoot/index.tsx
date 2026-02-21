import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const TfootClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TfootClient };
});
const MemoizedTfootClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedTfootClient };
});

export type TfootRef = React.ComponentRef<"tfoot">;

export interface TfootProps
  extends React.ComponentPropsWithoutRef<"tfoot">, CommonComponentProps {}

/** Render the table foot server component. */
export const Tfoot = React.forwardRef<TfootRef, TfootProps>((props, ref) => {
  const {
    as: Component = "tfoot",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedTfootClient : TfootClient;

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

Tfoot.displayName = "Tfoot";

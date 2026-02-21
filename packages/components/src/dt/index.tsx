import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const DtClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DtClient };
});
const MemoizedDtClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDtClient };
});

export type DtRef = React.ComponentRef<"dt">;

export interface DtProps
  extends React.ComponentPropsWithoutRef<"dt">, CommonComponentProps {}

/** Render the description term server component. */
export const Dt = React.forwardRef<DtRef, DtProps>((props, ref) => {
  const {
    as: Component = "dt",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDtClient : DtClient;

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

Dt.displayName = "Dt";

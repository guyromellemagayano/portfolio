import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const DataClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DataClient };
});
const MemoizedDataClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDataClient };
});

export type DataRef = React.ComponentRef<"data">;

export interface DataProps
  extends React.ComponentPropsWithoutRef<"data">, CommonComponentProps {}

/** Render the data server component. */
export const Data = React.forwardRef<DataRef, DataProps>((props, ref) => {
  const {
    as: Component = "data",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDataClient : DataClient;

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

Data.displayName = "Data";

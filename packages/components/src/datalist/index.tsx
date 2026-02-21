import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const DatalistClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DatalistClient };
});
const MemoizedDatalistClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDatalistClient };
});

export type DatalistRef = React.ComponentRef<"datalist">;

export interface DatalistProps
  extends React.ComponentPropsWithoutRef<"datalist">, CommonComponentProps {}

/** Render the datalist server component. */
export const Datalist = React.forwardRef<DatalistRef, DatalistProps>(
  (props, ref) => {
    const {
      as: Component = "datalist",
      isClient = false,
      isMemoized = false,
      children,
      ...rest
    } = props;

    const element = <Component {...rest}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized
        ? MemoizedDatalistClient
        : DatalistClient;

      return (
        <Suspense fallback={element}>
          <ClientComponent {...rest} ref={ref}>
            {children}
          </ClientComponent>
        </Suspense>
      );
    }

    return element;
  }
);

Datalist.displayName = "Datalist";

import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const TableClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TableClient };
});
const MemoizedTableClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedTableClient };
});

export type TableRef = React.ComponentRef<"table">;

export interface TableProps
  extends React.ComponentPropsWithoutRef<"table">, CommonComponentProps {}

/** Render the table server component. */
export const Table = React.forwardRef<TableRef, TableProps>((props, ref) => {
  const {
    as: Component = "table",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedTableClient : TableClient;

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

Table.displayName = "Table";

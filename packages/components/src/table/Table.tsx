import React from "react";

import { type CommonComponentProps } from "../types";

export type TableRef = React.ComponentRef<"table">;

export interface TableProps
  extends React.ComponentPropsWithoutRef<"table">, CommonComponentProps {}

/** Render the table component. */
export const Table = React.forwardRef<TableRef, TableProps>((props, ref) => {
  const { as: Component = "table", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Table.displayName = "Table";

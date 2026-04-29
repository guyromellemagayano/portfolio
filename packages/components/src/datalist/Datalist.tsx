import React from "react";

import { type CommonComponentProps } from "../types";

export type DatalistRef = React.ComponentRef<"datalist">;

export interface DatalistProps
  extends React.ComponentPropsWithoutRef<"datalist">, CommonComponentProps {}

/** Render the datalist component. */
export const Datalist = React.forwardRef<DatalistRef, DatalistProps>(
  (props, ref) => {
    const { as: Component = "datalist", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Datalist.displayName = "Datalist";

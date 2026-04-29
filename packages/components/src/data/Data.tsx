import React from "react";

import { type CommonComponentProps } from "../types";

export type DataRef = React.ComponentRef<"data">;

export interface DataProps
  extends React.ComponentPropsWithoutRef<"data">, CommonComponentProps {}

/** Render the data component. */
export const Data = React.forwardRef<DataRef, DataProps>((props, ref) => {
  const { as: Component = "data", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Data.displayName = "Data";

import React from "react";

import { type CommonComponentProps } from "../types";

export type SelectRef = React.ComponentRef<"select">;

export interface SelectProps
  extends React.ComponentPropsWithoutRef<"select">, CommonComponentProps {}

/** Render the HTML select component. */
export const Select = React.forwardRef<SelectRef, SelectProps>((props, ref) => {
  const { as: Component = "select", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Select.displayName = "Select";

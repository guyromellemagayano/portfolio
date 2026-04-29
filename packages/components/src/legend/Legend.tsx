import React from "react";

import { type CommonComponentProps } from "../types";

export type LegendRef = React.ComponentRef<"legend">;

export interface LegendProps
  extends React.ComponentPropsWithoutRef<"legend">, CommonComponentProps {}

/** Render the field set legend component. */
export const Legend = React.forwardRef<LegendRef, LegendProps>((props, ref) => {
  const { as: Component = "legend", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Legend.displayName = "Legend";

import React from "react";

import { type CommonComponentProps } from "../types";

export type ThRef = React.ComponentRef<"th">;

export interface ThProps
  extends React.ComponentPropsWithoutRef<"th">, CommonComponentProps {}

/** Render the table header component. */
export const Th = React.forwardRef<ThRef, ThProps>((props, ref) => {
  const { as: Component = "th", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Th.displayName = "Th";

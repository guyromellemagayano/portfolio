import React from "react";

import { type CommonComponentProps } from "../types";

export type SubRef = React.ComponentRef<"sub">;

export interface SubProps
  extends React.ComponentPropsWithoutRef<"sub">, CommonComponentProps {}

/** Render the subscript component. */
export const Sub = React.forwardRef<SubRef, SubProps>((props, ref) => {
  const { as: Component = "sub", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Sub.displayName = "Sub";

import React from "react";

import { type CommonComponentProps } from "../types";

export type VarRef = React.ComponentRef<"var">;

export interface VarProps
  extends React.ComponentPropsWithoutRef<"var">, CommonComponentProps {}

/** Render the variable component. */
export const Var = React.forwardRef<VarRef, VarProps>((props, ref) => {
  const { as: Component = "var", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Var.displayName = "Var";

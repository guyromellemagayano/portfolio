import React from "react";

import { type CommonComponentProps } from "../types";

export type DfnRef = React.ComponentRef<"dfn">;

export interface DfnProps
  extends React.ComponentPropsWithoutRef<"dfn">, CommonComponentProps {}

/** Render the definition element component. */
export const Dfn = React.forwardRef<DfnRef, DfnProps>((props, ref) => {
  const { as: Component = "dfn", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Dfn.displayName = "Dfn";

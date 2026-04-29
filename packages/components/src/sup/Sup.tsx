import React from "react";

import { type CommonComponentProps } from "../types";

export type SupRef = React.ComponentRef<"sup">;

export interface SupProps
  extends React.ComponentPropsWithoutRef<"sup">, CommonComponentProps {}

/** Render the superscript component. */
export const Sup = React.forwardRef<SupRef, SupProps>((props, ref) => {
  const { as: Component = "sup", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Sup.displayName = "Sup";

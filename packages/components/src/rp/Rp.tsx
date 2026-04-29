import React from "react";

import { type CommonComponentProps } from "../types";

export type RpRef = React.ComponentRef<"rp">;

export interface RpProps
  extends React.ComponentPropsWithoutRef<"rp">, CommonComponentProps {}

/** Render the ruby fallback parenthesis component. */
export const Rp = React.forwardRef<RpRef, RpProps>((props, ref) => {
  const { as: Component = "rp", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Rp.displayName = "Rp";

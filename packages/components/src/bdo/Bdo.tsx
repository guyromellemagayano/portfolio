import React from "react";

import { type CommonComponentProps } from "../types";

export type BdoRef = React.ComponentRef<"bdo">;

export interface BdoProps
  extends React.ComponentPropsWithoutRef<"bdo">, CommonComponentProps {}

/** Render the bidirectional text override component. */
export const Bdo = React.forwardRef<BdoRef, BdoProps>((props, ref) => {
  const { as: Component = "bdo", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Bdo.displayName = "Bdo";

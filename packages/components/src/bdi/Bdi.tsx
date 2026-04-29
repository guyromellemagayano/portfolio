import React from "react";

import { type CommonComponentProps } from "../types";

export type BdiRef = React.ComponentRef<"bdi">;

export interface BdiProps
  extends React.ComponentPropsWithoutRef<"bdi">, CommonComponentProps {}

/** Render the bidirectional isolate component. */
export const Bdi = React.forwardRef<BdiRef, BdiProps>((props, ref) => {
  const { as: Component = "bdi", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Bdi.displayName = "Bdi";

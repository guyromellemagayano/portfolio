import React from "react";

import { type CommonComponentProps } from "../types";

export type BRef = React.ComponentRef<"b">;

export interface BProps
  extends React.ComponentPropsWithoutRef<"b">, CommonComponentProps {}

/** Render the bring attention component. */
export const B = React.forwardRef<BRef, BProps>((props, ref) => {
  const { as: Component = "b", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

B.displayName = "B";

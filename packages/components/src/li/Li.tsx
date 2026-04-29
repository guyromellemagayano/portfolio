import React from "react";

import { type CommonComponentProps } from "../types";

export type LiRef = React.ComponentRef<"li">;

export interface LiProps
  extends React.ComponentPropsWithoutRef<"li">, CommonComponentProps {}

/** Render the list item component. */
export const Li = React.forwardRef<LiRef, LiProps>((props, ref) => {
  const { as: Component = "li", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Li.displayName = "Li";

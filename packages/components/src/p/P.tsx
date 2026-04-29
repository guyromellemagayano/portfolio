import React from "react";

import { type CommonComponentProps } from "../types";

export type PRef = React.ComponentRef<"p">;

export interface PProps
  extends React.ComponentPropsWithoutRef<"p">, CommonComponentProps {}

/** Render the paragraph component. */
export const P = React.forwardRef<PRef, PProps>((props, ref) => {
  const { as: Component = "p", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

P.displayName = "P";

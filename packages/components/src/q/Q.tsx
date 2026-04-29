import React from "react";

import { type CommonComponentProps } from "../types";

export type QRef = React.ComponentRef<"q">;

export interface QProps
  extends React.ComponentPropsWithoutRef<"q">, CommonComponentProps {}

/** Render the inline quotation component. */
export const Q = React.forwardRef<QRef, QProps>((props, ref) => {
  const { as: Component = "q", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Q.displayName = "Q";

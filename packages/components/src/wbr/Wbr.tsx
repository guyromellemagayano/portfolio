import React from "react";

import { type CommonComponentProps } from "../types";

export type WbrRef = React.ComponentRef<"wbr">;

export interface WbrProps
  extends React.ComponentPropsWithoutRef<"wbr">, CommonComponentProps {}

/** Render the word break opportunity component. */
export const Wbr = React.forwardRef<WbrRef, WbrProps>((props, ref) => {
  const { as: Component = "wbr", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Wbr.displayName = "Wbr";

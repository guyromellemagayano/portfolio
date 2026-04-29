import React from "react";

import { type CommonComponentProps } from "../types";

export type InsRef = React.ComponentRef<"ins">;

export interface InsProps
  extends React.ComponentPropsWithoutRef<"ins">, CommonComponentProps {}

/** Render the inserted text component. */
export const Ins = React.forwardRef<InsRef, InsProps>((props, ref) => {
  const { as: Component = "ins", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Ins.displayName = "Ins";

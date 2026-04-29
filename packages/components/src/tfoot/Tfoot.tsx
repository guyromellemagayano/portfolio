import React from "react";

import { type CommonComponentProps } from "../types";

export type TfootRef = React.ComponentRef<"tfoot">;

export interface TfootProps
  extends React.ComponentPropsWithoutRef<"tfoot">, CommonComponentProps {}

/** Render the table foot component. */
export const Tfoot = React.forwardRef<TfootRef, TfootProps>((props, ref) => {
  const { as: Component = "tfoot", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Tfoot.displayName = "Tfoot";

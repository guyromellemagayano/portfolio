import React from "react";

import { type CommonComponentProps } from "../types";

export type EmRef = React.ComponentRef<"em">;

export interface EmProps
  extends React.ComponentPropsWithoutRef<"em">, CommonComponentProps {}

/** Render the emphasis component. */
export const Em = React.forwardRef<EmRef, EmProps>((props, ref) => {
  const { as: Component = "em", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Em.displayName = "Em";

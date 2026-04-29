import React from "react";

import { type CommonComponentProps } from "../types";

export type TheadRef = React.ComponentRef<"thead">;

export interface TheadProps
  extends React.ComponentPropsWithoutRef<"thead">, CommonComponentProps {}

/** Render the table head component. */
export const Thead = React.forwardRef<TheadRef, TheadProps>((props, ref) => {
  const { as: Component = "thead", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Thead.displayName = "Thead";

import React from "react";

import { type CommonComponentProps } from "../types";

export type UlRef = React.ComponentRef<"ul">;

export interface UlProps
  extends React.ComponentPropsWithoutRef<"ul">, CommonComponentProps {}

/** Render the unordered list component. */
export const Ul = React.forwardRef<UlRef, UlProps>((props, ref) => {
  const { as: Component = "ul", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Ul.displayName = "Ul";

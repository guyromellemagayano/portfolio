import React from "react";

import { type CommonComponentProps } from "../types";

export type DdRef = React.ComponentRef<"dd">;

export interface DdProps
  extends React.ComponentPropsWithoutRef<"dd">, CommonComponentProps {}

/** Render the description details component. */
export const Dd = React.forwardRef<DdRef, DdProps>((props, ref) => {
  const { as: Component = "dd", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Dd.displayName = "Dd";

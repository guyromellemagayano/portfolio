import React from "react";

import { type CommonComponentProps } from "../types";

export type AbbrRef = React.ComponentRef<"abbr">;

export interface AbbrProps
  extends React.ComponentPropsWithoutRef<"abbr">, CommonComponentProps {}

/** Render the abbreviation component. */
export const Abbr = React.forwardRef<AbbrRef, AbbrProps>((props, ref) => {
  const { as: Component = "abbr", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Abbr.displayName = "Abbr";

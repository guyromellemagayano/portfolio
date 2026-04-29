import React from "react";

import { type CommonComponentProps } from "../types";

export type ARef = React.ComponentRef<"a">;

export interface AProps
  extends React.ComponentPropsWithoutRef<"a">, CommonComponentProps {}

/** Render the default anchor component. */
export const A = React.forwardRef<ARef, AProps>((props, ref) => {
  const { as: Component = "a", href = "#", children, ...rest } = props;

  return (
    <Component ref={ref} href={href} {...rest}>
      {children}
    </Component>
  );
});

A.displayName = "A";

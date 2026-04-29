import React from "react";

import { type CommonComponentProps } from "../types";

export type NavRef = React.ComponentRef<"nav">;

export interface NavProps
  extends React.ComponentPropsWithoutRef<"nav">, CommonComponentProps {}

/** Render the navigation section component. */
export const Nav = React.forwardRef<NavRef, NavProps>((props, ref) => {
  const { as: Component = "nav", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Nav.displayName = "Nav";

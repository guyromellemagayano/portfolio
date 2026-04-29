import React from "react";

import { type CommonComponentProps } from "../types";

export type MenuRef = React.ComponentRef<"menu">;

export interface MenuProps
  extends React.ComponentPropsWithoutRef<"menu">, CommonComponentProps {}

/** Render the menu component. */
export const Menu = React.forwardRef<MenuRef, MenuProps>((props, ref) => {
  const { as: Component = "menu", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Menu.displayName = "Menu";

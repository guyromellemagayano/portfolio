import React from "react";

import { type CommonComponentProps } from "../types";

export type HeaderRef = React.ComponentRef<"header">;

export interface HeaderProps
  extends React.ComponentPropsWithoutRef<"header">, CommonComponentProps {}

/** Render the header component. */
export const Header = React.forwardRef<HeaderRef, HeaderProps>((props, ref) => {
  const { as: Component = "header", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Header.displayName = "Header";

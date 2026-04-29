import React from "react";

import { type CommonComponentProps } from "../types";

export type MainRef = React.ComponentRef<"main">;

export interface MainProps
  extends React.ComponentPropsWithoutRef<"main">, CommonComponentProps {}

/** Render the main component. */
export const Main = React.forwardRef<MainRef, MainProps>((props, ref) => {
  const { as: Component = "main", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Main.displayName = "Main";

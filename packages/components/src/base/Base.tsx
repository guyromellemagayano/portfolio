import React from "react";

import { type CommonComponentProps } from "../types";

export type BaseRef = React.ComponentRef<"base">;

export interface BaseProps
  extends React.ComponentPropsWithoutRef<"base">, CommonComponentProps {}

/** Render the base component. */
export const Base = React.forwardRef<BaseRef, BaseProps>((props, ref) => {
  const { as: Component = "base", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Base.displayName = "Base";

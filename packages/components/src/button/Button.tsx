import React from "react";

import { type CommonComponentProps } from "../types";

export type ButtonRef = React.ComponentRef<"button">;

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">, CommonComponentProps {}

/** Render the button component. */
export const Button = React.forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const {
    as: Component = "button",
    type = "button",
    children,
    ...rest
  } = props;

  return (
    <Component ref={ref} type={type} {...rest}>
      {children}
    </Component>
  );
});

Button.displayName = "Button";

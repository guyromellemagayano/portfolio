import React from "react";

import { type CommonComponentProps } from "../types";

export type InputRef = React.ComponentRef<"input">;

export interface InputProps
  extends React.ComponentPropsWithoutRef<"input">, CommonComponentProps {}

/** Render the HTML input component. */
export const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const { as: Component = "input", type = "text", ...rest } = props;

  return <Component ref={ref} type={type} {...rest} />;
});

Input.displayName = "Input";

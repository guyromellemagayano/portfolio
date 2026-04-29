import React from "react";

import { type CommonComponentProps } from "../types";

export type OptionRef = React.ComponentRef<"option">;

export interface OptionProps
  extends React.ComponentPropsWithoutRef<"option">, CommonComponentProps {}

/** Render the HTML option component. */
export const Option = React.forwardRef<OptionRef, OptionProps>((props, ref) => {
  const { as: Component = "option", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Option.displayName = "Option";

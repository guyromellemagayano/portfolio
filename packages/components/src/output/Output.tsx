import React from "react";

import { type CommonComponentProps } from "../types";

export type OutputRef = React.ComponentRef<"output">;

export interface OutputProps
  extends React.ComponentPropsWithoutRef<"output">, CommonComponentProps {}

/** Render the output component. */
export const Output = React.forwardRef<OutputRef, OutputProps>((props, ref) => {
  const { as: Component = "output", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Output.displayName = "Output";

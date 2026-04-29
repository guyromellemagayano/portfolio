import React from "react";

import { type CommonComponentProps } from "../types";

export type LabelRef = React.ComponentRef<"label">;

export interface LabelProps
  extends React.ComponentPropsWithoutRef<"label">, CommonComponentProps {}

/** Render the label component. */
export const Label = React.forwardRef<LabelRef, LabelProps>((props, ref) => {
  const { as: Component = "label", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Label.displayName = "Label";

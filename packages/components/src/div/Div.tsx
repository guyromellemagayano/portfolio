import React from "react";

import { type CommonComponentProps } from "../types";

export type DivRef = React.ComponentRef<"div">;

export interface DivProps
  extends React.ComponentPropsWithoutRef<"div">, CommonComponentProps {}

/** Render the content division component. */
export const Div = React.forwardRef<DivRef, DivProps>((props, ref) => {
  const { as: Component = "div", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Div.displayName = "Div";

import React from "react";

import { type CommonComponentProps } from "../types";

export type MarkRef = React.ComponentRef<"mark">;

export interface MarkProps
  extends React.ComponentPropsWithoutRef<"mark">, CommonComponentProps {}

/** Render the mark text component. */
export const Mark = React.forwardRef<MarkRef, MarkProps>((props, ref) => {
  const { as: Component = "mark", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Mark.displayName = "Mark";

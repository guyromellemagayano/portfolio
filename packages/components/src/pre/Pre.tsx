import React from "react";

import { type CommonComponentProps } from "../types";

export type PreRef = React.ComponentRef<"pre">;

export interface PreProps
  extends React.ComponentPropsWithoutRef<"pre">, CommonComponentProps {}

/** Render the preformatted text component. */
export const Pre = React.forwardRef<PreRef, PreProps>((props, ref) => {
  const { as: Component = "pre", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Pre.displayName = "Pre";

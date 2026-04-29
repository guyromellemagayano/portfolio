import React from "react";

import { type CommonComponentProps } from "../types";

export type SampRef = React.ComponentRef<"samp">;

export interface SampProps
  extends React.ComponentPropsWithoutRef<"samp">, CommonComponentProps {}

/** Render the sample output component. */
export const Samp = React.forwardRef<SampRef, SampProps>((props, ref) => {
  const { as: Component = "samp", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Samp.displayName = "Samp";

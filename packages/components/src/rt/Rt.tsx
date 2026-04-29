import React from "react";

import { type CommonComponentProps } from "../types";

export type RtRef = React.ComponentRef<"rt">;

export interface RtProps
  extends React.ComponentPropsWithoutRef<"rt">, CommonComponentProps {}

/** Render the ruby text component. */
export const Rt = React.forwardRef<RtRef, RtProps>((props, ref) => {
  const { as: Component = "rt", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Rt.displayName = "Rt";

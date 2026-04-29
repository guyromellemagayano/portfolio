import React from "react";

import { type CommonComponentProps } from "../types";

export type MeterRef = React.ComponentRef<"meter">;

export interface MeterProps
  extends React.ComponentPropsWithoutRef<"meter">, CommonComponentProps {}

/** Render the HTML meter component. */
export const Meter = React.forwardRef<MeterRef, MeterProps>((props, ref) => {
  const { as: Component = "meter", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Meter.displayName = "Meter";

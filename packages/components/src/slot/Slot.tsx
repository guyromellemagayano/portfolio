import React from "react";

import { type CommonComponentProps } from "../types";

export type SlotRef = React.ComponentRef<"slot">;

export interface SlotProps
  extends React.ComponentPropsWithoutRef<"slot">, CommonComponentProps {}

/** Render the web component slot component. */
export const Slot = React.forwardRef<SlotRef, SlotProps>((props, ref) => {
  const { as: Component = "slot", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Slot.displayName = "Slot";

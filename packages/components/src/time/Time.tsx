import React from "react";

import { type CommonComponentProps } from "../types";

export type TimeRef = React.ComponentRef<"time">;

export interface TimeProps
  extends React.ComponentPropsWithoutRef<"time">, CommonComponentProps {}

/** Render the (date) time component. */
export const Time = React.forwardRef<TimeRef, TimeProps>((props, ref) => {
  const { as: Component = "time", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Time.displayName = "Time";

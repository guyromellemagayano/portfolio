import React from "react";

import { type CommonComponentProps } from "../types";

export type HrRef = React.ComponentRef<"hr">;

export interface HrProps
  extends React.ComponentPropsWithoutRef<"hr">, CommonComponentProps {}

/** Render the thematic break (horizontal rule) component. */
export const Hr = React.forwardRef<HrRef, HrProps>((props, ref) => {
  const { as: Component = "hr", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Hr.displayName = "Hr";

import React from "react";

import { type CommonComponentProps } from "../types";

export type SmallRef = React.ComponentRef<"small">;

export interface SmallProps
  extends React.ComponentPropsWithoutRef<"small">, CommonComponentProps {}

/** Render the side comment component. */
export const Small = React.forwardRef<SmallRef, SmallProps>((props, ref) => {
  const { as: Component = "small", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Small.displayName = "Small";

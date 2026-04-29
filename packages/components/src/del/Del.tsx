import React from "react";

import { type CommonComponentProps } from "../types";

export type DelRef = React.ComponentRef<"del">;

export interface DelProps
  extends React.ComponentPropsWithoutRef<"del">, CommonComponentProps {}

/** Render the deleted text component. */
export const Del = React.forwardRef<DelRef, DelProps>((props, ref) => {
  const { as: Component = "del", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Del.displayName = "Del";

import React from "react";

import { type CommonComponentProps } from "../types";

export type StrongRef = React.ComponentRef<"strong">;

export interface StrongProps
  extends React.ComponentPropsWithoutRef<"strong">, CommonComponentProps {}

/** Render the strong importance component. */
export const Strong = React.forwardRef<StrongRef, StrongProps>((props, ref) => {
  const { as: Component = "strong", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Strong.displayName = "Strong";

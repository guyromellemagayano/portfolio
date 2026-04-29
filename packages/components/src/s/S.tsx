import React from "react";

import { type CommonComponentProps } from "../types";

export type SRef = React.ComponentRef<"s">;

export interface SProps
  extends React.ComponentPropsWithoutRef<"s">, CommonComponentProps {}

/** Render the strikethrough component. */
export const S = React.forwardRef<SRef, SProps>((props, ref) => {
  const { as: Component = "s", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

S.displayName = "S";

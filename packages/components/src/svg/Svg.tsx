import React from "react";

import { type CommonComponentProps } from "../types";

export type SvgRef = React.ComponentRef<"svg">;

export interface SvgProps
  extends React.ComponentPropsWithoutRef<"svg">, CommonComponentProps {}

/** Render the scalable vector graphics component. */
export const Svg = React.forwardRef<SvgRef, SvgProps>((props, ref) => {
  const { as: Component = "svg", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Svg.displayName = "Svg";

import React from "react";

import { type CommonComponentProps } from "../types";

export type FigureRef = React.ComponentRef<"figure">;

export interface FigureProps
  extends React.ComponentPropsWithoutRef<"figure">, CommonComponentProps {}

/** Render the figure with optional caption component. */
export const Figure = React.forwardRef<FigureRef, FigureProps>((props, ref) => {
  const { as: Component = "figure", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Figure.displayName = "Figure";

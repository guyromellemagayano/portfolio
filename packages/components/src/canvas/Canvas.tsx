import React from "react";

import { type CommonComponentProps } from "../types";

export type CanvasRef = React.ComponentRef<"canvas">;

export interface CanvasProps
  extends React.ComponentPropsWithoutRef<"canvas">, CommonComponentProps {}

/** Render the canvas component. */
export const Canvas = React.forwardRef<CanvasRef, CanvasProps>((props, ref) => {
  const { as: Component = "canvas", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Canvas.displayName = "Canvas";

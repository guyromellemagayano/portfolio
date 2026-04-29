import React from "react";

import { type CommonComponentProps } from "../types";

export type MapRef = React.ComponentRef<"map">;

export interface MapProps
  extends React.ComponentPropsWithoutRef<"map">, CommonComponentProps {}

/** Render the image map component. */
export const Map = React.forwardRef<MapRef, MapProps>((props, ref) => {
  const { as: Component = "map", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Map.displayName = "Map";

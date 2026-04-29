import React from "react";

import { type CommonComponentProps } from "../types";

export type AreaRef = React.ComponentRef<"area">;

export interface AreaProps
  extends React.ComponentPropsWithoutRef<"area">, CommonComponentProps {}

/** Render the area component. */
export const Area = React.forwardRef<AreaRef, AreaProps>((props, ref) => {
  const { as: Component = "area", alt = "", ...rest } = props;

  return <Component alt={alt} {...rest} ref={ref} />;
});

Area.displayName = "Area";

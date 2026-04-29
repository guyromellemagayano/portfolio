import React from "react";

import { type CommonComponentProps } from "../types";

export type ColRef = React.ComponentRef<"col">;

export interface ColProps
  extends React.ComponentPropsWithoutRef<"col">, CommonComponentProps {}

/** Render the column component. */
export const Col = React.forwardRef<ColRef, ColProps>((props, ref) => {
  const { as: Component = "col", ...rest } = props;

  return <Component ref={ref} {...rest} />;
});

Col.displayName = "Col";

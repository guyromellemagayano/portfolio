import React from "react";

import { type CommonComponentProps } from "../types";

export type MetaRef = React.ComponentRef<"meta">;

export interface MetaProps
  extends
    Omit<React.ComponentPropsWithoutRef<"meta">, "as">,
    CommonComponentProps {}

/** Render the metadata component. */
export const Meta = React.forwardRef<MetaRef, MetaProps>((props, ref) => {
  const { as: Component = "meta", ...rest } = props;

  return <Component ref={ref} {...rest} />;
});

Meta.displayName = "Meta";

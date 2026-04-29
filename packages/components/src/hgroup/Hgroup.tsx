import React from "react";

import { type CommonComponentProps } from "../types";

export type HgroupRef = React.ComponentRef<"hgroup">;

export interface HgroupProps
  extends React.ComponentPropsWithoutRef<"hgroup">, CommonComponentProps {}

/** Render the heading group component. */
export const Hgroup = React.forwardRef<HgroupRef, HgroupProps>((props, ref) => {
  const { as: Component = "hgroup", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Hgroup.displayName = "Hgroup";

import React from "react";

import { type CommonComponentProps } from "../types";

export type OptgroupRef = React.ComponentRef<"optgroup">;

export interface OptgroupProps
  extends React.ComponentPropsWithoutRef<"optgroup">, CommonComponentProps {}

/** Render the option group component. */
export const Optgroup = React.forwardRef<OptgroupRef, OptgroupProps>(
  (props, ref) => {
    const { as: Component = "optgroup", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Optgroup.displayName = "Optgroup";

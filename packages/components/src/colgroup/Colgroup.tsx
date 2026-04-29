import React from "react";

import { type CommonComponentProps } from "../types";

export type ColgroupRef = React.ComponentRef<"colgroup">;

export interface ColgroupProps
  extends React.ComponentPropsWithoutRef<"colgroup">, CommonComponentProps {}

/** Render the table column group component. */
export const Colgroup = React.forwardRef<ColgroupRef, ColgroupProps>(
  (props, ref) => {
    const { as: Component = "colgroup", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Colgroup.displayName = "Colgroup";

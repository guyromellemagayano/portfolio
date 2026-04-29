import React from "react";

import { type CommonComponentProps } from "../types";

export type DetailsRef = React.ComponentRef<"details">;

export interface DetailsProps
  extends React.ComponentPropsWithoutRef<"details">, CommonComponentProps {}

/** Render the details disclosure component. */
export const Details = React.forwardRef<DetailsRef, DetailsProps>(
  (props, ref) => {
    const { as: Component = "details", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Details.displayName = "Details";

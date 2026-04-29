import React from "react";

import { type CommonComponentProps } from "../types";

export type NoscriptRef = React.ComponentRef<"noscript">;

export interface NoscriptProps
  extends React.ComponentPropsWithoutRef<"noscript">, CommonComponentProps {}

/** Render the noscript component. */
export const Noscript = React.forwardRef<NoscriptRef, NoscriptProps>(
  (props, ref) => {
    const { as: Component = "noscript", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Noscript.displayName = "Noscript";

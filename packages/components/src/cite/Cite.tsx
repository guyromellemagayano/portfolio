import React from "react";

import { type CommonComponentProps } from "../types";

export type CiteRef = React.ComponentRef<"cite">;

export interface CiteProps
  extends React.ComponentPropsWithoutRef<"cite">, CommonComponentProps {}

/** Render the cite component. */
export const Cite = React.forwardRef<CiteRef, CiteProps>((props, ref) => {
  const { as: Component = "cite", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Cite.displayName = "Cite";

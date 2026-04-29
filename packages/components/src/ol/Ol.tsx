import React from "react";

import { type CommonComponentProps } from "../types";

export type OlRef = React.ComponentRef<"ol">;

export interface OlProps
  extends React.ComponentPropsWithoutRef<"ol">, CommonComponentProps {}

/** Render the ordered list component. */
export const Ol = React.forwardRef<OlRef, OlProps>((props, ref) => {
  const { as: Component = "ol", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Ol.displayName = "Ol";

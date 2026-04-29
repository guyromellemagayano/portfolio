import React from "react";

import { type CommonComponentProps } from "../types";

export type DlRef = React.ComponentRef<"dl">;

export interface DlProps
  extends React.ComponentPropsWithoutRef<"dl">, CommonComponentProps {}

/** Render the description list component. */
export const Dl = React.forwardRef<DlRef, DlProps>((props, ref) => {
  const { as: Component = "dl", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Dl.displayName = "Dl";

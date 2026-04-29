import React from "react";

import { type CommonComponentProps } from "../types";

export type TrRef = React.ComponentRef<"tr">;

export interface TrProps
  extends React.ComponentPropsWithoutRef<"tr">, CommonComponentProps {}

/** Render the table row component. */
export const Tr = React.forwardRef<TrRef, TrProps>((props, ref) => {
  const { as: Component = "tr", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Tr.displayName = "Tr";

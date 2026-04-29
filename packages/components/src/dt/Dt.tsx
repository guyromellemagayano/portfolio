import React from "react";

import { type CommonComponentProps } from "../types";

export type DtRef = React.ComponentRef<"dt">;

export interface DtProps
  extends React.ComponentPropsWithoutRef<"dt">, CommonComponentProps {}

/** Render the description term component. */
export const Dt = React.forwardRef<DtRef, DtProps>((props, ref) => {
  const { as: Component = "dt", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Dt.displayName = "Dt";

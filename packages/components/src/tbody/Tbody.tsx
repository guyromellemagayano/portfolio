import React from "react";

import { type CommonComponentProps } from "../types";

export type TbodyRef = React.ComponentRef<"tbody">;

export interface TbodyProps
  extends React.ComponentPropsWithoutRef<"tbody">, CommonComponentProps {}

/** Render the table body component. */
export const Tbody = React.forwardRef<TbodyRef, TbodyProps>((props, ref) => {
  const { as: Component = "tbody", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Tbody.displayName = "Tbody";

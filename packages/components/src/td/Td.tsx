import React from "react";

import { type CommonComponentProps } from "../types";

export type TdRef = React.ComponentRef<"td">;

export interface TdProps
  extends React.ComponentPropsWithoutRef<"td">, CommonComponentProps {}

/** Render the table data cell component. */
export const Td = React.forwardRef<TdRef, TdProps>((props, ref) => {
  const { as: Component = "td", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Td.displayName = "Td";

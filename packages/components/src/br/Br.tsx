import React from "react";

import { type CommonComponentProps } from "../types";

export type BrRef = React.ComponentRef<"br">;

export interface BrProps
  extends React.ComponentPropsWithoutRef<"br">, CommonComponentProps {}

/** Render the line break component. */
export const Br = React.forwardRef<BrRef, BrProps>((props, ref) => {
  const { as: Component = "br", ...rest } = props;

  return <Component ref={ref} {...rest} />;
});

Br.displayName = "Br";

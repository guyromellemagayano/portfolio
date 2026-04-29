import React from "react";

import { type CommonComponentProps } from "../types";

export type IRef = React.ComponentRef<"i">;

export interface IProps
  extends React.ComponentPropsWithoutRef<"i">, CommonComponentProps {}

/** Render the idiomatic text component. */
export const I = React.forwardRef<IRef, IProps>((props, ref) => {
  const { as: Component = "i", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

I.displayName = "I";

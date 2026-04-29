import React from "react";

import { type CommonComponentProps } from "../types";

export type BodyRef = React.ComponentRef<"body">;

export interface BodyProps
  extends React.ComponentPropsWithoutRef<"body">, CommonComponentProps {}

/** Render the default body component. */
export const Body = React.forwardRef<BodyRef, BodyProps>((props, ref) => {
  const { as: Component = "body", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Body.displayName = "Body";

import React from "react";

import { type CommonComponentProps } from "../types";

export type RubyRef = React.ComponentRef<"ruby">;

export interface RubyProps
  extends React.ComponentPropsWithoutRef<"ruby">, CommonComponentProps {}

/** Render the ruby annotation component. */
export const Ruby = React.forwardRef<RubyRef, RubyProps>((props, ref) => {
  const { as: Component = "ruby", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Ruby.displayName = "Ruby";

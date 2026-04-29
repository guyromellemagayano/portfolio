import React from "react";

import { type CommonComponentProps } from "../types";

export type StyleRef = React.ComponentRef<"style">;

export interface StyleProps
  extends React.ComponentPropsWithoutRef<"style">, CommonComponentProps {}

/** Render the style information component. */
export const Style = React.forwardRef<StyleRef, StyleProps>((props, ref) => {
  const { as: Component = "style", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Style.displayName = "Style";

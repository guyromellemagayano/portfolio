import React from "react";

import { type CommonComponentProps } from "../types";

export type URef = React.ComponentRef<"u">;

export interface UProps
  extends React.ComponentPropsWithoutRef<"u">, CommonComponentProps {}

/** Render the unarticulated annotation (underline) component. */
export const U = React.forwardRef<URef, UProps>((props, ref) => {
  const { as: Component = "u", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

U.displayName = "U";

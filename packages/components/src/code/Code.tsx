import React from "react";

import { type CommonComponentProps } from "../types";

export type CodeRef = React.ComponentRef<"code">;

export interface CodeProps
  extends React.ComponentPropsWithoutRef<"code">, CommonComponentProps {}

/** Render the code component. */
export const Code = React.forwardRef<CodeRef, CodeProps>((props, ref) => {
  const { as: Component = "code", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Code.displayName = "Code";

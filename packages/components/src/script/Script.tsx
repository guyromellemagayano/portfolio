import React from "react";

import { type CommonComponentProps } from "../types";

export type ScriptRef = React.ComponentRef<"script">;

export interface ScriptProps
  extends React.ComponentPropsWithoutRef<"script">, CommonComponentProps {}

/** Render the script component. */
export const Script = React.forwardRef<ScriptRef, ScriptProps>((props, ref) => {
  const { as: Component = "script", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Script.displayName = "Script";

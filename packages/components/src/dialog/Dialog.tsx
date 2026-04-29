import React from "react";

import { type CommonComponentProps } from "../types";

export type DialogRef = React.ComponentRef<"dialog">;

export interface DialogProps
  extends React.ComponentPropsWithoutRef<"dialog">, CommonComponentProps {}

/** Render the dialog component. */
export const Dialog = React.forwardRef<DialogRef, DialogProps>((props, ref) => {
  const { as: Component = "dialog", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Dialog.displayName = "Dialog";

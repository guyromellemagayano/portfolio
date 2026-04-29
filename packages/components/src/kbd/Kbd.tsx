import React from "react";

import { type CommonComponentProps } from "../types";

export type KbdRef = React.ComponentRef<"kbd">;

export interface KbdProps
  extends React.ComponentPropsWithoutRef<"kbd">, CommonComponentProps {}

/** Render the keyboard input component. */
export const Kbd = React.forwardRef<KbdRef, KbdProps>((props, ref) => {
  const { as: Component = "kbd", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Kbd.displayName = "Kbd";

import React from "react";

import { type CommonComponentProps } from "../types";

export type EmbedRef = React.ComponentRef<"embed">;

export interface EmbedProps
  extends React.ComponentPropsWithoutRef<"embed">, CommonComponentProps {}

/** Render the embed external content component. */
export const Embed = React.forwardRef<EmbedRef, EmbedProps>((props, ref) => {
  const { as: Component = "embed", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Embed.displayName = "Embed";

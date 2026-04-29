import React from "react";

import { type CommonComponentProps } from "../types";

export type SpanRef = React.ComponentRef<"span">;

export interface SpanProps
  extends React.ComponentPropsWithoutRef<"span">, CommonComponentProps {}

/** Render the content span component. */
export const Span = React.forwardRef<SpanRef, SpanProps>((props, ref) => {
  const { as: Component = "span", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Span.displayName = "Span";

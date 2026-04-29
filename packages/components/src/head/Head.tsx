import React from "react";

import { type CommonComponentProps } from "../types";

export type HeadRef = React.ComponentRef<"head">;

export interface HeadProps
  extends React.ComponentPropsWithoutRef<"head">, CommonComponentProps {}

/** Render the document metadata (header) component. */
export const Head = React.forwardRef<HeadRef, HeadProps>((props, ref) => {
  const { as: Component = "head", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Head.displayName = "Head";

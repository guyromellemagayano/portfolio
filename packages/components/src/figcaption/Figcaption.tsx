import React from "react";

import { type CommonComponentProps } from "../types";

export type FigcaptionRef = React.ComponentRef<"figcaption">;

export interface FigcaptionProps
  extends React.ComponentPropsWithoutRef<"figcaption">, CommonComponentProps {}

/** Render the figure caption component. */
export const Figcaption = React.forwardRef<FigcaptionRef, FigcaptionProps>(
  (props, ref) => {
    const { as: Component = "figcaption", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Figcaption.displayName = "Figcaption";

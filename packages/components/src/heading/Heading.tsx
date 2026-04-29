import React from "react";

import { type CommonComponentProps } from "../types";

export type HeadingRef = React.ComponentRef<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

export interface HeadingProps
  extends
    React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">,
    CommonComponentProps {}

/** Render the HTML section heading component. */
export const Heading = React.forwardRef<HeadingRef, HeadingProps>(
  (props, ref) => {
    const { as: Component = "h1" as const, children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

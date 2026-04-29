import React from "react";

import { type CommonComponentProps } from "../types";

export type FooterRef = React.ComponentRef<"footer">;

export interface FooterProps
  extends React.ComponentPropsWithoutRef<"footer">, CommonComponentProps {}

/** Render the footer component. */
export const Footer = React.forwardRef<FooterRef, FooterProps>((props, ref) => {
  const { as: Component = "footer", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Footer.displayName = "Footer";

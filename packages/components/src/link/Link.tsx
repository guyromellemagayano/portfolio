import React from "react";

import { type CommonComponentProps } from "../types";

export type LinkRef = React.ComponentRef<"link">;

export interface LinkProps
  extends
    Omit<React.ComponentPropsWithoutRef<"link">, "as">,
    CommonComponentProps {}

/** Render the external resource link component. */
export const Link = React.forwardRef<LinkRef, LinkProps>((props, ref) => {
  const { as: Component = "link", ...rest } = props;

  return <Component ref={ref} {...rest} />;
});

Link.displayName = "Link";

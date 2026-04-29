import React from "react";

import { type CommonComponentProps } from "../types";

export type HtmlRef = React.ComponentRef<"html">;

export interface HtmlProps
  extends React.ComponentPropsWithoutRef<"html">, CommonComponentProps {}

/** Render the HTML document/root component. */
export const Html = React.forwardRef<HtmlRef, HtmlProps>((props, ref) => {
  const { as: Component = "html", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Html.displayName = "Html";

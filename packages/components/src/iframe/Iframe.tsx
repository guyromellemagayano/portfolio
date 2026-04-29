import React from "react";

import { type CommonComponentProps } from "../types";

export type IframeRef = React.ComponentRef<"iframe">;

export interface IframeProps
  extends React.ComponentPropsWithoutRef<"iframe">, CommonComponentProps {}

/** Render the inline frame component. */
export const Iframe = React.forwardRef<IframeRef, IframeProps>((props, ref) => {
  const { as: Component = "iframe", ...rest } = props;

  return <Component ref={ref} {...rest} />;
});

Iframe.displayName = "Iframe";

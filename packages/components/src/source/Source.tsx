import React from "react";

import { type CommonComponentProps } from "../types";

export type SourceRef = React.ComponentRef<"source">;

export interface SourceProps
  extends React.ComponentPropsWithoutRef<"source">, CommonComponentProps {}

/** Render the media or image source component. */
export const Source = React.forwardRef<SourceRef, SourceProps>((props, ref) => {
  const { as: Component = "source", ...rest } = props;

  return <Component ref={ref} {...rest} />;
});

Source.displayName = "Source";

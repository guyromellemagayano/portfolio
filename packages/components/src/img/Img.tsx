import React from "react";

import { type CommonComponentProps } from "../types";

export type ImgRef = React.ComponentRef<"img">;

export interface ImgProps
  extends React.ComponentPropsWithoutRef<"img">, CommonComponentProps {}

/** Render the image embed component. */
export const Img = React.forwardRef<ImgRef, ImgProps>((props, ref) => {
  const { as: Component = "img", src = "#", alt = "", ...rest } = props;

  return <Component ref={ref} src={src} alt={alt} {...rest} />;
});

Img.displayName = "Img";

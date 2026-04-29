import React from "react";

import { type CommonComponentProps } from "../types";

export type PictureRef = React.ComponentRef<"picture">;

export interface PictureProps
  extends React.ComponentPropsWithoutRef<"picture">, CommonComponentProps {}

/** Render the picture component. */
export const Picture = React.forwardRef<PictureRef, PictureProps>(
  (props, ref) => {
    const { as: Component = "picture", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Picture.displayName = "Picture";

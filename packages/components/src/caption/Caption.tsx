import React from "react";

import { type CommonComponentProps } from "../types";

export type CaptionRef = React.ComponentRef<"caption">;

export interface CaptionProps
  extends React.ComponentPropsWithoutRef<"caption">, CommonComponentProps {}

/** Render the caption component. */
export const Caption = React.forwardRef<CaptionRef, CaptionProps>(
  (props, ref) => {
    const { as: Component = "caption", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Caption.displayName = "Caption";

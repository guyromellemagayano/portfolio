import React from "react";

import { type CommonComponentProps } from "../types";

export type ProgressRef = React.ComponentRef<"progress">;

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<"progress">, CommonComponentProps {}

/** Render the progress indicator component. */
export const Progress = React.forwardRef<ProgressRef, ProgressProps>(
  (props, ref) => {
    const { as: Component = "progress", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Progress.displayName = "Progress";

import React from "react";

import { type CommonComponentProps } from "../types";

export type SummaryRef = React.ComponentRef<"summary">;

export interface SummaryProps
  extends React.ComponentPropsWithoutRef<"summary">, CommonComponentProps {}

/** Render the disclosure summary component. */
export const Summary = React.forwardRef<SummaryRef, SummaryProps>(
  (props, ref) => {
    const { as: Component = "summary", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Summary.displayName = "Summary";

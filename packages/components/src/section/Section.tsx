import React from "react";

import { type CommonComponentProps } from "../types";

export type SectionRef = React.ComponentRef<"section">;

export interface SectionProps
  extends React.ComponentPropsWithoutRef<"section">, CommonComponentProps {}

/** Render the generic section component. */
export const Section = React.forwardRef<SectionRef, SectionProps>(
  (props, ref) => {
    const { as: Component = "section", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Section.displayName = "Section";

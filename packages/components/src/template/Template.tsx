import React from "react";

import { type CommonComponentProps } from "../types";

export type TemplateRef = React.ComponentRef<"template">;

export interface TemplateProps
  extends React.ComponentPropsWithoutRef<"template">, CommonComponentProps {}

/** Render the content template component. */
export const Template = React.forwardRef<TemplateRef, TemplateProps>(
  (props, ref) => {
    const { as: Component = "template", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Template.displayName = "Template";

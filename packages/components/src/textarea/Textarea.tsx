import React from "react";

import { type CommonComponentProps } from "../types";

export type TextareaRef = React.ComponentRef<"textarea">;

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<"textarea">, CommonComponentProps {}

/** Render the textarea component. */
export const Textarea = React.forwardRef<TextareaRef, TextareaProps>(
  (props, ref) => {
    const { as: Component = "textarea", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Textarea.displayName = "Textarea";

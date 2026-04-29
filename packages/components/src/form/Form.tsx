import React from "react";

import { type CommonComponentProps } from "../types";

export type FormRef = React.ComponentRef<"form">;

export interface FormProps
  extends React.ComponentPropsWithoutRef<"form">, CommonComponentProps {}

/** Render the form component. */
export const Form = React.forwardRef<FormRef, FormProps>((props, ref) => {
  const { as: Component = "form", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Form.displayName = "Form";

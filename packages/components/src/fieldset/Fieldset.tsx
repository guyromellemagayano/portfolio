import React from "react";

import { type CommonComponentProps } from "../types";

export type FieldsetRef = React.ComponentRef<"fieldset">;

export interface FieldsetProps
  extends React.ComponentPropsWithoutRef<"fieldset">, CommonComponentProps {}

/** Render the field set component. */
export const Fieldset = React.forwardRef<FieldsetRef, FieldsetProps>(
  (props, ref) => {
    const { as: Component = "fieldset", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Fieldset.displayName = "Fieldset";

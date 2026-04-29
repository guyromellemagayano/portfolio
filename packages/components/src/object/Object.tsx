import React from "react";

import { type CommonComponentProps } from "../types";

export type ObjectRef = React.ComponentRef<"object">;

export interface ObjectProps
  extends React.ComponentPropsWithoutRef<"object">, CommonComponentProps {}

/** Render the object component. */
export const Object = React.forwardRef<ObjectRef, ObjectProps>((props, ref) => {
  const { as: Component = "object", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Object.displayName = "Object";

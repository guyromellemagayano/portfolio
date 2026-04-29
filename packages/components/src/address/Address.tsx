import React from "react";

import { type CommonComponentProps } from "../types";

export type AddressRef = React.ComponentRef<"address">;

export interface AddressProps
  extends React.ComponentPropsWithoutRef<"address">, CommonComponentProps {}

/** Render the address component. */
export const Address = React.forwardRef<AddressRef, AddressProps>(
  (props, ref) => {
    const { as: Component = "address", children, ...rest } = props;

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Address.displayName = "Address";

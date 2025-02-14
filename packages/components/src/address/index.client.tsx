"use client";

import { forwardRef } from "react";

import type { AddressProps, AddressRef } from ".";

/**
 * Render the address client component.
 * @param {AddressProps} props - The address client component properties
 * @param {AddressRef} ref - The address client component reference
 * @returns The rendered address client component
 */
const AddressClient = forwardRef<AddressRef, AddressProps>(
  ({ children, ...rest }, ref) => {
    return (
      <abbr ref={ref} {...rest}>
        {children}
      </abbr>
    );
  }
);

AddressClient.displayName = "AddressClient";

export default AddressClient;

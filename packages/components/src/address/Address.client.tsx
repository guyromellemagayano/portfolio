"use client";

import { forwardRef } from "react";

import type { AddressProps, AddressRef } from "./Address";

/**
 * Render the address client component.
 * @param {AddressProps} props - The address client component properties
 * @param {AddressRef} ref - The address client component reference
 * @returns The rendered address client component
 */
export const AddressClient = forwardRef<AddressRef, AddressProps>(
  ({ children, ...rest }, ref) => {
    return (
      <address ref={ref} {...rest}>
        {children}
      </address>
    );
  }
);

AddressClient.displayName = "AddressClient";

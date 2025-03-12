"use client";

import { forwardRef } from "react";

import type {
  AbbrProps,
  AbbrRef,
  AddressProps,
  AddressRef,
  AProps,
  ARef,
} from ".";

/**
 * Render the anchor client component.
 * @param {AProps} props - The anchor client component properties
 * @param {ARef} ref - The anchor client component reference
 * @returns The rendered anchor client component
 */
export const AClient = forwardRef<ARef, AProps>(
  ({ children, ...rest }, ref) => {
    return (
      <a ref={ref} {...rest}>
        {children}
      </a>
    );
  }
);

AClient.displayName = "AClient";

/**
 * Render the abbreviation client component.
 * @param {AbbrProps} props - The abbreviation client component properties
 * @param {AbbrRef} ref - The abbreviation client component reference
 * @returns The rendered abbreviation client component
 */
export const AbbrClient = forwardRef<AbbrRef, AbbrProps>(
  ({ children, ...rest }, ref) => {
    return (
      <abbr ref={ref} {...rest}>
        {children}
      </abbr>
    );
  }
);

AbbrClient.displayName = "AbbrClient";

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

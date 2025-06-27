"use client";

import React, { memo } from "react";

import { Address, type AddressProps, type AddressRef } from ".";

/**
 * Client-side address component.
 * For most use cases, the server component should be sufficient.
 * This exists for cases where client-side interactivity is specifically needed.
 */
export const AddressClient = React.forwardRef<AddressRef, AddressProps>(
  (props, ref) => {
    // Simply delegate to the main component
    // The main component already handles all optimizations
    return <Address ref={ref} {...props} />;
  }
);

AddressClient.displayName = "AddressClient";

// Memoized version for cases where props change frequently
export const MemoizedAddressClient = memo(AddressClient);

// Export default for convenience
export default AddressClient;

"use client";

import React, { memo } from "react";

import { Address, type AddressProps, type AddressRef } from ".";

/** Render the address client component. */
export const AddressClient = React.forwardRef<AddressRef, AddressProps>(
  (props, ref) => <Address ref={ref} {...props} />
);

AddressClient.displayName = "AddressClient";

/** Memoized version of `AddressClient` for performance optimization. */
export const MemoizedAddressClient = memo(AddressClient);

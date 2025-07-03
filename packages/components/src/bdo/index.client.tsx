"use client";

import React, { memo } from "react";

import { Bdo, type BdoProps, type BdoRef } from ".";

/**
 * Client-side bidirectional override component.
 * For most use cases, the server component should be sufficient.
 * This exists for cases where client-side interactivity is specifically needed.
 */
export const BdoClient = React.forwardRef<BdoRef, BdoProps>((props, ref) => {
  // Simply delegate to the main component
  // The main component already handles all optimizations
  return <Bdo ref={ref} {...props} />;
});

BdoClient.displayName = "BdoClient";

// Memoized version for cases where props change frequently
export const MemoizedBdoClient = memo(BdoClient);

// Export default for convenience
export default BdoClient;

"use client";

import React, { memo } from "react";

import { B, type BProps, type BRef } from ".";

/**
 * Client-side bring attention to component.
 * For most use cases, the server component should be sufficient.
 * This exists for cases where client-side interactivity is specifically needed.
 */
export const BClient = React.forwardRef<BRef, BProps>((props, ref) => {
  // Simply delegate to the main component
  // The main component already handles all optimizations
  return <B ref={ref} {...props} />;
});

BClient.displayName = "BClient";

// Memoized version for cases where props change frequently
export const MemoizedBClient = memo(BClient);

// Export default for convenience
export default BClient;

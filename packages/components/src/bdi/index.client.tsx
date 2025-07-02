"use client";

import React, { memo } from "react";

import { Bdi, type BdiProps, type BdiRef } from ".";

/**
 * Client-side bidirectional isolate component.
 * For most use cases, the server component should be sufficient.
 * This exists for cases where client-side interactivity is specifically needed.
 */
export const BdiClient = React.forwardRef<BdiRef, BdiProps>((props, ref) => {
  // Simply delegate to the main component
  // The main component already handles all optimizations
  return <Bdi ref={ref} {...props} />;
});

BdiClient.displayName = "BdiClient";

// Memoized version for cases where props change frequently
export const MemoizedBdiClient = memo(BdiClient);

// Export default for convenience
export default BdiClient;

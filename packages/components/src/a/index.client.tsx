"use client";

import React, { memo } from "react";

import { A, type AProps, type ARef } from ".";

/**
 * Client-side anchor component.
 * For most use cases, the server component should be sufficient.
 * This exists for cases where client-side interactivity is specifically needed.
 */
export const AClient = React.forwardRef<ARef, AProps>((props, ref) => {
  // Simply delegate to the main component
  // The main component already handles all optimizations
  return <A ref={ref} {...props} />;
});

AClient.displayName = "AClient";

// Memoized version for cases where props change frequently
export const MemoizedAClient = memo(AClient);

// Export default for convenience
export default AClient;

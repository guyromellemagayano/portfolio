"use client";

import React, { memo } from "react";

import { Abbr, type AbbrProps, type AbbrRef } from ".";

/**
 * Client-side abbreviation component.
 * For most use cases, the server component should be sufficient.
 * This exists for cases where client-side interactivity is specifically needed.
 */
export const AbbrClient = React.forwardRef<AbbrRef, AbbrProps>((props, ref) => {
  // Simply delegate to the main component
  // The main component already handles all optimizations
  return <Abbr ref={ref} {...props} />;
});

AbbrClient.displayName = "AbbrClient";

// Memoized version for cases where props change frequently
export const MemoizedAbbrClient = memo(AbbrClient);

// Export default for convenience
export default AbbrClient;

"use client";

import React, { memo } from "react";

import { Abbr, type AbbrProps, type AbbrRef } from ".";

/**
 * Client-side `abbr` component with enhanced interactivity.
 */
export const AbbrClient = React.forwardRef<AbbrRef, AbbrProps>((props, ref) => {
  // Simply delegate to the main component
  // The main component already handles all optimizations
  return <Abbr ref={ref} {...props} />;
});

AbbrClient.displayName = "AbbrClient";

/**
 * Memoized version of `AbbrClient` for performance optimization.
 */
export const MemoizedAbbrClient = memo(AbbrClient);

MemoizedAbbrClient.displayName = "MemoizedAbbrClient";

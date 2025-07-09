"use client";

import React, { memo } from "react";

import { A, type AProps, type ARef } from ".";

/**
 * Client-side `a` component with enhanced interactivity.
 */
export const AClient = React.forwardRef<ARef, AProps>((props, ref) => {
  // Simply delegate to the main component
  // The main component already handles all optimizations
  return <A ref={ref} {...props} />;
});

AClient.displayName = "AClient";

/**
 * Memoized version of `AClient` for performance optimization.
 */
export const MemoizedAClient = memo(AClient);

MemoizedAClient.displayName = "MemoizedAClient";

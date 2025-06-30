"use client";

import React, { memo } from "react";

import { Area, type AreaProps, type AreaRef } from ".";

/**
 * Client-side area component.
 * For most use cases, the server component should be sufficient.
 * This exists for cases where client-side interactivity is specifically needed.
 */
export const AreaClient = React.forwardRef<AreaRef, AreaProps>((props, ref) => {
  // Simply delegate to the main component
  // The main component already handles all optimizations
  return <Area ref={ref} {...props} />;
});

AreaClient.displayName = "AreaClient";

// Memoized version for cases where props change frequently
export const MemoizedAreaClient = memo(AreaClient);

// Export default for convenience
export default AreaClient;

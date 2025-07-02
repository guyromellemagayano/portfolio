"use client";

import React, { memo } from "react";

import { Base, type BaseProps, type BaseRef } from ".";

/**
 * Client-side base component.
 * For most use cases, the server component should be sufficient.
 * This exists for cases where client-side interactivity is specifically needed.
 */
export const BaseClient = React.forwardRef<BaseRef, BaseProps>((props, ref) => {
  // Simply delegate to the main component
  // The main component already handles all optimizations
  return <Base ref={ref} {...props} />;
});

BaseClient.displayName = "BaseClient";

// Memoized version for cases where props change frequently
export const MemoizedBaseClient = memo(BaseClient);

// Export default for convenience
export default BaseClient;

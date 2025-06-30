"use client";

import React, { memo } from "react";

import { Aside, type AsideProps, type AsideRef } from ".";

/**
 * Client-side aside component.
 * For most use cases, the server component should be sufficient.
 * This exists for cases where client-side interactivity is specifically needed.
 */
export const AsideClient = React.forwardRef<AsideRef, AsideProps>(
  (props, ref) => {
    // Simply delegate to the main component
    // The main component already handles all optimizations
    return <Aside ref={ref} {...props} />;
  }
);

AsideClient.displayName = "AsideClient";

// Memoized version for cases where props change frequently
export const MemoizedAsideClient = memo(AsideClient);

// Export default for convenience
export default AsideClient;

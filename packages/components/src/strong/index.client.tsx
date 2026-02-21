"use client";

import React, { memo } from "react";

import { Strong, type StrongProps, type StrongRef } from ".";

/** Render the strong importance client component. */
export const StrongClient = React.forwardRef<StrongRef, StrongProps>(
  (props, ref) => <Strong ref={ref} {...props} />
);

StrongClient.displayName = "StrongClient";

/** Memoized version of `StrongClient` for performance optimization. */
export const MemoizedStrongClient = memo(StrongClient);

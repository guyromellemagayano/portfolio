"use client";

import React, { memo } from "react";

import { Br, type BrProps, type BrRef } from ".";

/** Render the line break client component. */
export const BrClient = React.forwardRef<BrRef, BrProps>((props, ref) => (
  <Br ref={ref} {...props} />
));

BrClient.displayName = "BrClient";

/** Memoized version of `BrClient` for performance optimization. */
export const MemoizedBrClient = memo(BrClient);

"use client";

import React, { memo } from "react";

import { B, type BProps, type BRef } from ".";

/** Render the bring attention client component. */
export const BClient = React.forwardRef<BRef, BProps>((props, ref) => (
  <B ref={ref} {...props} />
));

BClient.displayName = "BClient";

/** Memoized version of `BClient` for performance optimization. */
export const MemoizedBClient = memo(BClient);

"use client";

import React, { memo } from "react";

import { Wbr, type WbrProps, type WbrRef } from ".";

/** Render the word break opportunity client component. */
export const WbrClient = React.forwardRef<WbrRef, WbrProps>((props, ref) => (
  <Wbr ref={ref} {...props} />
));

WbrClient.displayName = "WbrClient";

/** Memoized version of `WbrClient` for performance optimization. */
export const MemoizedWbrClient = memo(WbrClient);

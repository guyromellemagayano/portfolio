"use client";

import React, { memo } from "react";

import { Del, type DelProps, type DelRef } from ".";

/** Render the deleted text client component. */
export const DelClient = React.forwardRef<DelRef, DelProps>((props, ref) => (
  <Del ref={ref} {...props} />
));

DelClient.displayName = "DelClient";

/** Memoized version of `DelClient` for performance optimization. */
export const MemoizedDelClient = memo(DelClient);

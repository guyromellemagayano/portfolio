"use client";

import React, { memo } from "react";

import { Bdi, type BdiProps, type BdiRef } from ".";

/** Render the bidirectional isolate client component. */
export const BdiClient = React.forwardRef<BdiRef, BdiProps>((props, ref) => (
  <Bdi ref={ref} {...props} />
));

BdiClient.displayName = "BdiClient";

/** Memoized version of `BdiClient` for performance optimization. */
export const MemoizedBdiClient = memo(BdiClient);

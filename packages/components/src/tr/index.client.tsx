"use client";

import React, { memo } from "react";

import { Tr, type TrProps, type TrRef } from ".";

/** Render the table row client component. */
export const TrClient = React.forwardRef<TrRef, TrProps>((props, ref) => (
  <Tr ref={ref} {...props} />
));

TrClient.displayName = "TrClient";

/** Memoized version of `TrClient` for performance optimization. */
export const MemoizedTrClient = memo(TrClient);

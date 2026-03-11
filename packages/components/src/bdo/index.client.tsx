"use client";

import React, { memo } from "react";

import { Bdo, type BdoProps, type BdoRef } from ".";

/** Render the bidirectional text override client component. */
export const BdoClient = React.forwardRef<BdoRef, BdoProps>((props, ref) => (
  <Bdo ref={ref} {...props} />
));

BdoClient.displayName = "BdoClient";

/** Memoized version of `BdoClient` for performance optimization. */
export const MemoizedBdoClient = memo(BdoClient);

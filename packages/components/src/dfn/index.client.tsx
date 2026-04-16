"use client";

import React, { memo } from "react";

import { Dfn, type DfnProps, type DfnRef } from ".";

/** Render the definition element client component. */
export const DfnClient = React.forwardRef<DfnRef, DfnProps>((props, ref) => (
  <Dfn ref={ref} {...props} />
));

DfnClient.displayName = "DfnClient";

/** Memoized version of `DfnClient` for performance optimization. */
export const MemoizedDfnClient = memo(DfnClient);

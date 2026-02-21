"use client";

import React, { memo } from "react";

import { Dd, type DdProps, type DdRef } from ".";

/** Render the description details client component. */
export const DdClient = React.forwardRef<DdRef, DdProps>((props, ref) => (
  <Dd ref={ref} {...props} />
));

DdClient.displayName = "DdClient";

/** Memoized version of `DdClient` for performance optimization. */
export const MemoizedDdClient = memo(DdClient);

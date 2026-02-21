"use client";

import React, { memo } from "react";

import { Td, type TdProps, type TdRef } from ".";

/** Render the table data cell client component. */
export const TdClient = React.forwardRef<TdRef, TdProps>((props, ref) => (
  <Td ref={ref} {...props} />
));

TdClient.displayName = "TdClient";

/** Memoized version of `TdClient` for performance optimization. */
export const MemoizedTdClient = memo(TdClient);

"use client";

import React, { memo } from "react";

import { Legend, type LegendProps, type LegendRef } from ".";

/** Render the field set legend client component. */
export const LegendClient = React.forwardRef<LegendRef, LegendProps>(
  (props, ref) => <Legend ref={ref} {...props} />
);

LegendClient.displayName = "LegendClient";

/** Memoized version of `LegendClient` for performance optimization. */
export const MemoizedLegendClient = memo(LegendClient);

"use client";

import React, { memo } from "react";

import { Time, type TimeProps, type TimeRef } from ".";

/** Render the (date) time client component. */
export const TimeClient = React.forwardRef<TimeRef, TimeProps>((props, ref) => (
  <Time ref={ref} {...props} />
));

TimeClient.displayName = "TimeClient";

/** Memoized version of `TimeClient` for performance optimization. */
export const MemoizedTimeClient = memo(TimeClient);

"use client";

import React, { memo } from "react";

import { Progress, type ProgressProps, type ProgressRef } from ".";

/** Render the progress indicator client component. */
export const ProgressClient = React.forwardRef<ProgressRef, ProgressProps>(
  (props, ref) => <Progress ref={ref} {...props} />
);

ProgressClient.displayName = "ProgressClient";

/** Memoized version of `ProgressClient` for performance optimization. */
export const MemoizedProgressClient = memo(ProgressClient);

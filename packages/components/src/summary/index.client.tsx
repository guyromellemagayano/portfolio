"use client";

import React, { memo } from "react";

import { Summary, type SummaryProps, type SummaryRef } from ".";

/** Render the disclosure summary client component. */
export const SummaryClient = React.forwardRef<SummaryRef, SummaryProps>(
  (props, ref) => <Summary ref={ref} {...props} />
);

SummaryClient.displayName = "SummaryClient";

/** Memoized version of `SummaryClient` for performance optimization. */
export const MemoizedSummaryClient = memo(SummaryClient);

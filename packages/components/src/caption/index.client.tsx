"use client";

import React, { memo } from "react";

import { Caption, type CaptionProps, type CaptionRef } from ".";

/** Render the caption client component. */
export const CaptionClient = React.forwardRef<CaptionRef, CaptionProps>(
  (props, ref) => <Caption ref={ref} {...props} />
);

CaptionClient.displayName = "CaptionClient";

/** Memoized version of `CaptionClient` for performance optimization. */
export const MemoizedCaptionClient = memo(CaptionClient);

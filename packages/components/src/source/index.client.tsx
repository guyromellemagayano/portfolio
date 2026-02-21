"use client";

import React, { memo } from "react";

import { Source, type SourceProps, type SourceRef } from ".";

/** Render the media or image source client component. */
export const SourceClient = React.forwardRef<SourceRef, SourceProps>(
  (props, ref) => <Source ref={ref} {...props} />
);

SourceClient.displayName = "SourceClient";

/** Memoized version of `SourceClient` for performance optimization. */
export const MemoizedSourceClient = memo(SourceClient);

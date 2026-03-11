"use client";

import React, { memo } from "react";

import { Mark, type MarkProps, type MarkRef } from ".";

/** Render the mark text client component. */
export const MarkClient = React.forwardRef<MarkRef, MarkProps>((props, ref) => (
  <Mark ref={ref} {...props} />
));

MarkClient.displayName = "MarkClient";

/** Memoized version of `MarkClient` for performance optimization. */
export const MemoizedMarkClient = memo(MarkClient);

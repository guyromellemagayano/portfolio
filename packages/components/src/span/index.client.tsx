"use client";

import React, { memo } from "react";

import { Span, type SpanProps, type SpanRef } from ".";

/** Render the content span client component. */
export const SpanClient = React.forwardRef<SpanRef, SpanProps>((props, ref) => (
  <Span ref={ref} {...props} />
));

SpanClient.displayName = "SpanClient";

/** Memoized version of `SpanClient` for performance optimization. */
export const MemoizedSpanClient = memo(SpanClient);

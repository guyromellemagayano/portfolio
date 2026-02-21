"use client";

import React, { memo } from "react";

import { Tfoot, type TfootProps, type TfootRef } from ".";

/** Render the table foot client component. */
export const TfootClient = React.forwardRef<TfootRef, TfootProps>(
  (props, ref) => <Tfoot ref={ref} {...props} />
);

TfootClient.displayName = "TfootClient";

/** Memoized version of `TfootClient` for performance optimization. */
export const MemoizedTfootClient = memo(TfootClient);

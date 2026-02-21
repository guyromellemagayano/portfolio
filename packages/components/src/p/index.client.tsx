"use client";

import React, { memo } from "react";

import { P, type PProps, type PRef } from ".";

/** Render the paragraph client component. */
export const PClient = React.forwardRef<PRef, PProps>((props, ref) => (
  <P ref={ref} {...props} />
));

PClient.displayName = "PClient";

/** Memoized version of `PClient` for performance optimization. */
export const MemoizedPClient = memo(PClient);

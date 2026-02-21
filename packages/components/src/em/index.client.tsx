"use client";

import React, { memo } from "react";

import { Em, type EmProps, type EmRef } from ".";

/** Render the emphasis client component. */
export const EmClient = React.forwardRef<EmRef, EmProps>((props, ref) => (
  <Em ref={ref} {...props} />
));

EmClient.displayName = "EmClient";

/** Memoized version of `EmClient` for performance optimization. */
export const MemoizedEmClient = memo(EmClient);

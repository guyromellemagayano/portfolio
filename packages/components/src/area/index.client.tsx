"use client";

import React, { memo } from "react";

import { Area, type AreaProps, type AreaRef } from ".";

/** Render the area client component. */
export const AreaClient = React.forwardRef<AreaRef, AreaProps>((props, ref) => (
  <Area ref={ref} {...props} />
));

AreaClient.displayName = "AreaClient";

/** Memoized version of `AreaClient` for performance optimization. */
export const MemoizedAreaClient = memo(AreaClient);

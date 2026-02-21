"use client";

import React, { memo } from "react";

import { Th, type ThProps, type ThRef } from ".";

/** Render the table header client component. */
export const ThClient = React.forwardRef<ThRef, ThProps>((props, ref) => (
  <Th ref={ref} {...props} />
));

ThClient.displayName = "ThClient";

/** Memoized version of `ThClient` for performance optimization. */
export const MemoizedThClient = memo(ThClient);

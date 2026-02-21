"use client";

import React, { memo } from "react";

import { Li, type LiProps, type LiRef } from ".";

/** Render the list item client component. */
export const LiClient = React.forwardRef<LiRef, LiProps>((props, ref) => (
  <Li ref={ref} {...props} />
));

LiClient.displayName = "LiClient";

/** Memoized version of `LiClient` for performance optimization. */
export const MemoizedLiClient = memo(LiClient);

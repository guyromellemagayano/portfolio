"use client";

import React, { memo } from "react";

import { Rp, type RpProps, type RpRef } from ".";

/** Render the ruby fallback parenthesis client component. */
export const RpClient = React.forwardRef<RpRef, RpProps>((props, ref) => (
  <Rp ref={ref} {...props} />
));

RpClient.displayName = "RpClient";

/** Memoized version of `RpClient` for performance optimization. */
export const MemoizedRpClient = memo(RpClient);

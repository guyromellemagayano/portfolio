"use client";

import React, { memo } from "react";

import { Rt, type RtProps, type RtRef } from ".";

/** Render the ruby text client component. */
export const RtClient = React.forwardRef<RtRef, RtProps>((props, ref) => (
  <Rt ref={ref} {...props} />
));

RtClient.displayName = "RtClient";

/** Memoized version of `RtClient` for performance optimization. */
export const MemoizedRtClient = memo(RtClient);

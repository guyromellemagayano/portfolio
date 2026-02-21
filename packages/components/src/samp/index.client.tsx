"use client";

import React, { memo } from "react";

import { Samp, type SampProps, type SampRef } from ".";

/** Render the sample output client component. */
export const SampClient = React.forwardRef<SampRef, SampProps>((props, ref) => (
  <Samp ref={ref} {...props} />
));

SampClient.displayName = "SampClient";

/** Memoized version of `SampClient` for performance optimization. */
export const MemoizedSampClient = memo(SampClient);

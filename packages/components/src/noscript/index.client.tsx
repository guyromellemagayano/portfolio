"use client";

import React, { memo } from "react";

import { Noscript, type NoscriptProps, type NoscriptRef } from ".";

/** Render the noscript client component. */
export const NoscriptClient = React.forwardRef<NoscriptRef, NoscriptProps>(
  (props, ref) => <Noscript ref={ref} {...props} />
);

NoscriptClient.displayName = "NoscriptClient";

/** Memoized version of `NoscriptClient` for performance optimization. */
export const MemoizedNoscriptClient = memo(NoscriptClient);

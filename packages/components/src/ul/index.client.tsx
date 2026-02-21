"use client";

import React, { memo } from "react";

import { Ul, type UlProps, type UlRef } from ".";

/** Render the unordered list client component. */
export const UlClient = React.forwardRef<UlRef, UlProps>((props, ref) => (
  <Ul ref={ref} {...props} />
));

UlClient.displayName = "UlClient";

/** Memoized version of `UlClient` for performance optimization. */
export const MemoizedUlClient = memo(UlClient);

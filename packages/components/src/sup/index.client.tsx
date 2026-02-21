"use client";

import React, { memo } from "react";

import { Sup, type SupProps, type SupRef } from ".";

/** Render the superscript client component. */
export const SupClient = React.forwardRef<SupRef, SupProps>((props, ref) => (
  <Sup ref={ref} {...props} />
));

SupClient.displayName = "SupClient";

/** Memoized version of `SupClient` for performance optimization. */
export const MemoizedSupClient = memo(SupClient);

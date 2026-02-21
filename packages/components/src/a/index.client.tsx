"use client";

import React, { memo } from "react";

import { A, type AProps, type ARef } from ".";

/** Render the anchor client component. */
export const AClient = React.forwardRef<ARef, AProps>((props, ref) => (
  <A ref={ref} {...props} />
));

AClient.displayName = "AClient";

/** Memoized version of `AClient` for performance optimization. */
export const MemoizedAClient = memo(AClient);

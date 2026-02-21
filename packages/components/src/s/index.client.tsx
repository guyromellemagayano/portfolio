"use client";

import React, { memo } from "react";

import { S, type SProps, type SRef } from ".";

/** Render the strikethrough client component. */
export const SClient = React.forwardRef<SRef, SProps>((props, ref) => (
  <S ref={ref} {...props} />
));

SClient.displayName = "SClient";

/** Memoized version of `SClient` for performance optimization. */
export const MemoizedSClient = memo(SClient);

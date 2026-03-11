"use client";

import React, { memo } from "react";

import { Ins, type InsProps, type InsRef } from ".";

/** Render the inserted text client component. */
export const InsClient = React.forwardRef<InsRef, InsProps>((props, ref) => (
  <Ins ref={ref} {...props} />
));

InsClient.displayName = "InsClient";

/** Memoized version of `InsClient` for performance optimization. */
export const MemoizedInsClient = memo(InsClient);

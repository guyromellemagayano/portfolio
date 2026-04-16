"use client";

import React, { memo } from "react";

import { Hr, type HrProps, type HrRef } from ".";

/** Render the thematic break (horizontal rule) client component. */
export const HrClient = React.forwardRef<HrRef, HrProps>((props, ref) => (
  <Hr ref={ref} {...props} />
));

HrClient.displayName = "HrClient";

/** Memoized version of `HrClient` for performance optimization. */
export const MemoizedHrClient = memo(HrClient);

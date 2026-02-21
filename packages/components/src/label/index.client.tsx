"use client";

import React, { memo } from "react";

import { Label, type LabelProps, type LabelRef } from ".";

/** Render the label client component. */
export const LabelClient = React.forwardRef<LabelRef, LabelProps>(
  (props, ref) => <Label ref={ref} {...props} />
);

LabelClient.displayName = "LabelClient";

/** Memoized version of `LabelClient` for performance optimization. */
export const MemoizedLabelClient = memo(LabelClient);

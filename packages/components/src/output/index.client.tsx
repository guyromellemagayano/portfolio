"use client";

import React, { memo } from "react";

import { Output, type OutputProps, type OutputRef } from ".";

/** Render the output client component. */
export const OutputClient = React.forwardRef<OutputRef, OutputProps>(
  (props, ref) => <Output ref={ref} {...props} />
);

OutputClient.displayName = "OutputClient";

/** Memoized version of `OutputClient` for performance optimization. */
export const MemoizedOutputClient = memo(OutputClient);

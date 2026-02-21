"use client";

import React, { memo } from "react";

import { Option, type OptionProps, type OptionRef } from ".";

/** Render the HTML option client component. */
export const OptionClient = React.forwardRef<OptionRef, OptionProps>(
  (props, ref) => <Option ref={ref} {...props} />
);

OptionClient.displayName = "OptionClient";

/** Memoized version of `OptionClient` for performance optimization. */
export const MemoizedOptionClient = memo(OptionClient);

"use client";

import React, { memo } from "react";

import { Select, type SelectProps, type SelectRef } from ".";

/** Render the HTML select client component. */
export const SelectClient = React.forwardRef<SelectRef, SelectProps>(
  (props, ref) => <Select ref={ref} {...props} />
);

SelectClient.displayName = "SelectClient";

/** Memoized version of `SelectClient` for performance optimization. */
export const MemoizedSelectClient = memo(SelectClient);

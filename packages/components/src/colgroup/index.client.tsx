"use client";

import React, { memo } from "react";

import { Colgroup, type ColgroupProps, type ColgroupRef } from ".";

/** Render the table column group client component. */
export const ColgroupClient = React.forwardRef<ColgroupRef, ColgroupProps>(
  (props, ref) => <Colgroup ref={ref} {...props} />
);

ColgroupClient.displayName = "ColgroupClient";

/** Memoized version of `ColgroupClient` for performance optimization. */
export const MemoizedColgroupClient = memo(ColgroupClient);

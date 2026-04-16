"use client";

import React, { memo } from "react";

import { Hgroup, type HgroupProps, type HgroupRef } from ".";

/** Render the hgroup client component. */
export const HgroupClient = React.forwardRef<HgroupRef, HgroupProps>(
  (props, ref) => <Hgroup ref={ref} {...props} />
);

HgroupClient.displayName = "HgroupClient";

/** Memoized version of `HgroupClient` for performance optimization. */
export const MemoizedHgroupClient = memo(HgroupClient);

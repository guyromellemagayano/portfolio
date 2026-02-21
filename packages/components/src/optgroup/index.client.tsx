"use client";

import React, { memo } from "react";

import { Optgroup, type OptgroupProps, type OptgroupRef } from ".";

/** Render the option group client component. */
export const OptgroupClient = React.forwardRef<OptgroupRef, OptgroupProps>(
  (props, ref) => <Optgroup ref={ref} {...props} />
);

OptgroupClient.displayName = "OptgroupClient";

/** Memoized version of `OptgroupClient` for performance optimization. */
export const MemoizedOptgroupClient = memo(OptgroupClient);

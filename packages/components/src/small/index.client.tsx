"use client";

import React, { memo } from "react";

import { Small, type SmallProps, type SmallRef } from ".";

/** Render the side comment client component. */
export const SmallClient = React.forwardRef<SmallRef, SmallProps>(
  (props, ref) => <Small ref={ref} {...props} />
);

SmallClient.displayName = "SmallClient";

/** Memoized version of `SmallClient` for performance optimization. */
export const MemoizedSmallClient = memo(SmallClient);

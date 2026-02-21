"use client";

import React, { memo } from "react";

import { Thead, type TheadProps, type TheadRef } from ".";

/** Render the table head client component. */
export const TheadClient = React.forwardRef<TheadRef, TheadProps>(
  (props, ref) => <Thead ref={ref} {...props} />
);

TheadClient.displayName = "TheadClient";

/** Memoized version of `TheadClient` for performance optimization. */
export const MemoizedTheadClient = memo(TheadClient);

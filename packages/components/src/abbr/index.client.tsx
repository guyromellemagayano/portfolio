"use client";

import React, { memo } from "react";

import { Abbr, type AbbrProps, type AbbrRef } from ".";

/** Render the abbreviation client component. */
export const AbbrClient = React.forwardRef<AbbrRef, AbbrProps>((props, ref) => (
  <Abbr ref={ref} {...props} />
));

AbbrClient.displayName = "AbbrClient";

/** Memoized version of `AbbrClient` for performance optimization. */
export const MemoizedAbbrClient = memo(AbbrClient);

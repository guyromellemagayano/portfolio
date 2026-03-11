"use client";

import React, { memo } from "react";

import { Pre, type PreProps, type PreRef } from ".";

/** Render the preformatted text client component. */
export const PreClient = React.forwardRef<PreRef, PreProps>((props, ref) => (
  <Pre ref={ref} {...props} />
));

PreClient.displayName = "PreClient";

/** Memoized version of `PreClient` for performance optimization. */
export const MemoizedPreClient = memo(PreClient);

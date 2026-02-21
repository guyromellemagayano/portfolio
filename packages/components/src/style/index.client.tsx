"use client";

import React, { memo } from "react";

import { Style, type StyleProps, type StyleRef } from ".";

/** Render the style information client component. */
export const StyleClient = React.forwardRef<StyleRef, StyleProps>(
  (props, ref) => <Style ref={ref} {...props} />
);

StyleClient.displayName = "StyleClient";

/** Memoized version of `StyleClient` for performance optimization. */
export const MemoizedStyleClient = memo(StyleClient);

"use client";

import React, { memo } from "react";

import { Div, type DivProps, type DivRef } from ".";

/** Render the content division client component. */
export const DivClient = React.forwardRef<DivRef, DivProps>((props, ref) => (
  <Div ref={ref} {...props} />
));

DivClient.displayName = "DivClient";

/** Memoized version of `DivClient` for performance optimization. */
export const MemoizedDivClient = memo(DivClient);

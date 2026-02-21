"use client";

import React, { memo } from "react";

import { Figure, type FigureProps, type FigureRef } from ".";

/** Render the figure with optional caption client component. */
export const FigureClient = React.forwardRef<FigureRef, FigureProps>(
  (props, ref) => <Figure ref={ref} {...props} />
);

FigureClient.displayName = "FigureClient";

/** Memoized version of `FigureClient` for performance optimization. */
export const MemoizedFigureClient = memo(FigureClient);

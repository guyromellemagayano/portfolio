"use client";

import React, { memo } from "react";

import { Canvas, type CanvasProps, type CanvasRef } from ".";

/** Render the canvas client component. */
export const CanvasClient = React.forwardRef<CanvasRef, CanvasProps>(
  (props, ref) => <Canvas ref={ref} {...props} />
);

CanvasClient.displayName = "CanvasClient";

/** Memoized version of `CanvasClient` for performance optimization. */
export const MemoizedCanvasClient = memo(CanvasClient);

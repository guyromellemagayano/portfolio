"use client";

import { forwardRef, memo } from "react";

import type { CanvasProps, CanvasRef } from ".";

// =============================================================================
// CLIENT COMPONENTS
// =============================================================================

/**
 * Canvas client component for enhanced interactivity.
 * Provides client-side rendering with full React features.
 *
 * @param props - Canvas component properties
 * @param ref - Forwarded ref to the canvas element
 * @returns Rendered canvas client component
 */
export const CanvasClient = forwardRef<CanvasRef, CanvasProps>(
  ({ as: Component = "canvas", children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

CanvasClient.displayName = "CanvasClient";

/**
 * Memoized version of CanvasClient for performance optimization.
 * Prevents unnecessary re-renders when props haven't changed.
 */
export const MemoizedCanvasClient = memo(CanvasClient);

MemoizedCanvasClient.displayName = "MemoizedCanvasClient";

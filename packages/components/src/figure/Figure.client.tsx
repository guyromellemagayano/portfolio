"use client";

import { forwardRef } from "react";

import type { FigureProps, FigureRef } from "./Figure";

/**
 * Render the figure with optional caption client component.
 * @param {FigureProps} props - The figure with optional caption client component properties
 * @param {FigureRef} ref - The figure with optional caption client component reference
 * @returns The rendered figure with optional caption client component
 */
export const FigureClient = forwardRef<FigureRef, FigureProps>(
  ({ children, ...rest }, ref) => {
    return (
      <figure ref={ref} {...rest}>
        {children}
      </figure>
    );
  }
);

FigureClient.displayName = "FigureClient";

"use client";

import { forwardRef } from "react";

import type { ProgressProps, ProgressRef } from "./Progress";

/**
 * Render the progress indicator client component.
 * @param {ProgressProps} props - The progress indicator client component properties
 * @param {ProgressRef} ref - The progress indicator client component reference
 * @returns The rendered progress indicator client component
 */
export const ProgressClient = forwardRef<ProgressRef, ProgressProps>(
  ({ children, ...rest }, ref) => {
    return (
      <progress ref={ref} {...rest}>
        {children}
      </progress>
    );
  }
);

ProgressClient.displayName = "ProgressClient";

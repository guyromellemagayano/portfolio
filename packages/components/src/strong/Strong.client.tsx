"use client";

import { forwardRef } from "react";

import type { StrongProps, StrongRef } from "./Strong";

/**
 * Render the strong importance client component.
 * @param {StrongProps} props - The strong importance client component properties
 * @param {StrongRef} ref - The strong importance client component reference
 * @returns The rendered strong importance client component
 */
export const StrongClient = forwardRef<StrongRef, StrongProps>(
  ({ children, ...rest }, ref) => {
    return (
      <strong ref={ref} {...rest}>
        {children}
      </strong>
    );
  }
);

StrongClient.displayName = "StrongClient";

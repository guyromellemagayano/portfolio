"use client";

import { forwardRef } from "react";

import type { DelProps, DelRef } from "./Del";

/**
 * Render the deleted text client component.
 * @param {DelProps} props - The deleted text client component properties
 * @param {DelRef} ref - The deleted text client component reference
 * @returns The rendered deleted text client component
 */
export const DelClient = forwardRef<DelRef, DelProps>(
  ({ children, ...rest }, ref) => {
    return (
      <del ref={ref} {...rest}>
        {children}
      </del>
    );
  }
);

DelClient.displayName = "DelClient";

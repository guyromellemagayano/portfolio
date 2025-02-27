"use client";

import { forwardRef } from "react";

import type { MarkProps, MarkRef } from "./Mark";

/**
 * Render the mark text client component.
 * @param {MarkProps} props - The mark text client component properties
 * @param {MarkRef} ref - The mark text client component reference
 * @returns The rendered mark text client component
 */
export const MarkClient = forwardRef<MarkRef, MarkProps>(
  ({ children, ...rest }, ref) => {
    return (
      <mark ref={ref} {...rest}>
        {children}
      </mark>
    );
  }
);

MarkClient.displayName = "MarkClient";

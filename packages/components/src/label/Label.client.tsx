"use client";

import { forwardRef } from "react";

import type { LabelProps, LabelRef } from "./Label";

/**
 * Render the label client component.
 * @param {LabelProps} props - The label client component properties
 * @param {LabelRef} ref - The label client component reference
 * @returns The rendered label client component
 */
export const LabelClient = forwardRef<LabelRef, LabelProps>(
  ({ children, ...rest }, ref) => {
    return (
      <label ref={ref} {...rest}>
        {children}
      </label>
    );
  }
);

LabelClient.displayName = "LabelClient";

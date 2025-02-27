"use client";

import { forwardRef } from "react";

import type { LegendProps, LegendRef } from "./Legend";

/**
 * Render the field set legend client component.
 * @param {LegendProps} props - The field set legend client component properties
 * @param {LegendRef} ref - The field set legend client component reference
 * @returns The rendered field set legend client component
 */
export const LegendClient = forwardRef<LegendRef, LegendProps>(
  ({ children, ...rest }, ref) => {
    return (
      <legend ref={ref} {...rest}>
        {children}
      </legend>
    );
  }
);

LegendClient.displayName = "LegendClient";

"use client";

import { forwardRef } from "react";

import type { ParagraphProps, ParagraphRef } from "./P";

/**
 * Render the paragraph client component.
 * @param {ParagraphProps} props - The paragraph client component properties
 * @param {ParagraphRef} ref - The paragraph client component reference
 * @returns The rendered paragraph client component
 */
export const ParagraphClient = forwardRef<ParagraphRef, ParagraphProps>(
  ({ children, ...rest }, ref) => {
    return (
      <p ref={ref} {...rest}>
        {children}
      </p>
    );
  }
);

ParagraphClient.displayName = "ParagraphClient";

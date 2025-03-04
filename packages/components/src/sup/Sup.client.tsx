"use client";

import { forwardRef } from "react";

import type { SummaryProps, SummaryRef } from "./Sup";

/**
 * Render the superscript client component.
 * @param {SummaryProps} props - The superscript client component properties
 * @param {SummaryRef} ref - The superscript client component reference
 * @returns The rendered superscript client component
 */
export const SummaryClient = forwardRef<SummaryRef, SummaryProps>(
  ({ children, ...rest }, ref) => {
    return (
      <sup ref={ref} {...rest}>
        {children}
      </sup>
    );
  }
);

SummaryClient.displayName = "SummaryClient";

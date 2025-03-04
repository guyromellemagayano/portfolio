"use client";

import { forwardRef } from "react";

import type { SummaryProps, SummaryRef } from "./Summary";

/**
 * Render the disclosure summary client component.
 * @param {SummaryProps} props - The disclosure summary client component properties
 * @param {SummaryRef} ref - The disclosure summary client component reference
 * @returns The rendered disclosure summary client component
 */
export const SummaryClient = forwardRef<SummaryRef, SummaryProps>(
  ({ children, ...rest }, ref) => {
    return (
      <summary ref={ref} {...rest}>
        {children}
      </summary>
    );
  }
);

SummaryClient.displayName = "SummaryClient";

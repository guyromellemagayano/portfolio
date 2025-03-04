"use client";

import { forwardRef } from "react";

import type { SampProps, SampRef } from "./Samp";

/**
 * Render the sample output client component.
 * @param {SampProps} props - The sample output client component properties
 * @param {SampRef} ref - The sample output client component reference
 * @returns The rendered sample output client component
 */
export const SampClient = forwardRef<SampRef, SampProps>(
  ({ children, ...rest }, ref) => {
    return (
      <samp ref={ref} {...rest}>
        {children}
      </samp>
    );
  }
);

SampClient.displayName = "SampClient";

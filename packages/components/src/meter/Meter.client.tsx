"use client";

import { forwardRef } from "react";

import type { MeterProps, MeterRef } from "./Meter";

/**
 * Render the HTML meter client component.
 * @param {MeterProps} props - The HTML meter client component properties
 * @param {MeterRef} ref - The HTML meter client component reference
 * @returns The rendered HTML meter client component
 */
export const MeterClient = forwardRef<MeterRef, MeterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <meter ref={ref} {...rest}>
        {children}
      </meter>
    );
  }
);

MeterClient.displayName = "MeterClient";

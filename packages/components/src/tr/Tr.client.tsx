"use client";

import { forwardRef } from "react";

import type { TrProps, TrRef } from "./Tr";

/**
 * Render the table row client component.
 * @param {TrProps} props - The table row client component properties
 * @param {TrRef} ref - The table row client component reference
 * @returns The rendered table row client component
 */
export const TrClient = forwardRef<TrRef, TrProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tr ref={ref} {...rest}>
        {children}
      </tr>
    );
  }
);

TrClient.displayName = "TrClient";

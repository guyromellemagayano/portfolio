"use client";

import { forwardRef } from "react";

import type { TfootProps, TfootRef } from "./Tfoot";

/**
 * Render the table foot client component.
 * @param {TfootProps} props - The table foot client component properties
 * @param {TfootRef} ref - The table foot client component reference
 * @returns The rendered table foot client component
 */
export const TfootClient = forwardRef<TfootRef, TfootProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tfoot ref={ref} {...rest}>
        {children}
      </tfoot>
    );
  }
);

TfootClient.displayName = "TfootClient";

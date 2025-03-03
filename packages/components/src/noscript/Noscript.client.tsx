"use client";

import { forwardRef } from "react";

import type { NoscriptProps, NoscriptRef } from "./Noscript";

/**
 * Render the noscript client component.
 * @param {NoscriptProps} props - The noscript client component properties
 * @param {NoscriptRef} ref - The noscript client component reference
 * @returns The rendered noscript client component
 */
export const NoscriptClient = forwardRef<NoscriptRef, NoscriptProps>(
  ({ children, ...rest }, ref) => {
    return (
      <noscript ref={ref} {...rest}>
        {children}
      </noscript>
    );
  }
);

NoscriptClient.displayName = "NoscriptClient";

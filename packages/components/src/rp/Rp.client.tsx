"use client";

import { forwardRef } from "react";

import type { RpProps, RpRef } from "./Rp";

/**
 * Render the ruby fallback parenthesis client component.
 * @param {RpProps} props - The ruby fallback parenthesis client component properties
 * @param {RpRef} ref - The ruby fallback parenthesis client component reference
 * @returns The rendered ruby fallback parenthesis client component
 */
export const RpClient = forwardRef<RpRef, RpProps>(
  ({ children, ...rest }, ref) => {
    return (
      <rp ref={ref} {...rest}>
        {children}
      </rp>
    );
  }
);

RpClient.displayName = "RpClient";

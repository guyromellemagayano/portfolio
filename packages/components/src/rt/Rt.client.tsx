"use client";

import { forwardRef } from "react";

import type { RtProps, RtRef } from "./Rt";

/**
 * Render the ruby text client component.
 * @param {RtProps} props - The ruby text client component properties
 * @param {RtRef} ref - The ruby text client component reference
 * @returns The rendered ruby text client component
 */
export const RtClient = forwardRef<RtRef, RtProps>(
  ({ children, ...rest }, ref) => {
    return (
      <rt ref={ref} {...rest}>
        {children}
      </rt>
    );
  }
);

RtClient.displayName = "RtClient";

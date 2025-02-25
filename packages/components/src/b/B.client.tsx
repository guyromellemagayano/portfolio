"use client";

import { forwardRef } from "react";

import type { BProps, BRef } from "./B";

/**
 * Render the bring attention to client component.
 * @param {BProps} props - The bring attention to client component properties
 * @param {BRef} ref - The bring attention to client component reference
 * @returns The rendered bring attention to client component
 */
export const BClient = forwardRef<BRef, BProps>(
  ({ children, ...rest }, ref) => {
    return (
      <b ref={ref} {...rest}>
        {children}
      </b>
    );
  }
);

BClient.displayName = "BClient";

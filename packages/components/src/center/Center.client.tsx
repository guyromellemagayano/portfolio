"use client";

import { forwardRef } from "react";

import type { CenterProps, CenterRef } from "./Center";

/**
 * Render the center client component.
 * @param {CenterProps} props - The center client component properties
 * @param {CenterRef} ref - The center client component reference
 * @returns The rendered center client component
 */
export const CenterClient = forwardRef<CenterRef, CenterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <center ref={ref} {...rest}>
        {children}
      </center>
    );
  }
);

CenterClient.displayName = "CenterClient";

"use client";

import { forwardRef } from "react";

import type { BigProps, BigRef } from "./Big";

/**
 * Render the bigger text client component.
 * @param {BigProps} props - The bigger text client component properties
 * @param {BigRef} ref - The bigger text client component reference
 * @returns The rendered bigger text client component
 */
export const BigClient = forwardRef<BigRef, BigProps>(
  ({ children, ...rest }, ref) => {
    return (
      <big ref={ref} {...rest}>
        {children}
      </big>
    );
  }
);

BigClient.displayName = "BigClient";

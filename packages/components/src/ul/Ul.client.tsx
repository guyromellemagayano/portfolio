"use client";

import { forwardRef } from "react";

import type { UlProps, UlRef } from "./Ul";

/**
 * Render the unordered list client component.
 * @param {UlProps} props - The unordered list client component properties
 * @param {UlRef} ref - The unordered list client component reference
 * @returns The rendered unordered list client component
 */
export const UlClient = forwardRef<UlRef, UlProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ul ref={ref} {...rest}>
        {children}
      </ul>
    );
  }
);

UlClient.displayName = "UlClient";

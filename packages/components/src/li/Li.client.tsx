"use client";

import { forwardRef } from "react";

import type { LiProps, LiRef } from "./Li";

/**
 * Render the list item client component.
 * @param {LiProps} props - The list item client component properties
 * @param {LiRef} ref - The list item client component reference
 * @returns The rendered list item client component
 */
export const LiClient = forwardRef<LiRef, LiProps>(
  ({ children, ...rest }, ref) => {
    return (
      <li ref={ref} {...rest}>
        {children}
      </li>
    );
  }
);

LiClient.displayName = "LiClient";

"use client";

import { forwardRef } from "react";

import type { ThProps, ThRef } from "./Th";

/**
 * Render the table header client component.
 * @param {ThProps} props - The table header client component properties
 * @param {ThRef} ref - The table header client component reference
 * @returns The rendered table header client component
 */
export const ThClient = forwardRef<ThRef, ThProps>(
  ({ children, ...rest }, ref) => {
    return (
      <th ref={ref} {...rest}>
        {children}
      </th>
    );
  }
);

ThClient.displayName = "ThClient";

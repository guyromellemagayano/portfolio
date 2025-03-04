"use client";

import { forwardRef } from "react";

import type { TheadProps, TheadRef } from "./Thead";

/**
 * Render the table head client component.
 * @param {TheadProps} props - The table head client component properties
 * @param {TheadRef} ref - The table head client component reference
 * @returns The rendered table head client component
 */
export const TheadClient = forwardRef<TheadRef, TheadProps>(
  ({ children, ...rest }, ref) => {
    return (
      <thead ref={ref} {...rest}>
        {children}
      </thead>
    );
  }
);

TheadClient.displayName = "TheadClient";

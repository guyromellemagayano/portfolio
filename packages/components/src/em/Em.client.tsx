"use client";

import { forwardRef } from "react";

import type { EmProps, EmRef } from "./Em";

/**
 * Render the emphasis client component.
 * @param {EmProps} props - The emphasis client component properties
 * @param {EmRef} ref - The emphasis client component reference
 * @returns The rendered emphasis client component
 */
export const EmClient = forwardRef<EmRef, EmProps>(
  ({ children, ...rest }, ref) => {
    return (
      <em ref={ref} {...rest}>
        {children}
      </em>
    );
  }
);

EmClient.displayName = "EmClient";

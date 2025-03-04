"use client";

import { forwardRef } from "react";

import type { SProps, SRef } from "./S";

/**
 * Render the strikethrough client component.
 * @param {SProps} props - The strikethrough client component properties
 * @param {SRef} ref - The strikethrough client component reference
 * @returns The rendered strikethrough client component
 */
export const SClient = forwardRef<SRef, SProps>(
  ({ children, ...rest }, ref) => {
    return (
      <s ref={ref} {...rest}>
        {children}
      </s>
    );
  }
);

SClient.displayName = "SClient";

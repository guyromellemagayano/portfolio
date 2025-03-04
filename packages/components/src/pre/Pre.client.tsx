"use client";

import { forwardRef } from "react";

import type { PreProps, PreRef } from "./Pre";

/**
 * Render the preformatted text client component.
 * @param {PreProps} props - The preformatted text client component properties
 * @param {PreRef} ref - The preformatted text client component reference
 * @returns The rendered preformatted text client component
 */
export const PreClient = forwardRef<PreRef, PreProps>(
  ({ children, ...rest }, ref) => {
    return (
      <pre ref={ref} {...rest}>
        {children}
      </pre>
    );
  }
);

PreClient.displayName = "PreClient";

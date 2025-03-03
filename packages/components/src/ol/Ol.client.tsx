"use client";

import { forwardRef } from "react";

import type { OlProps, OlRef } from "./Ol";

/**
 * Render the ordered list client component.
 * @param {OlProps} props - The ordered list client component properties
 * @param {OlRef} ref - The ordered list client component reference
 * @returns The rendered ordered list client component
 */
export const OlClient = forwardRef<OlRef, OlProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ol ref={ref} {...rest}>
        {children}
      </ol>
    );
  }
);

OlClient.displayName = "OlClient";

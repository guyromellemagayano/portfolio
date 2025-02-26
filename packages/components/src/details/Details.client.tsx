"use client";

import { forwardRef } from "react";

import type { DetailsProps, DetailsRef } from "./Details";

/**
 * Render the details disclosure client component.
 * @param {DetailsProps} props - The details disclosure client component properties
 * @param {DetailsRef} ref - The details disclosure client component reference
 * @returns The rendered details disclosure client component
 */
export const DetailsClient = forwardRef<DetailsRef, DetailsProps>(
  ({ children, ...rest }, ref) => {
    return (
      <details ref={ref} {...rest}>
        {children}
      </details>
    );
  }
);

DetailsClient.displayName = "DetailsClient";

"use client";

import { forwardRef } from "react";

import type { CiteProps, CiteRef } from "./Cite";

/**
 * Render the cite client component.
 * @param {CiteProps} props - The cite client component properties
 * @param {CiteRef} ref - The cite client component reference
 * @returns The rendered cite client component
 */
export const CiteClient = forwardRef<CiteRef, CiteProps>(
  ({ children, ...rest }, ref) => {
    return (
      <cite ref={ref} {...rest}>
        {children}
      </cite>
    );
  }
);

CiteClient.displayName = "CiteClient";

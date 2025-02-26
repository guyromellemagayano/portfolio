"use client";

import { forwardRef } from "react";

import type { DfnProps, DfnRef } from "./Dfn";

/**
 * Render the definition element client component.
 * @param {DfnProps} props - The definition element client component properties
 * @param {DfnRef} ref - The definition element client component reference
 * @returns The rendered definition element client component
 */
export const DfnClient = forwardRef<DfnRef, DfnProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dfn ref={ref} {...rest}>
        {children}
      </dfn>
    );
  }
);

DfnClient.displayName = "DfnClient";

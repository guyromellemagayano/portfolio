"use client";

import { forwardRef } from "react";

import type { VarProps, VarRef } from "./Var";

/**
 * Render the variable client component.
 * @param {VarProps} props - The variable client component properties
 * @param {VarRef} ref - The variable client component reference
 * @returns The rendered variable client component
 */
export const VarClient = forwardRef<VarRef, VarProps>(
  ({ children, ...rest }, ref) => {
    return (
      <var ref={ref} {...rest}>
        {children}
      </var>
    );
  }
);

VarClient.displayName = "VarClient";

"use client";

import { forwardRef } from "react";

import type { InsProps, InsRef } from "./Ins";

/**
 * Render the inserted text client component.
 * @param {InsProps} props - The inserted text client component properties
 * @param {InsRef} ref - The inserted text client component reference
 * @returns The rendered inserted text client component
 */
export const InsClient = forwardRef<InsRef, InsProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ins ref={ref} {...rest}>
        {children}
      </ins>
    );
  }
);

InsClient.displayName = "InsClient";

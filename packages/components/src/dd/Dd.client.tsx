"use client";

import { forwardRef } from "react";

import type { DdProps, DdRef } from "./Dd";

/**
 * Render the description details client component.
 * @param {DdProps} props - The description details client component properties
 * @param {DdRef} ref - The description details client component reference
 * @returns The rendered description details client component
 */
export const DdClient = forwardRef<DdRef, DdProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dd ref={ref} {...rest}>
        {children}
      </dd>
    );
  }
);

DdClient.displayName = "DdClient";

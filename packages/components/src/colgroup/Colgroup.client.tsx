"use client";

import { forwardRef } from "react";

import type { ColgroupProps, ColgroupRef } from "./Colgroup";

/**
 * Render the table column group client component.
 * @param {ColgroupProps} props - The table column group client component properties
 * @param {ColgroupRef} ref - The table column group client component reference
 * @returns The rendered table column group client component
 */
export const ColgroupClient = forwardRef<ColgroupRef, ColgroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <colgroup ref={ref} {...rest}>
        {children}
      </colgroup>
    );
  }
);

ColgroupClient.displayName = "ColgroupClient";

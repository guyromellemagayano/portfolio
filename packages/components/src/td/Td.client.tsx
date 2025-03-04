"use client";

import { forwardRef } from "react";

import type { TdProps, TdRef } from "./Td";

/**
 * Render the table data cell client component.
 * @param {TdProps} props - The table data cell client component properties
 * @param {TdRef} ref - The table data cell client component reference
 * @returns The rendered table data cell client component
 */
export const TdClient = forwardRef<TdRef, TdProps>(
  ({ children, ...rest }, ref) => {
    return (
      <td ref={ref} {...rest}>
        {children}
      </td>
    );
  }
);

TdClient.displayName = "TdClient";

"use client";

import { forwardRef } from "react";

import type { TableProps, TableRef } from "./Table";

/**
 * Render the table client component.
 * @param {TableProps} props - The table client component properties
 * @param {TableRef} ref - The table client component reference
 * @returns The rendered table client component
 */
export const TableClient = forwardRef<TableRef, TableProps>(
  ({ children, ...rest }, ref) => {
    return (
      <table ref={ref} {...rest}>
        {children}
      </table>
    );
  }
);

TableClient.displayName = "TableClient";

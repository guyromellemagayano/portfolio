"use client";

import { forwardRef } from "react";

import type {
  TableColumnGroupProps,
  TableColumnGroupRef,
} from "./TableColumnGroup";

/**
 * Render the table column group client component.
 * @param {TableColumnGroupProps} props - The table column group client component properties
 * @param {TableColumnGroupRef} ref - The table column group client component reference
 * @returns The rendered table column group client component
 */
const TableColumnGroupClient = forwardRef<
  TableColumnGroupRef,
  TableColumnGroupProps
>(({ children, ...rest }, ref) => {
  return (
    <colgroup ref={ref} {...rest}>
      {children}
    </colgroup>
  );
});

TableColumnGroupClient.displayName = "TableColumnGroupClient";

export default TableColumnGroupClient;

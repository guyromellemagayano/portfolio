"use client";

import React, { memo } from "react";

import { Table, type TableProps, type TableRef } from ".";

/** Render the table client component. */
export const TableClient = React.forwardRef<TableRef, TableProps>(
  (props, ref) => <Table ref={ref} {...props} />
);

TableClient.displayName = "TableClient";

/** Memoized version of `TableClient` for performance optimization. */
export const MemoizedTableClient = memo(TableClient);

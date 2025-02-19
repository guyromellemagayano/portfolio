"use client";

import { forwardRef } from "react";

import type { ColumnProps, ColumnRef } from "./Column";

/**
 * Render the column client component.
 * @param {ColumnProps} props - The column client component properties
 * @param {ColumnRef} ref - The column client component reference
 * @returns The rendered column client component
 */
const ColumnClient = forwardRef<ColumnRef, ColumnProps>(({ ...rest }, ref) => {
  return <col ref={ref} {...rest} />;
});

ColumnClient.displayName = "ColumnClient";

export default ColumnClient;

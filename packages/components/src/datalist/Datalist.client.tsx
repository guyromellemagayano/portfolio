"use client";

import { forwardRef } from "react";

import type { DatalistProps, DatalistRef } from "./Datalist";

/**
 * Render the datalist client component.
 * @param {DatalistProps} props - The datalist client component properties
 * @param {DatalistRef} ref - The datalist client component reference
 * @returns The rendered datalist client component
 */
export const DatalistClient = forwardRef<DatalistRef, DatalistProps>(
  ({ children, ...rest }, ref) => {
    return (
      <datalist ref={ref} {...rest}>
        {children}
      </datalist>
    );
  }
);

DatalistClient.displayName = "DatalistClient";

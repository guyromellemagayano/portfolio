"use client";

import { forwardRef } from "react";

import type { DatalistProps, DatalistRef } from "./Datalist";

/**
 * Render the data client component.
 * @param {DatalistProps} props - The data client component properties
 * @param {DatalistRef} ref - The data client component reference
 * @returns The rendered data client component
 */
const DatalistClient = forwardRef<DatalistRef, DatalistProps>(
  ({ children, ...rest }, ref) => {
    return (
      <datalist ref={ref} {...rest}>
        {children}
      </datalist>
    );
  }
);

DatalistClient.displayName = "DatalistClient";

export default DatalistClient;

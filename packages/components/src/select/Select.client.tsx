"use client";

import { forwardRef } from "react";

import type { SelectProps, SelectRef } from "./Select";

/**
 * Render the HTML select client component.
 * @param {SelectProps} props - The HTML select client component properties
 * @param {SelectRef} ref - The HTML select client component reference
 * @returns The rendered HTML select client component
 */
export const SelectClient = forwardRef<SelectRef, SelectProps>(
  ({ children, ...rest }, ref) => {
    return (
      <select ref={ref} {...rest}>
        {children}
      </select>
    );
  }
);

SelectClient.displayName = "SelectClient";

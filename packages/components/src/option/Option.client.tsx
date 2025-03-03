"use client";

import { forwardRef } from "react";

import type { OptionProps, OptionRef } from "./Option";

/**
 * Render the HTML option client component.
 * @param {OptionProps} props - The HTML option client component properties
 * @param {OptionRef} ref - The HTML option client component reference
 * @returns The rendered HTML option client component
 */
export const OptionClient = forwardRef<OptionRef, OptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <option ref={ref} {...rest}>
        {children}
      </option>
    );
  }
);

OptionClient.displayName = "OptionClient";

"use client";

import { forwardRef } from "react";

import type { TimeProps, TimeRef } from "./Time";

/**
 * Render the (date) time client component.
 * @param {TimeProps} props - The (date) time client component properties
 * @param {TimeRef} ref - The (date) time client component reference
 * @returns The rendered (date) time client component
 */
export const TimeClient = forwardRef<TimeRef, TimeProps>(
  ({ children, ...rest }, ref) => {
    return (
      <time ref={ref} {...rest}>
        {children}
      </time>
    );
  }
);

TimeClient.displayName = "TimeClient";

"use client";

import { forwardRef } from "react";

import type { LineBreakProps, LineBreakRef } from "./LineBreak";

/**
 * Render the line break client component.
 * @param {LineBreakProps} props - The line break client component properties
 * @param {LineBreakRef} ref - The line break client component reference
 * @returns The rendered line break client component
 */
const LineBreakClient = forwardRef<LineBreakRef, LineBreakProps>(
  ({ ...rest }, ref) => {
    return <br ref={ref} {...rest} />;
  }
);

LineBreakClient.displayName = "LineBreakClient";

export default LineBreakClient;

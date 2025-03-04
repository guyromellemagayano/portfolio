"use client";

import { forwardRef } from "react";

import type { WbrProps, WbrRef } from "./Wbr";

/**
 * Render the line break opportunity client component.
 * @param {WbrProps} props - The line break opportunity client component properties
 * @param {WbrRef} ref - The line break opportunity client component reference
 * @returns The rendered line break opportunity client component
 */
export const WbrClient = forwardRef<WbrRef, WbrProps>(({ ...rest }, ref) => {
  return <wbr ref={ref} {...rest} />;
});

WbrClient.displayName = "WbrClient";

"use client";

import { forwardRef } from "react";

import type { ColProps, ColRef } from "./Col";

/**
 * Render the column client component.
 * @param {ColProps} props - The column client component properties
 * @param {ColRef} ref - The column client component reference
 * @returns The rendered column client component
 */
export const ColClient = forwardRef<ColRef, ColProps>(({ ...rest }, ref) => {
  return <col ref={ref} {...rest} />;
});

ColClient.displayName = "ColClient";

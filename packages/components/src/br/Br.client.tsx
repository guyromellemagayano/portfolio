"use client";

import { forwardRef } from "react";

import type { BrProps, BrRef } from "./Br";

/**
 * Render the document line break client component.
 * @param {BrProps} props - The document line break client component properties
 * @param {BrRef} ref - The document line break client component reference
 * @returns The rendered document line break client component
 */
export const BrClient = forwardRef<BrRef, BrProps>(({ ...rest }, ref) => {
  return <br ref={ref} {...rest} />;
});

BrClient.displayName = "BrClient";

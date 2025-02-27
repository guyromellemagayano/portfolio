"use client";

import { forwardRef } from "react";

import type { HrProps, HrRef } from "./Hr";

/**
 * Render the thematic break (horizontal rule) client component.
 * @param {HrProps} props - The thematic break (horizontal rule) client component properties
 * @param {HrRef} ref - The thematic break (horizontal rule) client component reference
 * @returns The rendered thematic break (horizontal rule) client component
 */
export const HrClient = forwardRef<HrRef, HrProps>(({ ...rest }, ref) => {
  return <hr ref={ref} {...rest} />;
});

HrClient.displayName = "HrClient";

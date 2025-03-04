"use client";

import { forwardRef } from "react";

import type { SourceProps, SourceRef } from "./Source";

/**
 * Render the media or image source client component.
 * @param {SourceProps} props - The media or image source client component properties
 * @param {SourceRef} ref - The media or image source client component reference
 * @returns The rendered media or image source client component
 */
export const SourceClient = forwardRef<SourceRef, SourceProps>(
  ({ ...rest }, ref) => {
    return <source ref={ref} {...rest} />;
  }
);

SourceClient.displayName = "SourceClient";

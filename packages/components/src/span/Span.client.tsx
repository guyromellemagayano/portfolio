"use client";

import { forwardRef } from "react";

import type { SpanProps, SpanRef } from "./Span";

/**
 * Render the content span client component.
 * @param {SpanProps} props - The content span client component properties
 * @param {SpanRef} ref - The content span client component reference
 * @returns The rendered content span client component
 */
export const SpanClient = forwardRef<SpanRef, SpanProps>(
  ({ children, ...rest }, ref) => {
    return (
      <span ref={ref} {...rest}>
        {children}
      </span>
    );
  }
);

SpanClient.displayName = "SpanClient";

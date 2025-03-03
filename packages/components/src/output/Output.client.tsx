"use client";

import { forwardRef } from "react";

import type { OutputProps, OutputRef } from "./Output";

/**
 * Render the output client component.
 * @param {OutputProps} props - The output client component properties
 * @param {OutputRef} ref - The output client component reference
 * @returns The rendered output client component
 */
export const OutputClient = forwardRef<OutputRef, OutputProps>(
  ({ children, ...rest }, ref) => {
    return (
      <output ref={ref} {...rest}>
        {children}
      </output>
    );
  }
);

OutputClient.displayName = "OutputClient";

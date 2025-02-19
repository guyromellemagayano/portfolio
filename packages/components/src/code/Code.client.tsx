"use client";

import { forwardRef } from "react";

import type { CodeProps, CodeRef } from "./Code";

/**
 * Render the code client component.
 * @param {CodeProps} props - The code client component properties
 * @param {CodeRef} ref - The code client component reference
 * @returns The rendered code client component
 */
const CodeClient = forwardRef<CodeRef, CodeProps>(
  ({ children, ...rest }, ref) => {
    return (
      <code ref={ref} {...rest}>
        {children}
      </code>
    );
  }
);

CodeClient.displayName = "CodeClient";

export default CodeClient;

"use client";

import { forwardRef } from "react";

import type { ScriptProps, ScriptRef } from "./Script";

/**
 * Render the script client component.
 * @param {ScriptProps} props - The script client component properties
 * @param {ScriptRef} ref - The script client component reference
 * @returns The rendered script client component
 */
export const ScriptClient = forwardRef<ScriptRef, ScriptProps>(
  ({ children, ...rest }, ref) => {
    return (
      <script ref={ref} {...rest}>
        {children}
      </script>
    );
  }
);

ScriptClient.displayName = "ScriptClient";

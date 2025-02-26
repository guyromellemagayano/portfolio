"use client";

import { forwardRef } from "react";

import type { DivProps, DivRef } from "./Div";

/**
 * Render the content division client component.
 * @param {DivProps} props - The content division client component properties
 * @param {DivRef} ref - The content division client component reference
 * @returns The rendered content division client component
 */
export const DivClient = forwardRef<DivRef, DivProps>(
  ({ children, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

DivClient.displayName = "DivClient";

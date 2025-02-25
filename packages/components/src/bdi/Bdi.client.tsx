"use client";

import { forwardRef } from "react";

import type { BdiProps, BdiRef } from "./Bdi";

/**
 * Render the bidirectional isolate client component.
 * @param {BdiProps} props - The bidirectional isolate client component properties
 * @param {BdiRef} ref - The bidirectional isolate client component reference
 * @returns The rendered bidirectional isolate client component
 */
export const BdiClient = forwardRef<BdiRef, BdiProps>(
  ({ children, ...rest }, ref) => {
    return (
      <bdi ref={ref} {...rest}>
        {children}
      </bdi>
    );
  }
);

BdiClient.displayName = "BdiClient";

"use client";

import { forwardRef } from "react";

import type { BdoProps, BdoRef } from "./Bdo";

/**
 * Render the bidirectional text override client component.
 * @param {BdoProps} props - The bidirectional text override client component properties
 * @param {BdoRef} ref - The bidirectional text override client component reference
 * @returns The rendered bidirectional text override client component
 */
export const BdoClient = forwardRef<BdoRef, BdoProps>(
  ({ children, ...rest }, ref) => {
    return (
      <bdo ref={ref} {...rest}>
        {children}
      </bdo>
    );
  }
);

BdoClient.displayName = "BdoClient";

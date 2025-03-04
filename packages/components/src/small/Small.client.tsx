"use client";

import { forwardRef } from "react";

import type { SmallProps, SmallRef } from "./Small";

/**
 * Render the side comment client component.
 * @param {SmallProps} props - The side comment client component properties
 * @param {SmallRef} ref - The side comment client component reference
 * @returns The rendered side comment client component
 */
export const SmallClient = forwardRef<SmallRef, SmallProps>(
  ({ children, ...rest }, ref) => {
    return (
      <small ref={ref} {...rest}>
        {children}
      </small>
    );
  }
);

SmallClient.displayName = "SmallClient";

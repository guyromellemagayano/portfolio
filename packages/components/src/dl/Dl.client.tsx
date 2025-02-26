"use client";

import { forwardRef } from "react";

import type { DlProps, DlRef } from "./Dl";

/**
 * Render the description list client component.
 * @param {DlProps} props - The description list client component properties
 * @param {DlRef} ref - The description list client component reference
 * @returns The rendered description list client component
 */
export const DlClient = forwardRef<DlRef, DlProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dl ref={ref} {...rest}>
        {children}
      </dl>
    );
  }
);

DlClient.displayName = "DlClient";

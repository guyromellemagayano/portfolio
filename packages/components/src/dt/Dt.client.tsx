"use client";

import { forwardRef } from "react";

import type { DtProps, DtRef } from "./Dt";

/**
 * Render the description term client component.
 * @param {DtProps} props - The description term client component properties
 * @param {DtRef} ref - The description term client component reference
 * @returns The rendered description term client component
 */
export const DtClient = forwardRef<DtRef, DtProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dt ref={ref} {...rest}>
        {children}
      </dt>
    );
  }
);

DtClient.displayName = "DtClient";

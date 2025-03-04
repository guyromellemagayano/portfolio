"use client";

import { forwardRef } from "react";

import type { QProps, QRef } from "./Q";

/**
 * Render the inline quotation client component.
 * @param {QProps} props - The inline quotation client component properties
 * @param {QRef} ref - The inline quotation client component reference
 * @returns The rendered inline quotation client component
 */
export const QClient = forwardRef<QRef, QProps>(
  ({ children, ...rest }, ref) => {
    return (
      <q ref={ref} {...rest}>
        {children}
      </q>
    );
  }
);

QClient.displayName = "QClient";

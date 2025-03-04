"use client";

import { forwardRef } from "react";

import type { StyleProps, StyleRef } from "./Style";

/**
 * Render the style information client component.
 * @param {StyleProps} props - The style information client component properties
 * @param {StyleRef} ref - The style information client component reference
 * @returns The rendered style information client component
 */
export const StyleClient = forwardRef<StyleRef, StyleProps>(
  ({ children, ...rest }, ref) => {
    return (
      <style ref={ref} {...rest}>
        {children}
      </style>
    );
  }
);

StyleClient.displayName = "StyleClient";

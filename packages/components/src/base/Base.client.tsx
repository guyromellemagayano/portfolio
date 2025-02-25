"use client";

import { forwardRef } from "react";

import type { BaseProps, BaseRef } from "./Base";

/**
 * Render the base client component.
 * @param {BaseProps} props - The base client component properties
 * @param {BaseRef} ref - The base client component reference
 * @returns The rendered base client component
 */
export const BaseClient = forwardRef<BaseRef, BaseProps>(
  ({ children, ...rest }, ref) => {
    return (
      <base ref={ref} {...rest}>
        {children}
      </base>
    );
  }
);

BaseClient.displayName = "BaseClient";

"use client";

import { forwardRef } from "react";

import type { SubProps, SubRef } from "./Sub";

/**
 * Render the subscript client component.
 * @param {SubProps} props - The subscript client component properties
 * @param {SubRef} ref - The subscript client component reference
 * @returns The rendered subscript client component
 */
export const SubClient = forwardRef<SubRef, SubProps>(
  ({ children, ...rest }, ref) => {
    return (
      <sub ref={ref} {...rest}>
        {children}
      </sub>
    );
  }
);

SubClient.displayName = "SubClient";

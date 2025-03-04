"use client";

import { forwardRef } from "react";

import type { TbodyProps, TbodyRef } from "./Tbody";

/**
 * Render the table body client component.
 * @param {TbodyProps} props - The table body client component properties
 * @param {TbodyRef} ref - The table body client component reference
 * @returns The rendered table body client component
 */
export const TbodyClient = forwardRef<TbodyRef, TbodyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tbody ref={ref} {...rest}>
        {children}
      </tbody>
    );
  }
);

TbodyClient.displayName = "TbodyClient";

"use client";

import { type DelHTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type DelRef = HTMLModElement;
export type DelProps = DelHTMLAttributes<DelRef> & CommonComponentProps;

/**
 * Render the deleted text client component.
 * @param {DelProps} props - The deleted text client component properties
 * @param {DelRef} ref - The deleted text client component reference
 * @returns The rendered deleted text client component
 */
export const DelClient = forwardRef<DelRef, DelProps>(
  ({ children, ...rest }, ref) => {
    return (
      <del ref={ref} {...rest}>
        {children}
      </del>
    );
  }
);

DelClient.displayName = "DelClient";

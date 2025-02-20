"use client";

import { type AreaHTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type AreaRef = HTMLAreaElement;
export type AreaProps = AreaHTMLAttributes<AreaRef> & CommonComponentProps;

/**
 * Render the area client component.
 * @param {AreaProps} props - The area client component properties
 * @param {AreaRef} ref - The area client component reference
 * @returns The rendered area client component
 */
export const AreaClient = forwardRef<AreaRef, AreaProps>(
  ({ children, ...rest }, ref) => {
    return (
      <area ref={ref} {...rest}>
        {children}
      </area>
    );
  }
);

AreaClient.displayName = "AreaClient";

"use client";

import { type HTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type BigRef = HTMLElement;
export type BigProps = HTMLAttributes<BigRef> & CommonComponentProps;

/**
 * Render the bigger text client component.
 * @param {BigProps} props - The bigger text client component properties
 * @param {BigRef} ref - The bigger text client component reference
 * @returns The rendered bigger text client component
 */
export const BigClient = forwardRef<BigRef, BigProps>(
  ({ children, ...rest }, ref) => {
    return (
      <b ref={ref} {...rest}>
        {children}
      </b>
    );
  }
);

BigClient.displayName = "BigClient";

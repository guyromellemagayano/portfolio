"use client";

import { type HTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type BRef = HTMLElement;
export type BProps = HTMLAttributes<BRef> & CommonComponentProps;

/**
 * Render the bring attention to client component.
 * @param {BProps} props - The bring attention to client component properties
 * @param {BRef} ref - The bring attention to client component reference
 * @returns The rendered bring attention to client component
 */
export const BClient = forwardRef<BRef, BProps>(
  ({ children, ...rest }, ref) => {
    return (
      <b ref={ref} {...rest}>
        {children}
      </b>
    );
  }
);

BClient.displayName = "BClient";

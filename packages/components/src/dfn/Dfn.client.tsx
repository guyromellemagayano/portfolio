"use client";

import { type HTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type DfnRef = HTMLElement;
export type DfnProps = HTMLAttributes<DfnRef> & CommonComponentProps;

/**
 * Render the definition element client component.
 * @param {DfnProps} props - The definition element client component properties
 * @param {DfnRef} ref - The definition element client component reference
 * @returns The rendered definition element client component
 */
export const DfnClient = forwardRef<DfnRef, DfnProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dfn ref={ref} {...rest}>
        {children}
      </dfn>
    );
  }
);

DfnClient.displayName = "DfnClient";

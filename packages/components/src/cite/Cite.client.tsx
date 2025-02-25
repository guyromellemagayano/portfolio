"use client";

import { type HTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type CiteRef = HTMLQuoteElement;
export type CiteProps = HTMLAttributes<CiteRef> & CommonComponentProps;

/**
 * Render the cite client component.
 * @param {CiteProps} props - The cite client component properties
 * @param {CiteRef} ref - The cite client component reference
 * @returns The rendered cite client component
 */
export const CiteClient = forwardRef<CiteRef, CiteProps>(
  ({ children, ...rest }, ref) => {
    return (
      <cite ref={ref} {...rest}>
        {children}
      </cite>
    );
  }
);

CiteClient.displayName = "CiteClient";

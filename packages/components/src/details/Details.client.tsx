"use client";

import { type DetailsHTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type DetailsRef = HTMLDetailsElement;
export type DetailsProps = DetailsHTMLAttributes<DetailsRef> &
  CommonComponentProps;

/**
 * Render the details disclosure client component.
 * @param {DetailsProps} props - The details disclosure client component properties
 * @param {DetailsRef} ref - The details disclosure client component reference
 * @returns The rendered details disclosure client component
 */
export const DetailsClient = forwardRef<DetailsRef, DetailsProps>(
  ({ children, ...rest }, ref) => {
    return (
      <details ref={ref} {...rest}>
        {children}
      </details>
    );
  }
);

DetailsClient.displayName = "DetailsClient";

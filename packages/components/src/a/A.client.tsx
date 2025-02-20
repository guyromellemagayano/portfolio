"use client";

import { type AnchorHTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type ARef = HTMLAnchorElement;
export type AProps = AnchorHTMLAttributes<ARef> & CommonComponentProps;

/**
 * Render the anchor client component.
 * @param {AProps} props - The anchor client component properties
 * @param {ARef} ref - The anchor client component reference
 * @returns The rendered anchor client component
 */
export const AClient = forwardRef<ARef, AProps>(
  ({ children, ...rest }, ref) => {
    return (
      <a ref={ref} {...rest}>
        {children}
      </a>
    );
  }
);

AClient.displayName = "AClient";

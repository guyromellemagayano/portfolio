"use client";

import { type HTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type AsideRef = HTMLElement;
export type AsideProps = HTMLAttributes<AsideRef> & CommonComponentProps;

/**
 * Render the aside client component.
 * @param {AsideProps} props - The aside client component properties
 * @param {AsideRef} ref - The aside client component reference
 * @returns The rendered aside client component
 */
export const AsideClient = forwardRef<AsideRef, AsideProps>(
  ({ children, ...rest }, ref) => {
    return (
      <aside ref={ref} {...rest}>
        {children}
      </aside>
    );
  }
);

AsideClient.displayName = "AsideClient";

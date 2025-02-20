"use client";

import { forwardRef } from "react";

import type { AsideProps, AsideRef } from "./Aside";

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

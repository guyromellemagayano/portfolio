"use client";

import { forwardRef } from "react";

import type { FooterProps, FooterRef } from "./Footer";

/**
 * Render the footer client component.
 * @param {FooterProps} props - The footer client component properties
 * @param {FooterRef} ref - The footer client component reference
 * @returns The rendered footer client component
 */
export const FooterClient = forwardRef<FooterRef, FooterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <footer ref={ref} {...rest}>
        {children}
      </footer>
    );
  }
);

FooterClient.displayName = "FooterClient";

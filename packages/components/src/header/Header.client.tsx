"use client";

import { forwardRef } from "react";

import type { HeaderProps, HeaderRef } from "./Header";

/**
 * Render the header client component.
 * @param {HeaderProps} props - The header client component properties
 * @param {HeaderRef} ref - The header client component reference
 * @returns The rendered header client component
 */
export const HeaderClient = forwardRef<HeaderRef, HeaderProps>(
  ({ children, ...rest }, ref) => {
    return (
      <header ref={ref} {...rest}>
        {children}
      </header>
    );
  }
);

HeaderClient.displayName = "HeaderClient";

"use client";

import { forwardRef } from "react";

import type { NavProps, NavRef } from "./Nav";

/**
 * Render the navigation section client component.
 * @param {NavProps} props - The navigation section client component properties
 * @param {NavRef} ref - The navigation section client component reference
 * @returns The rendered navigation section client component
 */
export const NavClient = forwardRef<NavRef, NavProps>(
  ({ children, ...rest }, ref) => {
    return (
      <nav ref={ref} {...rest}>
        {children}
      </nav>
    );
  }
);

NavClient.displayName = "NavClient";

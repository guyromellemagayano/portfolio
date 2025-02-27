"use client";

import { forwardRef } from "react";

import type { MainProps, MainRef } from "./Main";

/**
 * Render the main client component.
 * @param {MainProps} props - The main client component properties
 * @param {MainRef} ref - The main client component reference
 * @returns The rendered main client component
 */
export const MainClient = forwardRef<MainRef, MainProps>(
  ({ children, ...rest }, ref) => {
    return (
      <main ref={ref} {...rest}>
        {children}
      </main>
    );
  }
);

MainClient.displayName = "MainClient";

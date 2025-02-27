"use client";

import { forwardRef } from "react";

import type { KbdProps, KbdRef } from "./Kbd";

/**
 * Render the keyboard input client component.
 * @param {KbdProps} props - The keyboard input client component properties
 * @param {KbdRef} ref - The keyboard input client component reference
 * @returns The rendered keyboard input client component
 */
export const KbdClient = forwardRef<KbdRef, KbdProps>(
  ({ children, ...rest }, ref) => {
    return (
      <kbd ref={ref} {...rest}>
        {children}
      </kbd>
    );
  }
);

KbdClient.displayName = "KbdClient";

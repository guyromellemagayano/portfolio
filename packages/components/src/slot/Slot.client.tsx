"use client";

import { forwardRef } from "react";

import type { SlotProps, SlotRef } from "./Slot";

/**
 * Render the web component slot client component.
 * @param {SlotProps} props - The web component slot client component properties
 * @param {SlotRef} ref - The web component slot client component reference
 * @returns The rendered web component slot client component
 */
export const SlotClient = forwardRef<SlotRef, SlotProps>(
  ({ children, ...rest }, ref) => {
    return (
      <slot ref={ref} {...rest}>
        {children}
      </slot>
    );
  }
);

SlotClient.displayName = "SlotClient";

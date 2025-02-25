"use client";

import { forwardRef } from "react";

import type { ButtonProps, ButtonRef } from "./Button";

/**
 * Render the button client component.
 * @param {ButtonProps} props - The button client component properties
 * @param {ButtonRef} ref - The button client component reference
 * @returns The rendered button client component
 */
export const ButtonClient = forwardRef<ButtonRef, ButtonProps>(
  ({ children, ...rest }, ref) => {
    return (
      <button ref={ref} {...rest}>
        {children}
      </button>
    );
  }
);

ButtonClient.displayName = "ButtonClient";

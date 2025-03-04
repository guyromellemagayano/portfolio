"use client";

import { forwardRef } from "react";

import type { RubyProps, RubyRef } from "./Ruby";

/**
 * Render the ruby annotation client component.
 * @param {RubyProps} props - The ruby annotation client component properties
 * @param {RubyRef} ref - The ruby annotation client component reference
 * @returns The rendered ruby annotation client component
 */
export const RubyClient = forwardRef<RubyRef, RubyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ruby ref={ref} {...rest}>
        {children}
      </ruby>
    );
  }
);

RubyClient.displayName = "RubyClient";

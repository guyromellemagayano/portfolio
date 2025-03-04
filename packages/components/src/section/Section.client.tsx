"use client";

import { forwardRef } from "react";

import type { SectionProps, SectionRef } from "./Section";

/**
 * Render the generic section client component.
 * @param {SectionProps} props - The generic section client component properties
 * @param {SectionRef} ref - The generic section client component reference
 * @returns The rendered generic section client component
 */
export const SectionClient = forwardRef<SectionRef, SectionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <section ref={ref} {...rest}>
        {children}
      </section>
    );
  }
);

SectionClient.displayName = "SectionClient";

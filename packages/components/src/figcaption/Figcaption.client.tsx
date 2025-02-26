"use client";

import { forwardRef } from "react";

import type { FigcaptionProps, FigcaptionRef } from "./Figcaption";

/**
 * Render the figure caption client component.
 * @param {FigcaptionProps} props - The figure caption client component properties
 * @param {FigcaptionRef} ref - The figure caption client component reference
 * @returns The rendered figure caption client component
 */
export const FigcaptionClient = forwardRef<FigcaptionRef, FigcaptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <figcaption ref={ref} {...rest}>
        {children}
      </figcaption>
    );
  }
);

FigcaptionClient.displayName = "FigcaptionClient";

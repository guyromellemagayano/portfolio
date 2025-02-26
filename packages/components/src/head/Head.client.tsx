"use client";

import { forwardRef } from "react";

import type { HeadProps, HeadRef } from "./Head";

/**
 * Render the document metadata (header) client component.
 * @param {HeadProps} props - The document metadata (header) client component properties
 * @param {HeadRef} ref - The document metadata (header) client component reference
 * @returns The rendered document metadata (header) client component
 */
export const HeadClient = forwardRef<HeadRef, HeadProps>(
  ({ children, ...rest }, ref) => {
    return (
      <head ref={ref} {...rest}>
        {children}
      </head>
    );
  }
);

HeadClient.displayName = "HeadClient";

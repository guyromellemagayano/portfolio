"use client";

import { forwardRef } from "react";

import type { BodyProps, BodyRef } from "./Body";

/**
 * Render the document body client component.
 * @param {BodyProps} props - The document body client component properties
 * @param {BodyRef} ref - The document body client component reference
 * @returns The rendered document body client component
 */
export const BodyClient = forwardRef<BodyRef, BodyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <body ref={ref} {...rest}>
        {children}
      </body>
    );
  }
);

BodyClient.displayName = "BodyClient";

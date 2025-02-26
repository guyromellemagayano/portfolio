"use client";

import { forwardRef } from "react";

import type { HeadingProps, HeadingRef } from "./Heading";

/**
 * Render the HTML section heading client component.
 * @param {HeadingProps} props - The HTML section heading client component properties
 * @param {HeadingRef} ref - The HTML section heading client component reference
 * @returns The rendered HTML section heading client component
 */
export const HeadingClient = forwardRef<HeadingRef, HeadingProps>(
  ({ as: Component = "h1", children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

HeadingClient.displayName = "HeadingClient";

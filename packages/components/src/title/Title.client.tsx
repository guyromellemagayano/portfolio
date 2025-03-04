"use client";

import { forwardRef } from "react";

import type { TitleProps, TitleRef } from "./Title";

/**
 * Render the document title client component.
 * @param {TitleProps} props - The document title client component properties
 * @param {TitleRef} ref - The document title client component reference
 * @returns The rendered document title client component
 */
export const TitleClient = forwardRef<TitleRef, TitleProps>(
  ({ children, ...rest }, ref) => {
    return (
      <title ref={ref} {...rest}>
        {children}
      </title>
    );
  }
);

TitleClient.displayName = "TitleClient";

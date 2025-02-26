"use client";

import { forwardRef } from "react";

import type { HtmlProps, HtmlRef } from "./Html";

/**
 * Render the HTML document/root client component.
 * @param {HtmlProps} props - The HTML document/root client component properties
 * @param {HtmlRef} ref - The HTML document/root client component reference
 * @returns The rendered HTML document/root client component
 */
export const HtmlClient = forwardRef<HtmlRef, HtmlProps>(
  ({ children, ...rest }, ref) => {
    return (
      <html ref={ref} {...rest}>
        {children}
      </html>
    );
  }
);

HtmlClient.displayName = "HtmlClient";

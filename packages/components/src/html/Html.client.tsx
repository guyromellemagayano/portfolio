"use client";

import { forwardRef } from "react";

import type { HtmlProps, HtmlRef } from "./Html";

/**
 * Render the HTML client component.
 * @param {HtmlProps} props - The HTML client component properties
 * @param {HtmlRef} ref - The HTML client component reference
 * @returns The rendered HTML client component
 */
const HtmlClient = forwardRef<HtmlRef, HtmlProps>(
  ({ children, ...rest }, ref) => {
    return (
      <html ref={ref} {...rest}>
        {children}
      </html>
    );
  }
);

HtmlClient.displayName = "HtmlClient";

export default HtmlClient;

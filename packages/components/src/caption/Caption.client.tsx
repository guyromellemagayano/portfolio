"use client";

import { forwardRef } from "react";

import type { CaptionProps, CaptionRef } from "./Caption";

/**
 * Render the caption client component.
 * @param {CaptionProps} props - The caption client component properties
 * @param {CaptionRef} ref - The caption client component reference
 * @returns The rendered caption client component
 */
const CaptionClient = forwardRef<CaptionRef, CaptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <caption ref={ref} {...rest}>
        {children}
      </caption>
    );
  }
);

CaptionClient.displayName = "CaptionClient";

export default CaptionClient;

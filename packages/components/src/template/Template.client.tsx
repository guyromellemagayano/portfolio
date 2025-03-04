"use client";

import { forwardRef } from "react";

import type { TemplateProps, TemplateRef } from "./Template";

/**
 * Render the content template client component.
 * @param {TemplateProps} props - The content template client component properties
 * @param {TemplateRef} ref - The content template client component reference
 * @returns The rendered content template client component
 */
export const TemplateClient = forwardRef<TemplateRef, TemplateProps>(
  ({ children, ...rest }, ref) => {
    return (
      <template ref={ref} {...rest}>
        {children}
      </template>
    );
  }
);

TemplateClient.displayName = "TemplateClient";

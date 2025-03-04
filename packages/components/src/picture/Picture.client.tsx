"use client";

import { forwardRef } from "react";

import type { PictureProps, PictureRef } from "./Picture";

/**
 * Render the picture client component.
 * @param {PictureProps} props - The picture client component properties
 * @param {PictureRef} ref - The picture client component reference
 * @returns The rendered picture client component
 */
export const PictureClient = forwardRef<PictureRef, PictureProps>(
  ({ children, ...rest }, ref) => {
    return (
      <picture ref={ref} {...rest}>
        {children}
      </picture>
    );
  }
);

PictureClient.displayName = "PictureClient";

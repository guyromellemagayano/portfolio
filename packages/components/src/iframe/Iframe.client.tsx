"use client";

import { forwardRef } from "react";

import type { IframeProps, IframeRef } from "./Iframe";

/**
 * Render the inline frame client component.
 * @param {IframeProps} props - The inline frame client component properties
 * @param {IframeRef} ref - The inline frame client component reference
 * @returns The rendered inline frame client component
 */
export const IframeClient = forwardRef<IframeRef, IframeProps>(
  ({ ...rest }, ref) => {
    return <iframe ref={ref} {...rest} />;
  }
);

IframeClient.displayName = "IframeClient";

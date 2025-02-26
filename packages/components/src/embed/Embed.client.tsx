"use client";

import { forwardRef } from "react";

import type { EmbedProps, EmbedRef } from "./Embed";

/**
 * Render the embed external content client component.
 * @param {EmbedProps} props - The embed external content client component properties
 * @param {EmbedRef} ref - The embed external content client component reference
 * @returns The rendered embed external content client component
 */
export const EmbedClient = forwardRef<EmbedRef, EmbedProps>(
  ({ ...rest }, ref) => {
    return <embed ref={ref} {...rest} />;
  }
);

EmbedClient.displayName = "EmbedClient";

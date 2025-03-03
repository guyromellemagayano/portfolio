"use client";

import { forwardRef } from "react";

import type { MetaProps, MetaRef } from "./Meta";

/**
 * Render the meta client component.
 * @param {MetaProps} props - The meta client component properties
 * @param {MetaRef} ref - The meta client component reference
 * @returns The rendered meta client component
 */
export const MetaClient = forwardRef<MetaRef, MetaProps>(({ ...rest }, ref) => {
  return <meta ref={ref} {...rest} />;
});

MetaClient.displayName = "MetaClient";

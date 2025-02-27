"use client";

import { forwardRef } from "react";

import type { LinkProps, LinkRef } from "./Link";

/**
 * Render the external resource link client component.
 * @param {LinkProps} props - The external resource link client component properties
 * @param {LinkRef} ref - The external resource link client component reference
 * @returns The rendered external resource link client component
 */
export const LinkClient = forwardRef<LinkRef, LinkProps>(({ ...rest }, ref) => {
  return <link ref={ref} {...rest} />;
});

LinkClient.displayName = "LinkClient";

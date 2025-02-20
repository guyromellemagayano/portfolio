"use client";

import { forwardRef } from "react";

import type { AProps, ARef } from "./A";

/**
 * Render the anchor client component.
 * @param {AProps} props - The anchor client component properties
 * @param {ARef} ref - The anchor client component reference
 * @returns The rendered anchor client component
 */
const AClient = forwardRef<ARef, AProps>(({ children, ...rest }, ref) => {
  return (
    <a ref={ref} {...rest}>
      {children}
    </a>
  );
});

AClient.displayName = "AClient";

export default AClient;

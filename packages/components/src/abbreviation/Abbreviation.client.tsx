"use client";

import { forwardRef } from "react";

import type { AbbreviationProps, AbbreviationRef } from "./Abbreviation";

/**
 * Render the abbreviation client component.
 * @param {AbbreviationProps} props - The abbreviation client component properties
 * @param {AbbreviationRef} ref - The abbreviation client component reference
 * @returns The rendered abbreviation client component
 */
const AbbreviationClient = forwardRef<AbbreviationRef, AbbreviationProps>(
  ({ children, ...rest }, ref) => {
    return (
      <abbr ref={ref} {...rest}>
        {children}
      </abbr>
    );
  }
);

AbbreviationClient.displayName = "AbbreviationClient";

export default AbbreviationClient;

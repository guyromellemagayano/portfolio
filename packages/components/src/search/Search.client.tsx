"use client";

import { forwardRef } from "react";

import type { SearchProps, SearchRef } from "./Search";

/**
 * Render the generic search client component.
 * @param {SearchProps} props - The generic search client component properties
 * @param {SearchRef} ref - The generic search client component reference
 * @returns The rendered generic search client component
 */
export const SearchClient = forwardRef<SearchRef, SearchProps>(
  ({ children, ...rest }, ref) => {
    return (
      <search ref={ref} {...rest}>
        {children}
      </search>
    );
  }
);

SearchClient.displayName = "SearchClient";

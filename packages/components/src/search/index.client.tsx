"use client";

import React, { memo } from "react";

import { Search, type SearchProps, type SearchRef } from ".";

/** Render the generic search client component. */
export const SearchClient = React.forwardRef<SearchRef, SearchProps>(
  (props, ref) => <Search ref={ref} {...props} />
);

SearchClient.displayName = "SearchClient";

/** Memoized version of `SearchClient` for performance optimization. */
export const MemoizedSearchClient = memo(SearchClient);

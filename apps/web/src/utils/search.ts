/**
 * @file apps/web/src/utils/search.ts
 * @author Guy Romelle Magayano
 * @description Utilities for search.
 */

import { useMemo, useState } from "react";

import Fuse, { type FuseOptionKey } from "fuse.js";

type FuzzySearchOptions = Omit<typeof Fuse.config, "keys">;

/** Custom React hook for performing fuzzy search on given data using Fuse.js. */
export function useFuzzySearch<T extends Record<string, unknown> = {}>(
  data: T[],
  options?: FuzzySearchOptions,
  keys: ReadonlyArray<FuseOptionKey<T>> = ["author", "title", "description"]
) {
  const [searchQuery, setSearchQuery] = useState("");

  // Create a fuzzy search instance
  const fuzzySearch = useMemo(() => {
    const keysArray = [...keys];
    const index = Fuse.createIndex(keysArray, data);
    return new Fuse(data, { ...options, keys: keysArray }, index);
  }, [data, keys, options]);

  // Perform the search and return the results
  const results = useMemo(() => {
    if (!searchQuery.trim()) {
      return data;
    }

    return fuzzySearch.search(searchQuery).map((result) => result.item);
  }, [searchQuery, fuzzySearch, data]);

  return {
    searchQuery,
    setSearchQuery,
    results,
  };
}

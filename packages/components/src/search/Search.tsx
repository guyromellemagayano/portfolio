import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const SearchClient = lazy(async () => {
  const module = await import("./Search.client");
  return { default: module.SearchClient };
});

export type SearchRef = HTMLElement;
export type SearchProps = HTMLAttributes<SearchRef> & CommonComponentProps;

/**
 * Render the default generic search server component.
 * @param {SearchProps} props - The default generic search server component properties
 * @returns The rendered default generic search server component
 */
export const Search = ({
  isClient = false,
  children,
  ...rest
}: SearchProps) => {
  const element = <search {...rest}>{children}</search>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SearchClient {...rest}>{children}</SearchClient>
      </Suspense>
    );
  }

  return element;
};

Search.displayName = "Search";

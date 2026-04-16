import React, { Suspense } from "react";

import type { CommonComponentProps } from "../types";

const SearchClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SearchClient };
});
const MemoizedSearchClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedSearchClient };
});

export type SearchRef = React.ComponentRef<"search">;

export interface SearchProps
  extends React.ComponentPropsWithoutRef<"search">, CommonComponentProps {}

/** Render the generic search server component. */
export const Search = React.forwardRef<SearchRef, SearchProps>((props, ref) => {
  const {
    as: Component = "search",
    isClient = false,
    isMemoized = false,
    children,
    ...rest
  } = props;

  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedSearchClient : SearchClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} ref={ref}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
});

Search.displayName = "Search";

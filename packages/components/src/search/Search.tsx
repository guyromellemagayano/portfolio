import React from "react";

import { type CommonComponentProps } from "../types";

export type SearchRef = React.ComponentRef<"search">;

export interface SearchProps
  extends React.ComponentPropsWithoutRef<"search">, CommonComponentProps {}

/** Render the generic search component. */
export const Search = React.forwardRef<SearchRef, SearchProps>((props, ref) => {
  const { as: Component = "search", children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Search.displayName = "Search";

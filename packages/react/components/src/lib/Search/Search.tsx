import React from 'react'

export type SearchRef = HTMLElement
export type SearchProps = React.HTMLAttributes<SearchRef>

/**
 * Render the search component.
 * @param {SearchProps} props - The search component properties
 * @param {SearchRef} ref - The search component reference
 * @returns The rendered search component
 */
const Search = React.forwardRef<SearchRef, SearchProps>(
  ({ children, ...rest }, ref) => {
    return (
      <search ref={ref} {...rest}>
        {children}
      </search>
    )
  }
)

Search.displayName = 'Search'

export default Search

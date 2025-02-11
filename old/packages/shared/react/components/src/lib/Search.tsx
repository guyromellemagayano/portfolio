import React from 'react'

export type TSearchRef = HTMLElement
export type TSearchProps = React.HTMLAttributes<TSearchRef>

/**
 * Render the search component.
 * @param {TSearchProps} props - The search component properties
 * @param {TSearchRef} ref - The search component reference
 * @returns The rendered search component
 */
const Search = React.forwardRef<TSearchRef, TSearchProps>(
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

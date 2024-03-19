import { HTMLAttributes, forwardRef } from 'react'

export type SearchRef = HTMLElement
export type SearchProps = HTMLAttributes<SearchRef>

/**
 * Render the search component.
 * @param children - The children of the search.
 * @param rest - The rest of the props of the search.
 * @returns The rendered search component.
 */
const Search = forwardRef<SearchRef, SearchProps>(
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

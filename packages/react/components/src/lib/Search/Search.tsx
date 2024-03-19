import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

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
      <search ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </search>
    )
  }
)

Search.displayName = 'Search'

export default Search

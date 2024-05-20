'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type SearchRef = HTMLElement
export type SearchProps = HTMLAttributes<SearchRef>

/**
 * Render the search component.
 * @param {SearchProps} props - The search component properties.
 * @param {SearchRef} ref - The search component reference.
 * @returns The rendered search component.
 */
const Search = forwardRef<SearchRef, SearchProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <search ref={ref} {...rest}>
      {children}
    </search>
  )
})

Search.displayName = 'Search'

export default Search

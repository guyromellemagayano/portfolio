import React from 'react'

export type TAbbreviationRef = HTMLElement
export type TAbbreviationProps = React.HTMLAttributes<TAbbreviationRef>

/**
 * Render the abbreviation component.
 * @param {TAbbreviationProps} props - The abbreviation component properties
 * @param {TAbbreviationRef} ref - The abbreviation component reference
 * @returns The rendered abbreviation component
 */
const Abbreviation = React.forwardRef<TAbbreviationRef, TAbbreviationProps>(
  ({ children, ...rest }, ref) => {
    return (
      <abbr ref={ref} {...rest}>
        {children}
      </abbr>
    )
  }
)

Abbreviation.displayName = 'Abbreviation'

export default Abbreviation

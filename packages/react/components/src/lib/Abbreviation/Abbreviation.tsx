import React from 'react'

export type AbbreviationRef = HTMLElement
export type AbbreviationProps = React.HTMLAttributes<AbbreviationRef>

/**
 * Render the abbreviation component.
 * @param {AbbreviationProps} props - The abbreviation component properties
 * @param {AbbreviationRef} ref - The abbreviation component reference
 * @returns The rendered abbreviation component
 */
const Abbreviation = React.forwardRef<AbbreviationRef, AbbreviationProps>(
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

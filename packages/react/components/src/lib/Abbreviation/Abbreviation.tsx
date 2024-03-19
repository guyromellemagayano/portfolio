import { HTMLAttributes, forwardRef } from 'react'

export type AbbreviationRef = HTMLElement
export type AbbreviationProps = HTMLAttributes<AbbreviationRef>

/**
 * Render the abbreviation component.
 * @param children - The children of the abbreviation.
 * @param rest - The rest of the props of the abbreviation.
 * @returns The rendered abbreviation component.
 */
const Abbreviation = forwardRef<AbbreviationRef, AbbreviationProps>(
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

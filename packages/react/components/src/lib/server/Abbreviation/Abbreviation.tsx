import { HTMLAttributes, forwardRef } from 'react'

export type AbbreviationRef = HTMLElement
export type AbbreviationProps = HTMLAttributes<AbbreviationRef>

/**
 * Render the abbreviation component.
 * @param {AbbreviationProps} props - The abbreviation component properties.
 * @param {AbbreviationRef} ref - The abbreviation component reference.
 * @returns The rendered abbreviation component.
 */
const Abbreviation = forwardRef<AbbreviationRef, AbbreviationProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <abbr ref={ref} {...rest}>
        {children}
      </abbr>
    )
  }
)

Abbreviation.displayName = 'Abbreviation'

export default Abbreviation

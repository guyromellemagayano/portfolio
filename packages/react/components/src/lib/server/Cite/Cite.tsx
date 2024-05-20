import { HTMLAttributes, forwardRef } from 'react'

export type CiteRef = HTMLQuoteElement
export type CiteProps = HTMLAttributes<CiteRef>

/**
 * Render the cite component.
 * @param {CiteProps} props - The cite component properties.
 * @param {CiteRef} ref - The cite component reference.
 * @returns The rendered cite component.
 */
const Cite = forwardRef<CiteRef, CiteProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <cite ref={ref} {...rest}>
      {children}
    </cite>
  )
})

Cite.displayName = 'Cite'

export default Cite

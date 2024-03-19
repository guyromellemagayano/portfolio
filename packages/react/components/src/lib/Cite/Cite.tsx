import { HTMLAttributes, forwardRef } from 'react'

export type CiteRef = HTMLQuoteElement
export type CiteProps = HTMLAttributes<CiteRef>

/**
 * Render the cite component.
 * @param children - The children of the cite.
 * @param rest - The rest of the props of the cite.
 * @returns The rendered cite component.
 */
const Cite = forwardRef<CiteRef, CiteProps>(({ children, ...rest }, ref) => {
  return (
    <cite ref={ref} {...rest}>
      {children}
    </cite>
  )
})

Cite.displayName = 'Cite'

export default Cite

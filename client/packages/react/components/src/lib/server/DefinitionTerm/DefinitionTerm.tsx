import { HTMLAttributes, forwardRef } from 'react'

export type DefinitionTermRef = HTMLElement
export type DefinitionTermProps = HTMLAttributes<DefinitionTermRef>

/**
 * Render the definition term component.
 * @param children - The children of the definition term.
 * @param rest - The rest of the props of the definition term.
 * @returns The rendered definition term component.
 */
export const DefinitionTerm = forwardRef<
  DefinitionTermRef,
  DefinitionTermProps
>(({ children, ...rest }, ref) => {
  return (
    <dt ref={ref} {...rest}>
      {children}
    </dt>
  )
})

DefinitionTerm.displayName = 'DefinitionTerm'

export default DefinitionTerm

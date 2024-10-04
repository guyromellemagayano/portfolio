import React from 'react'

export type TDefinitionTermRef = HTMLElement
export type TDefinitionTermProps = React.HTMLAttributes<TDefinitionTermRef>

/**
 * Render the definition term component.
 * @param {TDefinitionTermProps} props - The definition term component properties
 * @param {TDefinitionTermRef} ref - The definition term component reference
 * @returns The rendered definition term component
 */
const DefinitionTerm = React.forwardRef<
  TDefinitionTermRef,
  TDefinitionTermProps
>(({ children, ...rest }, ref) => {
  return (
    <dt ref={ref} {...rest}>
      {children}
    </dt>
  )
})

DefinitionTerm.displayName = 'DefinitionTerm'

export default DefinitionTerm

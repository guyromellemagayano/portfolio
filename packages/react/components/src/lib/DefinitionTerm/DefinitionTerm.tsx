import React from 'react'

export type DefinitionTermRef = HTMLElement
export type DefinitionTermProps = React.HTMLAttributes<DefinitionTermRef>

/**
 * Render the definition term component
 * @param {DefinitionTermProps} props - The definition term component properties
 * @param {DefinitionTermRef} ref - The definition term component reference
 * @returns The rendered definition term component
 */
const DefinitionTerm = React.forwardRef<DefinitionTermRef, DefinitionTermProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <dt ref={ref} {...rest}>
        {children}
      </dt>
    )
  }
)

DefinitionTerm.displayName = 'DefinitionTerm'

export default DefinitionTerm

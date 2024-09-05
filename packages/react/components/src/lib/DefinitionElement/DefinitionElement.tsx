import React from 'react'

export type DefinitionElementRef = HTMLElement
export type DefinitionElementProps = React.HTMLAttributes<DefinitionElementRef>

/**
 * Render the definition element component.
 * @param {DefinitionElementProps} props - The definition element component properties
 * @param {DefinitionElementRef} ref - The definition element component reference
 * @returns The rendered definition element component
 */
const DefinitionElement = React.forwardRef<
  DefinitionElementRef,
  DefinitionElementProps
>(({ children, ...rest }, ref) => {
  return (
    <dfn ref={ref} {...rest}>
      {children}
    </dfn>
  )
})

DefinitionElement.displayName = 'DefinitionElement'

export default DefinitionElement

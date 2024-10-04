import React from 'react'

export type TDefinitionElementRef = HTMLElement
export type TDefinitionElementProps =
  React.HTMLAttributes<TDefinitionElementRef>

/**
 * Render the definition element component.
 * @param {TDefinitionElementProps} props - The definition element component properties
 * @param {TDefinitionElementRef} ref - The definition element component reference
 * @returns The rendered definition element component
 */
const DefinitionElement = React.forwardRef<
  TDefinitionElementRef,
  TDefinitionElementProps
>(({ children, ...rest }, ref) => {
  return (
    <dfn ref={ref} {...rest}>
      {children}
    </dfn>
  )
})

DefinitionElement.displayName = 'DefinitionElement'

export default DefinitionElement

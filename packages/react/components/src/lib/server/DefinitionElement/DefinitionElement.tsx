import { HTMLAttributes, forwardRef } from 'react'

export type DefinitionElementRef = HTMLElement
export type DefinitionElementProps = HTMLAttributes<DefinitionElementRef>

/**
 * Render the definition element component.
 * @param children - The children of the definition element.
 * @param rest - The rest of the props of the definition element.
 * @returns The rendered definition element component.
 */
export const DefinitionElement = forwardRef<
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

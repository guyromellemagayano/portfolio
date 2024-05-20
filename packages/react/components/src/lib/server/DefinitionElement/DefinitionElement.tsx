import { HTMLAttributes, forwardRef } from 'react'

export type DefinitionElementRef = HTMLElement
export type DefinitionElementProps = HTMLAttributes<DefinitionElementRef>

/**
 * Render the definition element component.
 * @param {DefinitionElementProps} props - The definition element component properties.
 * @param {DefinitionElementRef} ref - The definition element component reference.
 * @returns The rendered definition element component.
 */
const DefinitionElement = forwardRef<
  DefinitionElementRef,
  DefinitionElementProps
>((props, ref) => {
  const { children, ...rest } = props

  return (
    <dfn ref={ref} {...rest}>
      {children}
    </dfn>
  )
})

DefinitionElement.displayName = 'DefinitionElement'

export default DefinitionElement

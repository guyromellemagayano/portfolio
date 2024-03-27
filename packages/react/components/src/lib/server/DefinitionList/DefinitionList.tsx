import { HTMLAttributes, forwardRef } from 'react'

export type DefinitionListRef = HTMLDListElement
export type DefinitionListProps = HTMLAttributes<DefinitionListRef>

/**
 * Render the definition list component.
 * @param children - The children of the definition list.
 * @param rest - The rest of the props of the definition list.
 * @returns The rendered definition list component.
 */
export const DefinitionList = forwardRef<
  DefinitionListRef,
  DefinitionListProps
>(({ children, ...rest }, ref) => {
  return (
    <dl ref={ref} {...rest}>
      {children}
    </dl>
  )
})

DefinitionList.displayName = 'DefinitionList'

export default DefinitionList

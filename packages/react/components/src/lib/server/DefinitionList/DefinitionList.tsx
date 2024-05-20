import { HTMLAttributes, forwardRef } from 'react'

export type DefinitionListRef = HTMLDListElement
export type DefinitionListProps = HTMLAttributes<DefinitionListRef>

/**
 * Render the definition list component.
 * @param {DefinitionListProps} props - The definition list component properties.
 * @param {DefinitionListRef} ref - The definition list component reference.
 * @returns The rendered definition list component.
 */
const DefinitionList = forwardRef<DefinitionListRef, DefinitionListProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <dl ref={ref} {...rest}>
        {children}
      </dl>
    )
  }
)

DefinitionList.displayName = 'DefinitionList'

export default DefinitionList

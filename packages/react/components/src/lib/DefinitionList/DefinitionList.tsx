import React from 'react'

export type DefinitionListRef = HTMLDListElement
export type DefinitionListProps = React.HTMLAttributes<DefinitionListRef>

/**
 * Render the definition list component.
 * @param {DefinitionListProps} props - The definition list component properties
 * @param {DefinitionListRef} ref - The definition list component reference
 * @returns The rendered definition list component
 */
const DefinitionList = React.forwardRef<DefinitionListRef, DefinitionListProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dl ref={ref} {...rest}>
        {children}
      </dl>
    )
  }
)

DefinitionList.displayName = 'DefinitionList'

export default DefinitionList

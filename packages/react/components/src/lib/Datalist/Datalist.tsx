import React from 'react'

export type TDatalistRef = HTMLDataListElement
export type TDatalistProps = React.HTMLAttributes<TDatalistRef>

/**
 * Render the datalist component.
 * @param {TDatalistProps} props - The datalist component properties
 * @param {TDatalistRef} ref - The datalist component reference
 * @returns The rendered datalist component
 */
const Datalist = React.forwardRef<TDatalistRef, TDatalistProps>(
  ({ children, ...rest }, ref) => {
    return (
      <datalist ref={ref} {...rest}>
        {children}
      </datalist>
    )
  }
)

Datalist.displayName = 'Datalist'

export default Datalist

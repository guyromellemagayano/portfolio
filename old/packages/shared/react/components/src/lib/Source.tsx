import React from 'react'

export type TSourceRef = HTMLSourceElement
export type TSourceProps = React.SourceHTMLAttributes<TSourceRef>

/**
 * Render the source component.
 * @param {TSourceProps} props - The source component properties
 * @param {TSourceRef} ref - The source component reference
 * @returns The rendered source component
 */
const Source = React.forwardRef<TSourceRef, TSourceProps>(
  ({ children, ...rest }, ref) => {
    return (
      <source ref={ref} {...rest}>
        {children}
      </source>
    )
  }
)

Source.displayName = 'Source'

export default Source

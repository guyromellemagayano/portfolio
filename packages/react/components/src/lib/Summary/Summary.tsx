import React from 'react'

export type TSummaryRef = HTMLElement
export type TSummaryProps = React.HTMLAttributes<TSummaryRef>

/**
 * Render the summary component.
 * @param {TSummaryProps} props - The summary component properties
 * @param {TSummaryRef} ref - The summary component reference
 * @returns The rendered summary component
 */
const Summary = React.forwardRef<TSummaryRef, TSummaryProps>(
  ({ children, ...rest }, ref) => {
    return (
      <summary ref={ref} {...rest}>
        {children}
      </summary>
    )
  }
)

Summary.displayName = 'Summary'

export default Summary

import React from 'react'

export type TSampleRef = HTMLElement
export type TSampleProps = React.HTMLAttributes<TSampleRef>

/**
 * Render the sample component.
 * @param {TSampleProps} props - The sample component properties
 * @param {TSampleRef} ref - The sample component reference
 * @returns The rendered sample component
 */
const Sample = React.forwardRef<TSampleRef, TSampleProps>(
  ({ children, ...rest }, ref) => {
    return (
      <samp ref={ref} {...rest}>
        {children}
      </samp>
    )
  }
)

Sample.displayName = 'Sample'

export default Sample

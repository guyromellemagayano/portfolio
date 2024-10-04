import React from 'react'

export type TDataRef = HTMLDataElement
export type TDataProps = React.DataHTMLAttributes<TDataRef>

/**
 * Render the data component.
 * @param {TDataProps} props - The data component properties
 * @param {TDataRef} ref - The data component reference
 * @returns The rendered data component
 */
const Data = React.forwardRef<TDataRef, TDataProps>(
  ({ children, ...rest }, ref) => {
    return (
      <data ref={ref} {...rest}>
        {children}
      </data>
    )
  }
)

Data.displayName = 'Data'

export default Data

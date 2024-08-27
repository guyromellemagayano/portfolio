import React from 'react'

export type DataRef = HTMLDataElement
export type DataProps = React.DataHTMLAttributes<DataRef>

/**
 * Render the data component
 * @param {DataProps} props - The data component properties
 * @param {DataRef} ref - The data component reference
 * @returns The rendered data component
 */
const Data = React.forwardRef<DataRef, DataProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <data ref={ref} {...rest}>
      {children}
    </data>
  )
})

Data.displayName = 'Data'

export default Data

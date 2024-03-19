'use client'

import { DataHTMLAttributes, forwardRef } from 'react'

export type DataRef = HTMLDataElement
export type DataProps = DataHTMLAttributes<DataRef>

/**
 * Render the data component.
 * @param children - The children of the data.
 * @param rest - The rest of the props of the data.
 * @returns The rendered data component.
 */
const Data = forwardRef<DataRef, DataProps>(({ children, ...rest }, ref) => {
  return (
    <data ref={ref} {...rest}>
      {children}
    </data>
  )
})

Data.displayName = 'Data'

export default Data

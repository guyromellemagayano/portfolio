'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type DatalistRef = HTMLDataListElement
export type DatalistProps = HTMLAttributes<DatalistRef>

/**
 * Render the datalist component.
 * @param children - The children of the datalist.
 * @param rest - The rest of the props of the datalist.
 * @returns The rendered datalist component.
 */
export const Datalist = forwardRef<DatalistRef, DatalistProps>(
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

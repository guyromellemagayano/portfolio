'use client'

import React from 'react'

export type DatalistRef = HTMLDataListElement
export type DatalistProps = React.HTMLAttributes<DatalistRef>

/**
 * Render the datalist component.
 * @param {DatalistProps} props - The datalist component properties
 * @param {DatalistRef} ref - The datalist component reference
 * @returns The rendered datalist component
 */
const Datalist = React.forwardRef<DatalistRef, DatalistProps>(
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

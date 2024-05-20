'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type DatalistRef = HTMLDataListElement
export type DatalistProps = HTMLAttributes<DatalistRef>

/**
 * Render the datalist component.
 * @param {DatalistProps} props - The datalist component properties.
 * @param {DatalistRef} ref - The datalist component reference.
 * @returns The rendered datalist component.
 */
const Datalist = forwardRef<DatalistRef, DatalistProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <datalist ref={ref} {...rest}>
      {children}
    </datalist>
  )
})

Datalist.displayName = 'Datalist'

export default Datalist

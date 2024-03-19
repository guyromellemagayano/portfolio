'use client'

import { AreaHTMLAttributes, forwardRef } from 'react'

export type AreaRef = HTMLAreaElement
export type AreaProps = AreaHTMLAttributes<AreaRef>

/**
 * Render the area component.
 * @param children - The children of the area.
 * @param rest - The rest of the props of the area.
 * @returns The rendered area component.
 */
const Area = forwardRef<AreaRef, AreaProps>(({ children, ...rest }, ref) => {
  return (
    <area ref={ref} {...rest}>
      {children}
    </area>
  )
})

Area.displayName = 'Area'

export default Area

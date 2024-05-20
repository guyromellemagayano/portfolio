import { AreaHTMLAttributes, forwardRef } from 'react'

export type AreaRef = HTMLAreaElement
export type AreaProps = AreaHTMLAttributes<AreaRef>

/**
 * Render the area component.
 * @param {AreaProps} props - The area component properties.
 * @param {AreaRef} ref - The area component reference.
 * @returns The rendered area component.
 */
const Area = forwardRef<AreaRef, AreaProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <area ref={ref} {...rest}>
      {children}
    </area>
  )
})

Area.displayName = 'Area'

export default Area

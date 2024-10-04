import React from 'react'

export type TAreaRef = HTMLAreaElement
export type TAreaProps = React.AreaHTMLAttributes<TAreaRef>

/**
 * Render the area component.
 * @param {TAreaProps} props - The area component properties
 * @param {TAreaRef} ref - The area component reference
 * @returns The rendered area component
 */
const Area = React.forwardRef<TAreaRef, TAreaProps>(
  ({ children, ...rest }, ref) => {
    return (
      <area ref={ref} {...rest}>
        {children}
      </area>
    )
  }
)

Area.displayName = 'Area'

export default Area

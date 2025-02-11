import React from 'react'

export type TPictureRef = HTMLPictureElement
export type TPictureProps = React.HTMLAttributes<TPictureRef>

/**
 * Render the picture component.
 * @param {TPictureProps} props - The picture component properties
 * @param {TPictureRef} ref - The picture component reference
 * @returns The rendered picture component
 */
const Picture = React.forwardRef<TPictureRef, TPictureProps>(
  ({ children, ...rest }, ref) => {
    return (
      <picture ref={ref} {...rest}>
        {children}
      </picture>
    )
  }
)

Picture.displayName = 'Picture'

export default Picture

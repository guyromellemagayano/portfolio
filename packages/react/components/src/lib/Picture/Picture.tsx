'use client'

import React from 'react'

export type PictureRef = HTMLPictureElement
export type PictureProps = React.HTMLAttributes<PictureRef>

/**
 * Render the picture component.
 * @param {PictureProps} props - The picture component properties
 * @param {PictureRef} ref - The picture component reference
 * @returns The rendered picture component
 */
const Picture = React.forwardRef<PictureRef, PictureProps>(
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

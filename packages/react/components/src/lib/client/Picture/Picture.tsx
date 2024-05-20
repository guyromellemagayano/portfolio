'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type PictureRef = HTMLPictureElement
export type PictureProps = HTMLAttributes<PictureRef>

/**
 * Render the picture component.
 * @param {PictureProps} props - The picture component properties.
 * @param {PictureRef} ref - The picture component reference.
 * @returns The rendered picture component.
 */
const Picture = forwardRef<PictureRef, PictureProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <picture ref={ref} {...rest}>
      {children}
    </picture>
  )
})

Picture.displayName = 'Picture'

export default Picture

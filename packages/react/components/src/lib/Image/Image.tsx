'use client'

import React from 'react'

export type ImageRef = HTMLImageElement
export type ImageProps = React.ImgHTMLAttributes<ImageRef>

/**
 * Render the image component
 * @param {ImageProps} props - The image component properties
 * @param {ImageRef} ref - The image component reference
 * @returns The rendered  image component
 */
const Image = React.forwardRef<ImageRef, ImageProps>((props, ref) => {
  const { src = '#', alt = '', ...rest } = props

  return <img ref={ref} src={src} alt={alt} {...rest} />
})

Image.displayName = 'Image'

export default Image

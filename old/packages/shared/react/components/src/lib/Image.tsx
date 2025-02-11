/* eslint-disable @next/next/no-img-element */
import React from 'react'

export type TImageRef = HTMLImageElement
export type TImageProps = React.ImgHTMLAttributes<TImageRef>

/**
 * Render the image component
 * @param {TImageProps} props - The image component properties
 * @param {TImageRef} ref - The image component reference
 * @returns The rendered  image component
 */
const Image = React.forwardRef<TImageRef, TImageProps>(
  ({ src = '#', alt = '', ...rest }, ref) => {
    return <img ref={ref} src={src} alt={alt} {...rest} />
  }
)

Image.displayName = 'Image'

export default Image

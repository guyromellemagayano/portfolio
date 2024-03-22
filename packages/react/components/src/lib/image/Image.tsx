'use client'

import { ImgHTMLAttributes, forwardRef } from 'react'

import dynamic from 'next/dynamic'

export const NextImage = dynamic(() => import('next/image'))

export type ImageRef = HTMLImageElement
export type ImageProps = ImgHTMLAttributes<ImageRef> & {
  isNextImage?: boolean
  width?: number
  height?: number
}

/**
 * Render the image component.
 * @param src - The source of the image.
 * @param alt - The alternate text of the image.
 * @param isNextImage - The flag to use the next image.
 * @param rest - The rest of the props of the image.
 * @returns The rendered  image component.
 */
export const Image = forwardRef<ImageRef, ImageProps>(
  (
    { src = '#', alt = '', width, height, isNextImage = false, ...rest },
    ref
  ) => {
    if (isNextImage) {
      return <NextImage ref={ref} src={src} alt={alt} {...rest} />
    }

    return <img ref={ref} src={src} alt={alt} {...rest} />
  }
)

Image.displayName = 'Image'

export default Image

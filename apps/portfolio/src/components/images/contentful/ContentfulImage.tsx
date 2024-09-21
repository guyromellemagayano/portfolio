'use client'

import { forwardRef, memo } from 'react'

import Image, { type ImageLoaderProps } from 'next/image'

import { avatarDefaults } from '@portfolio/configs'
import type {
  CommonComponentsProps,
  ImageProps,
  ImageRef
} from '@react-components'

export type TContentfulImageRef = ImageRef
export type TContentfulImageProps = ImageProps &
  CommonComponentsProps &
  ImageLoaderProps

// Custom image loader for `contentful` images
// https://www.contentful.com/developers/docs/references/images-api/
export const contentfulLoader = ({
  src,
  width,
  quality
}: TContentfulImageProps) => {
  const url = new URL(src)
  url.searchParams.set('fm', 'webp')
  url.searchParams.set('w', width.toString())
  url.searchParams.set('q', (quality || 75).toString())
  return url.href
}

/**
 * Renders the `contentful` image component.
 * @param {TContentfulImageProps} props - The component props
 * @returns The rendered `contentful` image component
 */
const ContentfulImage = memo(
  forwardRef<TContentfulImageRef, TContentfulImageProps>(
    ({ alt, ...rest }, ref) => {
      const avatarFile = avatarDefaults.file

      return (
        <Image
          ref={ref}
          alt={alt}
          placeholder="blur"
          loader={contentfulLoader}
          priority
          {...avatarFile}
          {...rest}
        />
      )
    }
  )
)

ContentfulImage.displayName = 'ContentfulImage'

export default ContentfulImage

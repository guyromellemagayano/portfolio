'use client'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import type { TPhotoLayoutData } from '@/components/layouts/Photo'

/**
 * Render the image component.
 * @param data - The image data.
 * @returns {JSX.Element} The rendered component.
 */
const ImageLayout = (props: TPhotoLayoutData): JSX.Element => {
  const src: string | StaticImport = props?.src || '#'
  const alt: string = props?.alt ?? ''
  const sizes: string = props?.sizes ?? '100vw'
  const className: string = props?.className ?? ''
  const unoptimized: boolean = props?.unoptimized ?? false
  const priority = props?.priority || false

  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      className={className}
      unoptimized={unoptimized}
      priority={priority}
    />
  )
}

export default ImageLayout

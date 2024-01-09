// eslint-disable jsx-a11y/alt-text
'use client'

import Image from 'next/image'

import { TPhotoLayoutData } from '@/types/components'

/**
 * Render the image component.
 * @param data - The image data.
 * @returns {JSX.Element} The rendered component.
 */
const ImageLayoutContent = (props: TPhotoLayoutData): JSX.Element => {
  return (
    <Image
      src={props?.src || '#'}
      alt={props?.alt || ''}
      sizes={props?.sizes || ''}
      className={props?.className || ''}
      unoptimized={props?.unoptimized || false}
      priority={props?.priority || false}
    />
  )
}

export default ImageLayoutContent

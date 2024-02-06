'use client'

import { ReactNode } from 'react'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import type { TPhotoLayoutData } from '@/components/layouts/Photo'

/**
 * Rendersthe image component.
 * @param props - The props object.
 * @returns The rendered image component.
 */
const ImageLayout = (props: TPhotoLayoutData): ReactNode => {
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

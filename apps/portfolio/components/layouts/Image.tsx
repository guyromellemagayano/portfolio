'use client'

import { FC, useId } from 'react'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import { TWithClassName, TWithID } from '@/types/common'

export type TImageLayoutProps = TWithClassName &
  TWithID & {
    src: StaticImport | string | undefined
    alt?: string
    sizes?: string
    priority?: boolean
    unoptimized?: boolean
  }

/**
 * Renders the image component.
 * @param src - The image source.
 * @param alt - The image alternative text.
 * @param sizes - The image sizes.
 * @param className - The image class name.
 * @param [unoptimized=false] - The image unoptimized flag.
 * @param [priority=false] - The image priority flag.
 * @returns The rendered image component.
 */
const ImageLayout: FC<TImageLayoutProps> = ({
  id,
  src = '#',
  alt = '',
  sizes = '100vw',
  className,
  unoptimized = false,
  priority = false
}) => {
  const customId = useId()

  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      id={id || customId}
      className={className}
      unoptimized={unoptimized}
      priority={priority}
    />
  )
}

export default ImageLayout

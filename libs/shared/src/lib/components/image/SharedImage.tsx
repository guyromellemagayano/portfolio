'use client'

import { ForwardedRef, forwardRef, HTMLAttributes, useId } from 'react'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

type SharedImageRef = HTMLImageElement

/* eslint-disable-next-line */
export interface SharedImageProps extends HTMLAttributes<SharedImageRef> {
  src?: StaticImport | string | undefined
  alt?: string
  sizes?: string
  priority?: boolean
  unoptimized?: boolean
}

/**
 * Render the shared image component.
 * @param src - The source of the shared image.
 * @param alt - The alternate text of the shared image.
 * @param rest - The rest of the props of the shared image.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared image component.
 */
export const SharedImage = forwardRef<SharedImageRef, SharedImageProps>(
  (
    {
      src = '#',
      alt = '',
      sizes = '100vw',
      priority = false,
      unoptimized = false,
      ...rest
    },
    ref: ForwardedRef<SharedImageRef>
  ) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        {...rest}
        id={rest.id ?? customId}
      />
    )
  }
)

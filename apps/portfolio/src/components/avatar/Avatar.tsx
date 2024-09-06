'use client'

import { forwardRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { HyperlinkProps, HyperlinkRef } from '@react-components'

import { cn } from '@react-utils'

export type AvatarRef = HyperlinkRef
export type AvatarProps = HyperlinkProps & {
  large?: boolean
  alt?: string
}

const link = {
  href: '/',
  label: 'Go to Home Page'
}
const image = {
  file: '/images/avatar.jpg',
  width: 64,
  height: 64
}

/**
 * Renders the avatar component.
 * @param {AvatarProps} props - The component props
 * @param {AvatarRef} ref - The component reference
 * @returns The rendered avatar component
 */
const Avatar = forwardRef<AvatarRef, AvatarProps>(
  ({ large = false, className, alt = '', ...rest }, ref) => {
    const sizeClass = large ? 'h-16 w-16' : 'h-9 w-9'
    const imageSize = large ? '4rem' : '2.25rem'

    return (
      <Link
        ref={ref}
        href={link.href}
        className={cn('pointer-events-auto', className)}
        aria-label={link.label}
        {...rest}
      >
        <Image
          src={image.file}
          alt={alt}
          height={image.height}
          sizes={imageSize}
          width={image.width}
          className={cn(
            'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
            sizeClass
          )}
          priority
        />
      </Link>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar

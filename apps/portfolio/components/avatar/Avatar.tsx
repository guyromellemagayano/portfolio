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
    return (
      <Link
        aria-label={link.label}
        className={cn(className, 'pointer-events-auto')}
        href={link.href}
        ref={ref}
        {...rest}
      >
        <Image
          priority
          alt={alt}
          className={cn(
            'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
            large ? 'h-16 w-16' : 'h-9 w-9'
          )}
          height={image.height}
          sizes={large ? '4rem' : '2.25rem'}
          src={image.file}
          width={image.width}
        />
      </Link>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar

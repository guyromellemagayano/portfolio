'use client'

import { forwardRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {
  type HyperlinkProps,
  type HyperlinkRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

export type AvatarRef = HyperlinkRef
export type AvatarProps = HyperlinkProps & {
  large?: boolean
  alt?: string
}

const link: { href: string; label: string } = {
    href: '/',
    label: 'Go to Home Page'
  },
  image: { file: string; width: number; height: number } = {
    file: '/images/avatar.jpg',
    width: 64,
    height: 64
  }

/**
 * Renders the avatar component.
 * @param {AvatarProps} props - The props of the avatar.
 * @param {AvatarRef} ref - The reference of the avatar.
 * @returns The rendered avatar component.
 */
const Avatar = forwardRef<AvatarRef, AvatarProps>(
  ({ large = false, className, alt = '', ...rest }, ref) => {
    return (
      <Link
        ref={ref}
        href={link.href}
        aria-label={link.label}
        className={cn(className, 'pointer-events-auto')}
        {...rest}
      >
        <Image
          src={image.file}
          alt={alt}
          sizes={large ? '4rem' : '2.25rem'}
          width={image.width}
          height={image.height}
          className={cn(
            'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
            large ? 'h-16 w-16' : 'h-9 w-9'
          )}
          priority
        />
      </Link>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar

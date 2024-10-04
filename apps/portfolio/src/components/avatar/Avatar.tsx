'use client'

import { forwardRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import type { THyperlinkProps, THyperlinkRef } from '@react-components'

import { cn } from '@react-utils'

import { avatarDefaults } from '@portfolio/configs'

export type AvatarRef = THyperlinkRef
export type AvatarProps = THyperlinkProps & {
  large?: boolean
  alt?: string
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
        href={avatarDefaults.link.href}
        className={cn('pointer-events-auto', className)}
        aria-label={avatarDefaults.link.label}
        {...rest}
      >
        <Image
          src={avatarDefaults.file.src}
          alt={alt}
          height={avatarDefaults.file.height}
          sizes={imageSize}
          width={avatarDefaults.file.width}
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

'use client'

import { forwardRef } from 'react'

import Image from 'next/image'

import type { HyperlinkProps, HyperlinkRef } from '@react-components'

import { cn } from '@react-utils'

import { AVATAR } from '@portfolio/configs'
import { Link } from '@portfolio/i18n/routing'

export type AvatarRef = HyperlinkRef
export type AvatarProps = HyperlinkProps & {
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
        href={AVATAR.link.href}
        className={cn('pointer-events-auto', className)}
        aria-label={AVATAR.link.label}
        {...rest}
      >
        <Image
          src={AVATAR.file.src}
          alt={alt}
          height={AVATAR.file.height}
          sizes={imageSize}
          width={AVATAR.file.width}
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

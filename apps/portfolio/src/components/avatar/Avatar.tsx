'use client'

import { forwardRef, memo } from 'react'

import { ApolloQueryResult, useQuery } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'

import type { THyperlinkProps, THyperlinkRef } from '@react-components'

import { cn } from '@react-utils'

import { type AvatarImageQuery, getAvatarImageQuery } from '@portfolio/graphql'

export type TAvatarRef = THyperlinkRef
export type TAvatarProps = THyperlinkProps & {
  large?: boolean
}

// Avatar defaults
const avatarDefaults = {
  image: {
    src: '/images/avatar.webp',
    alt: 'Avatar Image',
    width: 64,
    height: 64
  },
  link: {
    href: '/',
    label: 'Go to Home Page'
  }
}

/**
 * Renders the avatar component.
 * @param {TAvatarProps} props - The component props
 * @param {TAvatarRef} ref - The component reference
 * @returns The rendered avatar component
 */
const Avatar = memo(
  forwardRef<TAvatarRef, TAvatarProps>(
    ({ large = false, className = '', ...rest }, ref) => {
      const { data } = useQuery(
        getAvatarImageQuery
      ) as ApolloQueryResult<AvatarImageQuery>

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
            src={data?.images?.avatarImage?.src || avatarDefaults.image.src}
            alt={data?.images?.avatarImage?.alt || avatarDefaults.image.alt}
            width={
              data?.images?.avatarImage?.width || avatarDefaults.image.width
            }
            height={
              data?.images?.avatarImage?.height || avatarDefaults.image.height
            }
            sizes={imageSize}
            className={cn(
              'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
              sizeClass
            )}
            layout="responsive"
          />
        </Link>
      )
    }
  )
)

Avatar.displayName = 'Avatar'

export default Avatar

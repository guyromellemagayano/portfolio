'use client'

import { ForwardedRef, forwardRef } from 'react'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import { SharedReactComponent } from '@guy-romelle-magayano/react-components/server'
import { cn } from '@guy-romelle-magayano/react-utils/server'

type AvatarRef = HTMLAnchorElement

export type AvatarProps = {
  link: {
    href?: string
    className?: string
  }
  image: {
    src?: StaticImport | string
    alt?: string
    large: boolean
    className?: string
  }
}

/**
 * Renders the avatar component.
 * @param link.href The link href.
 * @param link.className The link class name.
 * @param image.src The image src.
 * @param image.alt The image alt.
 * @param image.large The image large flag.
 * @param image.className The image class name.
 * @param rest The rest of the props.
 * @returns The rendered avatar component.
 */
const Avatar = forwardRef<AvatarRef, AvatarProps>(
  (
    {
      link = {
        href: '#',
        className: ''
      },
      image = {
        src: '#',
        alt: '',
        large: false,
        className: ''
      },
      ...rest
    },
    ref: ForwardedRef<AvatarRef>
  ) => {
    return (
      <SharedReactComponent.Link
        ref={ref}
        href={link.href}
        className={cn('pointer-events-auto', link.className)}
        {...rest}
      >
        <SharedReactComponent.Image
          src={image.src}
          alt={image.alt}
          className={cn(
            'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
            image.large ? 'h-16 w-16' : 'h-9 w-9',
            image.className
          )}
          priority
        />
      </SharedReactComponent.Link>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar

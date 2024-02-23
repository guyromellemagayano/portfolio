'use client'

import { FC, useId } from 'react'

import clsx from 'clsx'
import Link from 'next/link'

import ImageLayout from '@guy-romelle-magayano/portfolio/components/layouts/Image'

import type { TCommonComponentProps } from '@guy-romelle-magayano/portfolio/types/common'

import imageAvatar from '@guy-romelle-magayano/portfolio/images/avatar.jpg'

export type TAvatarProps = TCommonComponentProps & {
  large?: boolean
  alt?: string
}

/**
 * Renders the avatar component.
 * @param large - The large prop of the avatar.
 * @param id - The additional ID for the component.
 * @param className - The class name of the avatar.
 * @param alt - The alternative text of the avatar.
 * @param rest - The rest of the props of the avatar.
 * @returns The rendered avatar component.
 */
const Avatar: FC<TAvatarProps> = ({
  large = false,
  id,
  className,
  alt,
  ...rest
}) => {
  const customId = useId()

  return (
    <Link
      href="/"
      id={id || customId}
      className={clsx('pointer-events-auto', className)}
      {...rest}
    >
      <ImageLayout
        src={imageAvatar}
        alt={alt || ''}
        sizes={large ? '4rem' : '2.25rem'}
        className={clsx(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          large ? 'h-16 w-16' : 'h-9 w-9'
        )}
        priority
      />
    </Link>
  )
}

export default Avatar

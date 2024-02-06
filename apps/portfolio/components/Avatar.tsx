'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import imageAvatar from '@/images/avatar.jpg'

import type { TWithChildren, TWithIDAndClass } from '@/types/common'
import { ReactNode } from 'react'

export type TAvatarProps<T = object> = T &
  TWithIDAndClass<T> &
  TWithChildren<T> & { large?: boolean; style?: React.CSSProperties }

/**
 * Renders the avatar component.
 * @param large - The large prop of the avatar.
 * @param className - The class name of the avatar.
 * @param rest - The rest of the props of the avatar.
 * @returns The rendered avatar component.
 */
const Avatar = ({
  large = false,
  className,
  ...rest
}: TAvatarProps): ReactNode => {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, 'pointer-events-auto')}
      {...rest}
    >
      <Image
        src={imageAvatar}
        alt=""
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

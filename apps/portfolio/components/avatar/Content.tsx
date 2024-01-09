'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { TAvatarProps } from '@/types/components'

import { imageAvatar } from '@/images'

/**
 * Render avatar component
 * @param {Boolean} large - Render a large avatar.
 * @param {String} className - Extend css classes to override default styling.
 * @param {any} rest - Other props to pass down to the component.
 * @returns {JSX.Element} The rendered component.
 */
const Avatar = ({
  large = false,
  className,
  ...rest
}: TAvatarProps): JSX.Element => {
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

'use client'

import { CSSProperties } from 'react'

import clsx from 'clsx'

import type { TWithChildren, TWithClassName } from '@/types/common'

export type TAvatarContainerProps<T = object> = T &
  TWithClassName<T> &
  TWithChildren<T> & { style?: CSSProperties }

/**
 * Render avatar container component
 * @param {String} className - Extend css classes to override default styling.
 * @param {any} rest - Other props to pass down to the component.
 * @returns {JSX.Element} The rendered component.
 */
const AvatarContainer = ({
  className,
  children,
  ...rest
}: TAvatarContainerProps): JSX.Element => {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export default AvatarContainer

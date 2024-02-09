'use client'

import { CSSProperties, ReactNode } from 'react'

import clsx from 'clsx'

import type { TWithChildren, TWithClassName } from '@/types/common'

export type TAvatarContainerProps<T = object> = T &
  TWithClassName<T> &
  TWithChildren<T> & { style?: CSSProperties }

type TAvatarContainer = (props: TAvatarContainerProps) => ReactNode

/**
 * Rendersavatar container component
 * @param className - Extend CSS classes to override default styling.
 * @param children - The children to render.
 * @param rest - Other props to pass down to the component.
 * @returns The avatar container component.
 */
const AvatarContainer: TAvatarContainer = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export default AvatarContainer

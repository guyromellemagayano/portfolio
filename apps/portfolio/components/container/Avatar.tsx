'use client'

import { FC, useId } from 'react'

import clsx from 'clsx'

import type { TContainerProps } from '@/types/common'

/**
 * Renders avatar container component
 * @param id - The id of the component.
 * @param className - The class name of the component.
 * @param children - The children to render.
 * @param rest - Other props to pass down to the component.
 * @returns The avatar container component.
 */
const AvatarContainer: FC<TContainerProps> = ({
  id,
  className,
  children,
  ...rest
}) => {
  const customId = useId()

  return (
    <div
      id={id || customId}
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

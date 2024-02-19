'use client'

import { FC, useId } from 'react'

import clsx from 'clsx'

import type { TContainerProps } from '@/types/common'

import { isEmpty, isStringType } from '@/utils/checkTypes'

export type TSectionLayoutProps = TContainerProps & {
  title?: string
  decorate?: boolean
}

/**
 * Renders the section layout component.
 * @param title - The title of the section.
 * @param decorate - The decoration of the section.
 * @param id - The additional ID for the component.
 * @param className - The class name of the section.
 * @param children - The children of the section.
 * @returns The rendered section layout component.
 */
const SectionLayout: FC<TSectionLayoutProps> = ({
  title,
  decorate,
  id,
  className,
  children
}) => {
  const customId = useId()

  return (
    <section
      id={id || customId}
      aria-labelledby={id || customId}
      className={clsx(
        decorate &&
          'md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40',
        className
      )}
    >
      <div className="md:grid md:grid-cols-4 md:items-baseline">
        {isStringType(title) && !isEmpty(title) && (
          <h2 className="text-sm font-semibold text-zinc-400 dark:text-zinc-500">
            {title}
          </h2>
        )}

        {children && (
          <div className="md:col-span-3 group relative flex flex-col items-start">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}

export default SectionLayout

'use client'

import { ReactNode, useId } from 'react'

import clsx from 'clsx'

import type { TWithIDAndClass } from '@/types/common'

export type TSectionLayoutProps<T = object> = T &
  TWithIDAndClass<T> & {
    title?: string | null
    decorate?: boolean
  }

/**
 * Rendersthe section layout component.
 * @param title - The title of the section.
 * @param decorate - The decoration of the section.
 * @param children - The children of the section.
 * @returns The rendered section layout component.
 */
const SectionLayout = ({
  title,
  decorate,
  children
}: TSectionLayoutProps): ReactNode => {
  const id = useId()

  return (
    <section
      aria-labelledby={id}
      className={clsx(
        decorate &&
          'md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40'
      )}
    >
      <div className="md:grid md:grid-cols-4 md:items-baseline">
        <h2
          id={id}
          className="text-sm font-semibold text-zinc-400 dark:text-zinc-500"
        >
          {title}
        </h2>
        <div className="md:col-span-3 group relative flex flex-col items-start">
          {children}
        </div>
      </div>
    </section>
  )
}

export default SectionLayout

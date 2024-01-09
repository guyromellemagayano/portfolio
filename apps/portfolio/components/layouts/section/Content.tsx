'use client'

import { useId } from 'react'

import clsx from 'clsx'

import { TSectionLayoutProps } from '@/types/components'

/**
 * The props for the Section component.
 * @param {String} title - The title of the section.
 * @param {Boolean} decorate - Whether to decorate the section.
 * @param {React.ReactNode} children - The content of the section.
 * @returns {JSX.Element} The rendered component.
 */
const SectionLayoutContent = ({
  title,
  decorate,
  children
}: TSectionLayoutProps): JSX.Element => {
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

export default SectionLayoutContent

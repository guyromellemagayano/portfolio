import { ISectionProps } from '@/interfaces/components'
import clsx from 'clsx'
import React from 'react'

// Section component
const Section = ({ title, decorate, children }: ISectionProps): JSX.Element => {
  const id = React.useId()

  return (
    <section
      aria-labelledby={id}
      className={clsx(decorate && 'md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40')}
    >
      <div className="md:grid md:grid-cols-4 md:items-baseline">
        <h2 id={id} className="text-sm font-semibold text-zinc-400 dark:text-zinc-500">
          {title}
        </h2>
        <div className="md:col-span-3 group relative flex flex-col items-start">{children}</div>
      </div>
    </section>
  )
}

export default Section

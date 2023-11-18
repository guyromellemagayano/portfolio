'use client'

import Container from '@components/Container'
import { TSimpleLayoutProps } from 'types/components'

/**
 * Renders a simple layout with a title, intro, and children.
 * @param {String} title - The title of the layout.
 * @param {String} intro - The intro of the layout.
 * @param {any} children - The children of the layout.
 * @returns {JSX.Element} The rendered component.
 */
export default function SimpleLayout({
  title,
  intro,
  children
}: TSimpleLayoutProps): JSX.Element {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </Container>
  )
}

'use client'

import clsx from 'clsx'
import { TProseProps } from 'types/components'

/**
 * Renders a prose component.
 * @param {React.ReactNode} children - The content of the prose component.
 * @param {String} className - Additional class name(s) for custom styling.
 * @returns {JSX.Element} The rendered component.
 */
export default function Prose({
  children,
  className
}: TProseProps): JSX.Element {
  return (
    <div className={clsx('prose dark:prose-invert', className)}>{children}</div>
  )
}

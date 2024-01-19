'use client'

import clsx from 'clsx'

import type { TWithChildren, TWithClassName } from '@/types/common'

export type TProseProps<T = object> = T &
  TWithChildren<T> & TWithClassName<T>

/**
 * Renders a prose component.
 * @param {React.ReactNode} children - The content of the prose component.
 * @param {String} className - Additional class name(s) for custom styling.
 * @returns {JSX.Element} The rendered component.
 */
const Prose = ({ children, className }: TProseProps): JSX.Element => {
  return (
    <div className={clsx('prose dark:prose-invert', className)}>{children}</div>
  )
}

export default Prose

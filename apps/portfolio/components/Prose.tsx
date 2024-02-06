'use client'

import { ReactNode } from 'react'

import clsx from 'clsx'

import type { TWithChildren, TWithClassName } from '@/types/common'

export type TProseProps<T = object> = T & TWithChildren<T> & TWithClassName<T>

/**
 * Renders the prose component.
 * @param children - The children of the prose.
 * @param className - The class name of the prose.
 * @returns The rendered prose component.
 */
const Prose = ({ children, className }: TProseProps): ReactNode => {
  return (
    <div className={clsx('prose dark:prose-invert', className)}>{children}</div>
  )
}

export default Prose

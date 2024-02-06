'use client'

import { ReactNode } from 'react'

import clsx from 'clsx'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { TWithChildren, TWithClassName } from '@/types/common'

export type TNavItemProps<T = object> = T &
  TWithChildren<T> &
  TWithClassName<T> & {
    href: Url
  }

/**
 * Renders the nav item component.
 * @param href - The URL to link to.
 * @param children - The content to render inside the link.
 * @param className - Additional CSS classes to apply to the link.
 * @returns The rendered nav item component.
 */
const NavItem = ({ href, children, className }: TNavItemProps): ReactNode => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive
            ? 'text-amber-500 dark:text-amber-400'
            : 'hover:text-amber-500 dark:hover:text-amber-400',
          className
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-amber-500/0 via-amber-500/40 to-amber-500/0 dark:from-amber-400/0 dark:via-amber-400/40 dark:to-amber-400/0" />
        )}
      </Link>
    </li>
  )
}

export default NavItem

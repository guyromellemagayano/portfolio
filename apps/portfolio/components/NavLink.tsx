'use client'

import { ReactNode } from 'react'

import Link from 'next/link'

import type { TNavItemProps } from '@/components/NavItem'

/**
 * Renders the nav link component.
 * @param href - The URL to link to.
 * @param children - The content to render inside the link.
 * @returns The rendered nav link component.
 */
const NavLink = ({ href, children }: TNavItemProps): ReactNode => {
  return (
    <Link
      href={href}
      className="transition hover:text-amber-500 dark:hover:text-amber-400"
    >
      {children}
    </Link>
  )
}

export default NavLink

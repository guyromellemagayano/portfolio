'use client'

import Link from 'next/link'
import { TNavItemProps } from 'types/components'

/**
 * Renders a navigation link.
 * @param {String} href - The URL of the navigation item.
 * @param {React.ReactNode} children - The content of the navigation item.
 * @returns {JSX.Element} The rendered component.
 */
export default function NavLink({
  href,
  children
}: TNavItemProps): JSX.Element {
  return (
    <Link
      href={href}
      className="transition hover:text-amber-500 dark:hover:text-amber-400"
      passHref
    >
      {children}
    </Link>
  )
}

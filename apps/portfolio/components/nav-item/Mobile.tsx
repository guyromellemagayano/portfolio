'use client'

import { Popover } from '@headlessui/react'
import Link from 'next/link'

import { TNavItemProps } from '@/types/components'

/**
 * Renders a mobile navigation item.
 * @param {String} href - The URL of the navigation item.
 * @param {React.ReactNode} children - The content of the navigation item.
 * @returns {JSX.Element} The rendered component.
 */
const MobileNavItem = ({ href, children }: TNavItemProps): JSX.Element => {
  return (
    <Popover.Button as={Link} href={href} className="block py-2">
      {children}
    </Popover.Button>
  )
}

export default MobileNavItem

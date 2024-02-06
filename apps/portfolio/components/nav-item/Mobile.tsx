'use client'

import { ReactNode } from 'react'

import { Popover } from '@headlessui/react'
import Link from 'next/link'

import type { TNavItemProps } from '@/components/NavItem'

/**
 * Renders the mobile nav item component.
 * @param href - The href of the mobile nav item.
 * @param children - The children of the mobile nav item.
 * @returns The rendered mobile nav item component.
 */
const MobileNavItem = ({ href, children }: TNavItemProps): ReactNode => {
  return (
    <Popover.Button as={Link} href={href} className="block py-2">
      {children}
    </Popover.Button>
  )
}

export default MobileNavItem

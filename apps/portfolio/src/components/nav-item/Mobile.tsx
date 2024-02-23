'use client'

import { FC, useId } from 'react'

import { Popover } from '@headlessui/react'
import Link from 'next/link'

import type { TNavItemProps } from '@guy-romelle-magayano/portfolio/components/NavItem'

export type TMobileNavItemProps = TNavItemProps

/**
 * Renders the mobile nav item component.
 * @param href - The href of the mobile nav item.
 * @param id - The ID of the mobile nav item.
 * @param children - The children of the mobile nav item.
 * @returns The rendered mobile nav item component.
 */
const MobileNavItem: FC<TMobileNavItemProps> = ({
  href,
  id,
  children,
  ...rest
}) => {
  const customId = useId()

  return (
    <Popover.Button
      as={Link}
      href={href}
      id={id || customId}
      className="block py-2"
      {...rest}
    >
      {children}
    </Popover.Button>
  )
}

export default MobileNavItem

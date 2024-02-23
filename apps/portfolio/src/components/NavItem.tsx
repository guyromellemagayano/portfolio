'use client'

import { FC, useId } from 'react'

import clsx from 'clsx'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { TContainerProps } from '@guy-romelle-magayano/portfolio/types/common'
import {
  isEmpty,
  isObjectType,
  isStringType
} from '@guy-romelle-magayano/portfolio/utils/checkTypes'

export type TNavItemProps = TContainerProps & {
  href: Url
}

/**
 * Renders the nav item component.
 * @param href - The URL to link to.
 * @param children - The content to render inside the link.
 * @param rest - The props object.
 * @returns The rendered nav item component.
 */
const NavItem: FC<TNavItemProps> = ({ href, id, children, ...rest }) => {
  const pathname = usePathname(),
    isActive = pathname === href,
    customId = useId()

  return (
    (isStringType(href) || isObjectType(href)) &&
    !isEmpty(href) &&
    children && (
      <li id={id || customId} {...rest}>
        <Link
          href={href}
          className={clsx(
            'relative block px-3 py-2 transition',
            isActive
              ? 'text-amber-500 dark:text-amber-400'
              : 'hover:text-amber-500 dark:hover:text-amber-400'
          )}
        >
          {children}
          {isActive && (
            <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-amber-500/0 via-amber-500/40 to-amber-500/0 dark:from-amber-400/0 dark:via-amber-400/40 dark:to-amber-400/0" />
          )}
        </Link>
      </li>
    )
  )
}

export default NavItem

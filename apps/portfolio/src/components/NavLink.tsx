'use client'

import { FC, useId } from 'react'

import Link from 'next/link'

import type { TNavItemProps } from '@guy-romelle-magayano/portfolio/components/NavItem'

import {
  isEmpty,
  isObjectType,
  isStringType
} from '@guy-romelle-magayano/portfolio/utils/checkTypes'

export type TNavLinkProps = TNavItemProps

/**
 * Renders the nav link component.
 * @param href - The URL to link to.
 * @param id - The ID of the nav link.
 * @param children - The content to render inside the link.
 * @param rest - The props object.
 * @returns The rendered nav link component.
 */
const NavLink: FC<TNavLinkProps> = ({ href, id, children, ...rest }) => {
  const customId = useId()

  return (
    (isStringType(href) || isObjectType(href)) &&
    !isEmpty(href) && (
      <Link
        href={href}
        id={id || customId}
        className="transition hover:text-amber-500 dark:hover:text-amber-400"
        {...rest}
      >
        {children}
      </Link>
    )
  )
}

export default NavLink

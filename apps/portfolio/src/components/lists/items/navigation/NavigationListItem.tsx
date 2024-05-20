'use client'

import { forwardRef } from 'react'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Li,
  Span,
  type ListItemProps,
  type ListItemRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

export type NavigationListItemRef = ListItemRef
export type NavigationListItemProps = ListItemProps & {
  href: LinkProps['href']
}

/**
 * Renders the navigation list component.
 * @param {NavigationListItemProps} props - The properties to render the navigation list component.
 * @param {NavigationListItemRef} ref - The reference of the navigation list component.
 * @returns The rendered navigation list component.
 */
const NavigationListItem = forwardRef<
  NavigationListItemRef,
  NavigationListItemProps
>(({ href, children, ...rest }, ref) => {
  const pathname = usePathname(),
    isActive = pathname === href

  return (
    <Li ref={ref} {...rest}>
      {href && children && (
        <Link
          href={href}
          className={cn(
            'relative block px-3 py-2 transition',
            isActive
              ? 'text-amber-500 dark:text-amber-400'
              : 'hover:text-amber-500 dark:hover:text-amber-400'
          )}
        >
          {children}

          {isActive && (
            <Span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-amber-500/0 via-amber-500/40 to-amber-500/0 dark:from-amber-400/0 dark:via-amber-400/40 dark:to-amber-400/0" />
          )}
        </Link>
      )}
    </Li>
  )
})

NavigationListItem.displayName = 'NavigationListItem'

export default NavigationListItem

'use client'

import { forwardRef, useMemo } from 'react'

import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Li,
  Span,
  type ListItemProps,
  type ListItemRef
} from '@react-components'

import { cn } from '@react-utils'

export type NavigationListItemRef = ListItemRef
export type NavigationListItemProps = ListItemProps & Pick<LinkProps, 'href'>

/**
 * Renders the navigation list component.
 * @param {NavigationListItemProps} props - The component props
 * @param {NavigationListItemRef} ref - The component reference
 * @returns The rendered navigation list component
 */
const NavigationListItem = forwardRef<
  NavigationListItemRef,
  NavigationListItemProps
>(({ href, children, ...rest }, ref) => {
  const pathname = usePathname()
  const isActive = pathname === href

  const classNames = useMemo(
    () =>
      cn(
        'relative block px-3 py-2 transition',
        isActive
          ? 'text-zinc-500 dark:text-zinc-400'
          : 'hover:text-zinc-500 dark:hover:text-zinc-400'
      ),
    [isActive]
  )

  if (!href || !children) return null

  return (
    <Li ref={ref} {...rest}>
      <Link href={href} className={classNames}>
        {children}
        {isActive && (
          <Span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-zinc-500/0 via-zinc-500/40 to-zinc-500/0 dark:from-zinc-400/0 dark:via-zinc-400/40 dark:to-zinc-400/0" />
        )}
      </Link>
    </Li>
  )
})

NavigationListItem.displayName = 'NavigationListItem'

export default NavigationListItem
